import express from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'

import requireAdmin from '../middleware/auth.js'

const router = express.Router()

/* =====================================================
   MULTER
===================================================== */

const storage = multer.memoryStorage()

const upload = multer({
  storage,

  limits: {
    fileSize: 8 * 1024 * 1024,
    files: 8,
  },

  fileFilter: (
    req,
    file,
    cb
  ) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (
      !allowedTypes.includes(
        file.mimetype
      )
    ) {
      return cb(
        new Error(
          'Solo se permiten imágenes JPG, PNG o WebP.'
        )
      )
    }

    cb(null, true)
  },
})

/* =====================================================
   CLOUDINARY CONFIG
===================================================== */

const configureCloudinary =
  () => {
    const {
      CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET,
    } = process.env

    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_API_KEY ||
      !CLOUDINARY_API_SECRET
    ) {
      throw new Error(
        'Falta configurar Cloudinary en las variables de entorno.'
      )
    }

    cloudinary.config({
      cloud_name:
        CLOUDINARY_CLOUD_NAME,

      api_key:
        CLOUDINARY_API_KEY,

      api_secret:
        CLOUDINARY_API_SECRET,

      secure: true,
    })
  }

/* =====================================================
   SUBIR BUFFER A CLOUDINARY
===================================================== */

const uploadBufferToCloudinary =
  (file) =>
    new Promise(
      (
        resolve,
        reject
      ) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder:
                'sd-creations/products',

              resource_type:
                'image',

              transformation: [
                {
                  width: 1600,
                  height: 1600,
                  crop: 'limit',
                },
                {
                  quality: 'auto',
                },
              ],
            },

            (
              error,
              result
            ) => {
              if (error) {
                reject(error)
                return
              }

              resolve(result)
            }
          )

        uploadStream.end(
          file.buffer
        )
      }
    )

/* =====================================================
   POST /api/uploads/images
===================================================== */

router.post(
  '/images',

  requireAdmin,

  upload.array(
    'images',
    8
  ),

  async (
    req,
    res
  ) => {
    try {
      configureCloudinary()

      if (
        !req.files ||
        req.files.length === 0
      ) {
        return res
          .status(400)
          .json({
            success: false,

            error:
              'Selecciona al menos una imagen.',
          })
      }

      const uploadedImages =
        await Promise.all(
          req.files.map(
            (
              file
            ) =>
              uploadBufferToCloudinary(
                file
              )
          )
        )

      const images =
        uploadedImages.map(
          (
            image
          ) => ({
            url:
              image.secure_url,

            publicId:
              image.public_id,

            width:
              image.width,

            height:
              image.height,

            format:
              image.format,

            bytes:
              image.bytes,
          })
        )

      return res
        .status(201)
        .json({
          success: true,
          images,
        })
    } catch (error) {
      console.error(
        '❌ Error subiendo imágenes:',
        error
      )

      return res
        .status(500)
        .json({
          success: false,

          error:
            'No se pudieron subir las imágenes.',
        })
    }
  }
)

/* =====================================================
   ERRORES DE MULTER
===================================================== */

router.use(
  (
    error,
    req,
    res,
    next
  ) => {
    if (
      error instanceof
      multer.MulterError
    ) {
      if (
        error.code ===
        'LIMIT_FILE_SIZE'
      ) {
        return res
          .status(400)
          .json({
            success: false,

            error:
              'Cada imagen debe pesar menos de 8 MB.',
          })
      }

      if (
        error.code ===
        'LIMIT_FILE_COUNT'
      ) {
        return res
          .status(400)
          .json({
            success: false,

            error:
              'Puedes subir máximo 8 imágenes a la vez.',
          })
      }

      return res
        .status(400)
        .json({
          success: false,

          error:
            'Hubo un problema con las imágenes seleccionadas.',
        })
    }

    if (error) {
      return res
        .status(400)
        .json({
          success: false,

          error:
            error.message ||
            'Archivo no válido.',
        })
    }

    next()
  }
)

export default router