import { useEffect, useMemo, useState } from 'react'
import useCart from '../../hooks/useCart'
import './ProductModal.css'

const formatPrice = (value) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'Cotizar'
  }

  return `$${value.toLocaleString('es-MX')}`
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" />
      <path d="M9 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.7c.8 1.5 2 2.5 3.6 3.2l.7-.9c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.4.4.6-.1 1.4-1 2.1-2.3 2.1-3.7-.1-7.9-3.8-8.1-7.3 0-.6.1-1.1.4-1.5Z" />
    </svg>
  )
}

function ProductModal({ product, onClose }) {
  const { addToCart } = useCart()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariantId, setSelectedVariantId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [customization, setCustomization] = useState('')

  useEffect(() => {
    if (!product) {
      return undefined
    }

    setSelectedImage(0)
    setSelectedVariantId(product.variants?.[0]?.id || '')
    setQuantity(1)
    setCustomization('')

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [product, onClose])

  const selectedVariant = useMemo(() => {
    if (!product?.variants?.length) {
      return null
    }

    return (
      product.variants.find(
        (variant) => variant.id === selectedVariantId
      ) || product.variants[0]
    )
  }, [product, selectedVariantId])

  const unitPrice = useMemo(() => {
    if (typeof selectedVariant?.price === 'number') {
      return selectedVariant.price
    }

    if (typeof product?.price === 'number') {
      return product.price
    }

    return null
  }, [product, selectedVariant])

  const displayedPrice = useMemo(() => {
    if (unitPrice !== null) {
      return formatPrice(unitPrice)
    }

    return product?.priceLabel || 'Cotizar'
  }, [product, unitPrice])

  if (!product) {
    return null
  }

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(current + 1, 99))
  }

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(current - 1, 1))
  }

  const handleAddToCart = () => {
    if (product.soldOut) {
      return
    }

    addToCart(product, {
      quantity,
      variant: selectedVariant || undefined,
      price: unitPrice,
      priceLabel: product.priceLabel,
      customization: product.customizable
        ? customization.trim()
        : '',
    })

    onClose()
  }

  const availabilityUrl = `https://wa.me/524641060964?text=${encodeURIComponent(
    `¡Hola! Me interesa "${product.name}" de SD Creations. ¿Me ayudas a revisar disponibilidad?`
  )}`

  return (
    <div
      className="product-detail"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="product-detail__panel">
        <span className="product-detail__bubble product-detail__bubble--pink" />
        <span className="product-detail__bubble product-detail__bubble--blue" />

        <button
          type="button"
          className="product-detail__close"
          onClick={onClose}
          aria-label="Cerrar producto"
        >
          <span />
          <span />
        </button>

        <div className="product-detail__media">
          <div className="product-detail__main-image">
            {product.images?.[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
              />
            ) : (
              <div className="product-detail__image-placeholder">
                SD
              </div>
            )}

            <div className="product-detail__media-badges">
              {product.customizable && (
                <span className="product-detail__media-badge product-detail__media-badge--pink">
                  Personalizable
                </span>
              )}

              {product.soldOut && (
                <span className="product-detail__media-badge product-detail__media-badge--sold">
                  Agotado
                </span>
              )}
            </div>
          </div>

          {product.images?.length > 1 && (
            <div className="product-detail__thumbs">
              {product.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={
                    selectedImage === index
                      ? 'product-detail__thumb is-active'
                      : 'product-detail__thumb'
                  }
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__content">
          <span className="product-detail__brand">SD CREATIONS</span>

          <h2>{product.name}</h2>

          <div className="product-detail__price-row">
            <div className="product-detail__price">
              <small>{product.quoteOnly ? 'Cotización' : 'Precio'}</small>
              <strong>{displayedPrice}</strong>
            </div>

            {product.variants?.length > 0 && (
              <span className="product-detail__price-note">
                según opción
              </span>
            )}
          </div>

          <p className="product-detail__description">
            {product.description}
          </p>

          {product.variants?.length > 0 && (
            <div className="product-detail__section">
              <span className="product-detail__section-label">
                Elige una opción
              </span>

              <div className="product-detail__variants">
                {product.variants.map((variant) => {
                  const active = selectedVariant?.id === variant.id

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      className={
                        active
                          ? 'product-detail__variant is-active'
                          : 'product-detail__variant'
                      }
                      onClick={() => setSelectedVariantId(variant.id)}
                    >
                      <span>{variant.name}</span>
                      <strong>{formatPrice(variant.price)}</strong>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {product.customizable && !product.soldOut && (
            <div className="product-detail__section">
              <label
                className="product-detail__section-label"
                htmlFor={`customization-${product.id}`}
              >
                ¿Cómo te gustaría personalizarlo?
              </label>

              <div className="product-detail__customization">
                <textarea
                  id={`customization-${product.id}`}
                  value={customization}
                  onChange={(event) =>
                    setCustomization(event.target.value)
                  }
                  placeholder="Ej. nombre Amara, tonos rosa y morado, frase corta..."
                  maxLength={220}
                />

                <span>{customization.length}/220</span>
              </div>
            </div>
          )}

          {product.notes && (
            <div className="product-detail__note">
              <span className="product-detail__note-dot" />
              <p>{product.notes}</p>
            </div>
          )}

          {product.soldOut ? (
            <div className="product-detail__sold">
              <div>
                <small>Por ahora</small>
                <strong>Temporalmente agotado</strong>
              </div>

              <a
                href={availabilityUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="product-detail__sold-icon">
                  <WhatsAppIcon />
                </span>
                Preguntar disponibilidad
              </a>
            </div>
          ) : (
            <div className="product-detail__purchase">
              <div className="product-detail__quantity">
                <span>Cantidad</span>

                <div>
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>

                  <strong>{quantity}</strong>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="product-detail__add"
                onClick={handleAddToCart}
              >
                <span className="product-detail__add-icon">
                  <BagIcon />
                </span>

                <span>
                  <small>
                    {product.quoteOnly
                      ? 'Guardar para cotizar'
                      : 'Añadir al pedido'}
                  </small>

                  <strong>
                    {product.quoteOnly
                      ? 'Agregar al carrito'
                      : unitPrice !== null
                        ? `Agregar · ${formatPrice(unitPrice * quantity)}`
                        : 'Agregar al carrito'}
                  </strong>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductModal
