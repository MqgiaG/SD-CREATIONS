import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      default: 'admin',
      enum: ['admin'],
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
   CIFRAR CONTRASEÑA
===================================================== */

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  const salt = await bcrypt.genSalt(12)

  this.password = await bcrypt.hash(
    this.password,
    salt
  )
})

/* =====================================================
   COMPARAR CONTRASEÑA
===================================================== */

adminSchema.methods.comparePassword =
  async function (candidatePassword) {
    return bcrypt.compare(
      candidatePassword,
      this.password
    )
  }

const Admin = mongoose.model(
  'Admin',
  adminSchema
)

export default Admin