import mongoose from 'mongoose'

/* =====================================================
   VARIANTE
===================================================== */

const variantSchema =
  new mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
        trim: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      _id: false,
    }
  )

/* =====================================================
   PRODUCTO
===================================================== */

const productSchema =
  new mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      department: {
        type: String,
        required: true,
        enum: [
          'personalizados',
          'fiesta-eventos',
          'regalos-detalles',
          'infantil',
          'electronica',
          'accesorios-varios',
        ],
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      price: {
        type: Number,
        default: null,
        min: 0,
      },

      priceLabel: {
        type: String,
        default: null,
        trim: true,
      },

      images: {
        type: [String],
        default: [],
      },

      customizable: {
        type: Boolean,
        default: false,
      },

      variants: {
        type: [variantSchema],
        default: [],
      },

      notes: {
        type: String,
        default: null,
        trim: true,
      },

      quoteOnly: {
        type: Boolean,
        default: false,
      },

      soldOut: {
        type: Boolean,
        default: false,
      },

      featured: {
        type: Boolean,
        default: false,
      },

      active: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  )

/* =====================================================
   ÍNDICES
===================================================== */

productSchema.index({
  department: 1,
})

productSchema.index({
  featured: 1,
})

productSchema.index({
  active: 1,
})

/* =====================================================
   MODEL
===================================================== */

const Product = mongoose.model(
  'Product',
  productSchema
)

export default Product