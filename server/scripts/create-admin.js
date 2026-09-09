import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from '../models/Admin.js'

dotenv.config()

const createAdmin = async () => {
  try {
    const {
      MONGODB_URI,
      ADMIN_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
    } = process.env

    if (!MONGODB_URI) {
      throw new Error(
        'Falta configurar MONGODB_URI.'
      )
    }

    if (
      !ADMIN_NAME ||
      !ADMIN_EMAIL ||
      !ADMIN_PASSWORD
    ) {
      throw new Error(
        'Faltan ADMIN_NAME, ADMIN_EMAIL o ADMIN_PASSWORD.'
      )
    }

    if (ADMIN_PASSWORD.length < 8) {
      throw new Error(
        'La contraseña debe tener mínimo 8 caracteres.'
      )
    }

    await mongoose.connect(MONGODB_URI)

    console.log('')
    console.log('🍃 MongoDB conectado')

    const normalizedEmail =
      ADMIN_EMAIL
        .trim()
        .toLowerCase()

    const existingAdmin =
      await Admin.findOne({
        email: normalizedEmail,
      })

    if (existingAdmin) {
      console.log(
        '⚠️ Ya existe un administrador con ese correo.'
      )

      await mongoose.disconnect()
      process.exit(0)
    }

    const admin = await Admin.create({
      name: ADMIN_NAME.trim(),
      email: normalizedEmail,
      password: ADMIN_PASSWORD,
    })

    console.log('')
    console.log(
      '✅ Administrador creado correctamente'
    )
    console.log(
      `👤 Nombre: ${admin.name}`
    )
    console.log(
      `📧 Correo: ${admin.email}`
    )
    console.log(
      `🔐 Rol: ${admin.role}`
    )
    console.log('')
    console.log(
      '💖 SD Creations Admin listo'
    )
    console.log('')

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('')
    console.error(
      '❌ No se pudo crear el administrador:'
    )
    console.error(error.message)
    console.error('')

    await mongoose.disconnect()
      .catch(() => {})

    process.exit(1)
  }
}

createAdmin()