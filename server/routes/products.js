import express from 'express'
import Product from '../models/Product.js'
import requireAdmin from '../middleware/auth.js'

const router = express.Router()

/* =====================================================
   OBTENER PRODUCTOS PÚBLICOS
===================================================== */

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({
      active: true,
    })
      .sort({
        featured: -1,
        createdAt: 1,
      })
      .lean()

    return res.json({
      success: true,
      products,
    })
  } catch (error) {
    console.error(
      '❌ Error obteniendo productos:',
      error
    )

    return res.status(500).json({
      error:
        'No se pudieron obtener los productos.',
    })
  }
})

/* =====================================================
   OBTENER TODOS PARA ADMIN
===================================================== */

router.get(
  '/admin',
  requireAdmin,
  async (req, res) => {
    try {
      const products =
        await Product.find()
          .sort({
            createdAt: 1,
          })
          .lean()

      return res.json({
        success: true,
        products,
      })
    } catch (error) {
      console.error(
        '❌ Error obteniendo catálogo admin:',
        error
      )

      return res.status(500).json({
        error:
          'No se pudo obtener el catálogo.',
      })
    }
  }
)

/* =====================================================
   OBTENER UN PRODUCTO
===================================================== */

router.get('/:id', async (req, res) => {
  try {
    const product =
      await Product.findOne({
        id: req.params.id,
        active: true,
      }).lean()

    if (!product) {
      return res.status(404).json({
        error:
          'Producto no encontrado.',
      })
    }

    return res.json({
      success: true,
      product,
    })
  } catch (error) {
    console.error(
      '❌ Error obteniendo producto:',
      error
    )

    return res.status(500).json({
      error:
        'No se pudo obtener el producto.',
    })
  }
})

/* =====================================================
   CREAR PRODUCTO
===================================================== */

router.post(
  '/',
  requireAdmin,
  async (req, res) => {
    try {
      const {
        id,
        name,
        department,
        description,
        price = null,
        priceLabel = null,
        images = [],
        customizable = false,
        variants = [],
        notes = null,
        quoteOnly = false,
        soldOut = false,
        featured = false,
        active = true,
      } = req.body

      if (
        !id?.trim() ||
        !name?.trim() ||
        !department?.trim() ||
        !description?.trim()
      ) {
        return res.status(400).json({
          error:
            'ID, nombre, departamento y descripción son obligatorios.',
        })
      }

      const existingProduct =
        await Product.findOne({
          id: id
            .trim()
            .toLowerCase(),
        })

      if (existingProduct) {
        return res.status(409).json({
          error:
            'Ya existe un producto con ese ID.',
        })
      }

      const product =
        await Product.create({
          id: id
            .trim()
            .toLowerCase(),

          name: name.trim(),

          department:
            department.trim(),

          description:
            description.trim(),

          price,

          priceLabel:
            priceLabel?.trim() ||
            null,

          images,

          customizable,

          variants,

          notes:
            notes?.trim() ||
            null,

          quoteOnly,

          soldOut,

          featured,

          active,
        })

      return res.status(201).json({
        success: true,
        product,
      })
    } catch (error) {
      console.error(
        '❌ Error creando producto:',
        error
      )

      if (
        error.name ===
        'ValidationError'
      ) {
        return res.status(400).json({
          error:
            'Los datos del producto no son válidos.',
        })
      }

      return res.status(500).json({
        error:
          'No se pudo crear el producto.',
      })
    }
  }
)

/* =====================================================
   EDITAR PRODUCTO
===================================================== */

router.patch(
  '/:id',
  requireAdmin,
  async (req, res) => {
    try {
      const allowedFields = [
        'name',
        'department',
        'description',
        'price',
        'priceLabel',
        'images',
        'customizable',
        'variants',
        'notes',
        'quoteOnly',
        'soldOut',
        'featured',
        'active',
      ]

      const updates = {}

      allowedFields.forEach(
        (field) => {
          if (
            Object.prototype.hasOwnProperty.call(
              req.body,
              field
            )
          ) {
            updates[field] =
              req.body[field]
          }
        }
      )

      const product =
        await Product.findOneAndUpdate(
          {
            id: req.params.id,
          },
          {
            $set: updates,
          },
          {
            new: true,
            runValidators: true,
          }
        )

      if (!product) {
        return res.status(404).json({
          error:
            'Producto no encontrado.',
        })
      }

      return res.json({
        success: true,
        product,
      })
    } catch (error) {
      console.error(
        '❌ Error editando producto:',
        error
      )

      if (
        error.name ===
        'ValidationError'
      ) {
        return res.status(400).json({
          error:
            'Los datos del producto no son válidos.',
        })
      }

      return res.status(500).json({
        error:
          'No se pudo editar el producto.',
      })
    }
  }
)

/* =====================================================
   ELIMINAR PRODUCTO
===================================================== */

router.delete(
  '/:id',
  requireAdmin,
  async (req, res) => {
    try {
      const product =
        await Product.findOneAndDelete({
          id: req.params.id,
        })

      if (!product) {
        return res.status(404).json({
          error:
            'Producto no encontrado.',
        })
      }

      return res.json({
        success: true,
        message:
          'Producto eliminado correctamente.',
      })
    } catch (error) {
      console.error(
        '❌ Error eliminando producto:',
        error
      )

      return res.status(500).json({
        error:
          'No se pudo eliminar el producto.',
      })
    }
  }
)

export default router