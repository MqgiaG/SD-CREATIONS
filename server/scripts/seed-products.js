import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {
  fileURLToPath,
  pathToFileURL,
} from 'url'

import Product from '../models/Product.js'

dotenv.config()

const __filename =
  fileURLToPath(import.meta.url)

const __dirname =
  path.dirname(__filename)

const projectRoot =
  path.resolve(__dirname, '../..')

const productsFile =
  path.join(
    projectRoot,
    'src/data/products.js'
  )

const productImagesDirectory =
  path.join(
    projectRoot,
    'src/assets/products'
  )

const temporaryModule =
  path.join(
    __dirname,
    '.products-seed-temp.mjs'
  )

/* =====================================================
   CREAR VERSIÓN DE PRODUCTS.JS COMPATIBLE CON NODE
===================================================== */

const createTemporaryProductsModule = () => {
  const originalSource =
    fs.readFileSync(
      productsFile,
      'utf8'
    )

  const marker =
    `/* =====================================================
   ELECTRÓNICA`

  const markerIndex =
    originalSource.indexOf(marker)

  if (markerIndex === -1) {
    throw new Error(
      'No se pudo localizar la sección de productos.'
    )
  }

  const productsSource =
    originalSource.slice(
      markerIndex
    )

  const prelude = `
import fs from 'fs'
import path from 'path'

const PRODUCT_IMAGES_DIRECTORY =
  ${JSON.stringify(productImagesDirectory)}

const getImages = (folder) => {
  const folderPath =
    path.join(
      PRODUCT_IMAGES_DIRECTORY,
      folder
    )

  if (!fs.existsSync(folderPath)) {
    console.warn(
      \`⚠️ Carpeta de imágenes no encontrada: \${folder}\`
    )

    return []
  }

  return fs
    .readdirSync(folderPath)
    .filter((fileName) =>
      /\\.(jpg|jpeg|png|webp)$/i.test(
        fileName
      )
    )
    .sort((a, b) =>
      a.localeCompare(
        b,
        undefined,
        {
          numeric: true,
          sensitivity: 'base',
        }
      )
    )
    .map(
      (fileName) =>
        \`/product-images/\${folder}/\${encodeURIComponent(
          fileName
        )}\`
    )
}
`

  fs.writeFileSync(
    temporaryModule,
    `${prelude}\n${productsSource}`,
    'utf8'
  )
}

/* =====================================================
   SEED
===================================================== */

const seedProducts = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        'Falta configurar MONGODB_URI.'
      )
    }

    console.log('')
    console.log(
      '🌱 Preparando catálogo...'
    )

    createTemporaryProductsModule()

    const moduleUrl =
      `${pathToFileURL(
        temporaryModule
      ).href}?t=${Date.now()}`

    const {
      products,
    } = await import(moduleUrl)

    if (
      !Array.isArray(products) ||
      products.length === 0
    ) {
      throw new Error(
        'No se encontraron productos para importar.'
      )
    }

    await mongoose.connect(
      process.env.MONGODB_URI
    )

    console.log(
      '🍃 MongoDB conectado'
    )

    const existingProducts =
      await Product.countDocuments()

    if (existingProducts > 0) {
      throw new Error(
        `MongoDB ya contiene ${existingProducts} productos. Se canceló la importación para no sobrescribirlos.`
      )
    }

    const productsToInsert =
      products.map(
        (product) => ({
          ...product,

          active:
            product.active ??
            true,
        })
      )

    const insertedProducts =
      await Product.insertMany(
        productsToInsert
      )

    console.log('')
    console.log(
      '✅ Catálogo importado correctamente'
    )

    console.log(
      `📦 Productos creados: ${insertedProducts.length}`
    )

    const departments =
      await Product.distinct(
        'department'
      )

    console.log(
      `🏬 Departamentos: ${departments.length}`
    )

    console.log('')
    console.log(
      '💖 MongoDB ya tiene el catálogo de SD Creations'
    )
    console.log('')
  } catch (error) {
    console.error('')
    console.error(
      '❌ No se pudo importar el catálogo:'
    )
    console.error(
      error.message
    )
    console.error('')
  } finally {
    if (
      fs.existsSync(
        temporaryModule
      )
    ) {
      fs.unlinkSync(
        temporaryModule
      )
    }

    if (
      mongoose.connection.readyState !==
      0
    ) {
      await mongoose.disconnect()
    }
  }
}

seedProducts()