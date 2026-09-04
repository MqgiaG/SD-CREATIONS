import './ProductCard.css'

const cardStyles = [
  'pink',
  'purple',
  'blue',
  'yellow',
  'mint',
  'coral',
]

function ProductCard({
  product,
  index = 0,
  onOpen,
}) {
  const image = product.images?.[0]

  const getPrice = () => {
    if (product.priceLabel) {
      return product.priceLabel
    }

    if (typeof product.price === 'number') {
      return `$${product.price.toLocaleString('es-MX')}`
    }

    return 'Consultar'
  }

  const style =
    cardStyles[index % cardStyles.length]

  return (
    <article
      className={`product-card product-card--${style}`}
    >
      <button
        type="button"
        className="product-card__button"
        onClick={() => onOpen(product)}
        aria-label={`Ver ${product.name}`}
      >
        <div className="product-card__media">
          <div className="product-card__blob" />

          {image ? (
            <img
              src={image}
              alt={product.name}
              loading="lazy"
            />
          ) : (
            <div className="product-card__placeholder">
              ✦
            </div>
          )}

          <div className="product-card__badges">
            {product.customizable && (
              <span className="product-card__badge">
                ✦ Personalizable
              </span>
            )}

            {product.soldOut && (
              <span className="product-card__badge product-card__badge--sold">
                Agotado
              </span>
            )}
          </div>
        </div>

        <div className="product-card__content">
          <div className="product-card__copy">
            <h3>{product.name}</h3>

            <p>{product.description}</p>
          </div>

          <div className="product-card__bottom">
            <div className="product-card__price">
              <small>
                {product.quoteOnly
                  ? 'Consulta'
                  : 'Precio'}
              </small>

              <strong>{getPrice()}</strong>
            </div>

            <span className="product-card__arrow">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M5 12h13" />
                <path d="m14 7 5 5-5 5" />
              </svg>
            </span>
          </div>
        </div>
      </button>
    </article>
  )
}

export default ProductCard