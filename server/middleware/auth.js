import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const requireAdmin = async (
  req,
  res,
  next
) => {
  try {
    const authorization =
      req.headers.authorization

    if (
      !authorization ||
      !authorization.startsWith(
        'Bearer '
      )
    ) {
      return res.status(401).json({
        error:
          'Debes iniciar sesión.',
      })
    }

    const token =
      authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        error:
          'Token de acceso no válido.',
      })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        error:
          'Error de configuración del servidor.',
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    const admin =
      await Admin.findById(
        decoded.id
      )

    if (!admin) {
      return res.status(401).json({
        error:
          'Administrador no encontrado.',
      })
    }

    if (!admin.active) {
      return res.status(403).json({
        error:
          'Esta cuenta está desactivada.',
      })
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({
        error:
          'No tienes permisos de administrador.',
      })
    }

    req.admin = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    }

    next()
  } catch (error) {
    if (
      error.name ===
      'TokenExpiredError'
    ) {
      return res.status(401).json({
        error:
          'Tu sesión ha expirado.',
      })
    }

    if (
      error.name ===
      'JsonWebTokenError'
    ) {
      return res.status(401).json({
        error:
          'Token de acceso no válido.',
      })
    }

    console.error(
      '❌ Error verificando admin:',
      error
    )

    return res.status(500).json({
      error:
        'No se pudo verificar la sesión.',
    })
  }
}

export default requireAdmin