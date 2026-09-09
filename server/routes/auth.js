import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import requireAdmin from '../middleware/auth.js'

const router = express.Router()

/* =====================================================
   LOGIN ADMIN
===================================================== */

router.post('/login', async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body

    if (!email?.trim() || !password) {
      return res.status(400).json({
        error:
          'Ingresa tu correo y contraseña.',
      })
    }

    const admin = await Admin.findOne({
      email: email
        .trim()
        .toLowerCase(),
    }).select('+password')

    if (!admin) {
      return res.status(401).json({
        error:
          'Correo o contraseña incorrectos.',
      })
    }

    if (!admin.active) {
      return res.status(403).json({
        error:
          'Esta cuenta está desactivada.',
      })
    }

    const passwordIsCorrect =
      await admin.comparePassword(
        password
      )

    if (!passwordIsCorrect) {
      return res.status(401).json({
        error:
          'Correo o contraseña incorrectos.',
      })
    }

    if (!process.env.JWT_SECRET) {
      console.error(
        '❌ JWT_SECRET no configurado'
      )

      return res.status(500).json({
        error:
          'Error de configuración del servidor.',
      })
    }

    const token = jwt.sign(
      {
        id: admin._id.toString(),
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h',
      }
    )

    return res.json({
      success: true,

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error(
      '❌ Error iniciando sesión:',
      error
    )

    return res.status(500).json({
      error:
        'No se pudo iniciar sesión.',
    })
  }
})

/* =====================================================
   ADMIN ACTUAL
===================================================== */

router.get(
  '/me',
  requireAdmin,
  async (req, res) => {
    return res.json({
      success: true,
      admin: req.admin,
    })
  }
)

export default router