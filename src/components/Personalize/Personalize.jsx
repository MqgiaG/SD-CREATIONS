import { useState } from 'react'
import './Personalize.css'

const products = [
  { id: 'taza', name: 'Taza', emoji: '☕' },
  { id: 'playera', name: 'Playera', emoji: '👕' },
  { id: 'termo', name: 'Termo', emoji: '🥤' },
  { id: 'vaso', name: 'Vaso', emoji: '🥛' },
  { id: 'caja', name: 'Caja', emoji: '🎁' },
  { id: 'llavero', name: 'Llavero', emoji: '💖' },
]

function Personalize() {
  const [selectedProduct, setSelectedProduct] = useState('taza')
  const [idea, setIdea] = useState('')
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectedProductData =
    products.find((product) => product.id === selectedProduct) || products[0]

  const handleGenerate = () => {
    if (!idea.trim() || loading) return

    setGenerated(false)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setGenerated(true)
    }, 1800)
  }

  const whatsappMessage = encodeURIComponent(
    `¡Hola! 💕 Quiero cotizar un diseño personalizado de SD Creations.

Producto: ${selectedProductData.name}

Mi idea:
${idea}

Vi una propuesta en la página y me gustaría continuar con este diseño.`
  )

  return (
    <section className="personalize" id="personalizados">
      <div className="personalize__background">
        <div className="personalize__blob personalize__blob--pink" />
        <div className="personalize__blob personalize__blob--purple" />
        <div className="personalize__blob personalize__blob--blue" />
        <div className="personalize__blob personalize__blob--yellow" />
      </div>

      <span className="personalize__floating personalize__floating--one">✦</span>
      <span className="personalize__floating personalize__floating--two">♥</span>
      <span className="personalize__floating personalize__floating--three">★</span>
      <span className="personalize__floating personalize__floating--four">✦</span>

      <div className="personalize__container">
        <div className="personalize__heading">
          <div className="personalize__eyebrow">
            <span>✦</span>
            <p>Hazlo completamente tuyo</p>
          </div>

          <h2 className="personalize__title">
            Tú lo imaginas.
            <span> Nosotros lo creamos.</span>
          </h2>

          <p className="personalize__description">
            Elige tu producto, cuéntanos cómo te gustaría que se viera y crea
            una propuesta única antes de hacer tu pedido.
          </p>
        </div>

        <div className="personalize__workspace">
          {/* ===============================
              LADO IZQUIERDO
          =============================== */}

          <div className="personalize__creator">
            <div className="personalize__creator-decoration personalize__creator-decoration--pink" />
            <div className="personalize__creator-decoration personalize__creator-decoration--yellow" />

            <span className="personalize__sticker personalize__sticker--heart">
              ♥
            </span>

            <span className="personalize__sticker personalize__sticker--star">
              ✦
            </span>

            <div className="personalize__creator-header">
              <div className="personalize__creator-icon">
                <span>✦</span>
              </div>

              <div>
                <small>Tu espacio creativo</small>
                <h3>Crea algo completamente tuyo</h3>
              </div>
            </div>

            {/* PASO 1 */}

            <div className="personalize__step">
              <div className="personalize__step-header">
                <span className="personalize__step-number personalize__step-number--pink">
                  01
                </span>

                <div>
                  <small>Empieza por aquí</small>
                  <h4>¿Qué quieres personalizar?</h4>
                </div>
              </div>

              <div className="personalize__products">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className={`personalize__product ${
                      selectedProduct === product.id
                        ? 'personalize__product--active'
                        : ''
                    }`}
                    onClick={() => {
                      setSelectedProduct(product.id)
                      setGenerated(false)
                    }}
                  >
                    <span className="personalize__product-icon">
                      {product.emoji}
                    </span>

                    <strong>{product.name}</strong>

                    {selectedProduct === product.id && (
                      <span className="personalize__product-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="personalize__divider">
              <span />
              <i>✦</i>
              <span />
            </div>

            {/* PASO 2 */}

            <div className="personalize__step">
              <div className="personalize__step-header">
                <span className="personalize__step-number personalize__step-number--purple">
                  02
                </span>

                <div>
                  <small>Ahora viene la magia</small>
                  <h4>Describe lo que imaginas</h4>
                </div>
              </div>

              <div className="personalize__prompt">
                <span className="personalize__prompt-decoration personalize__prompt-decoration--star">
                  ✦
                </span>

                <span className="personalize__prompt-decoration personalize__prompt-decoration--heart">
                  ♥
                </span>

                <textarea
                  value={idea}
                  maxLength="350"
                  onChange={(event) => {
                    setIdea(event.target.value)
                    setGenerated(false)
                  }}
                  placeholder="Ej. Quiero una taza blanca con el nombre Amara, flores rosas, corazones y un estilo tierno..."
                />

                <div className="personalize__prompt-footer">
                  <span>{idea.length}/350</span>

                  <p>
                    <span>✦</span>
                    Entre más detalles nos cuentes, mejor.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={`personalize__generate ${
                  loading ? 'personalize__generate--loading' : ''
                }`}
                onClick={handleGenerate}
                disabled={!idea.trim() || loading}
              >
                <span className="personalize__generate-shine" />

                <span className="personalize__generate-icon">
                  {loading ? '✦' : '✨'}
                </span>

                <span className="personalize__generate-copy">
                  <small>
                    {loading
                      ? 'La magia está sucediendo...'
                      : 'Haz realidad tu idea'}
                  </small>

                  <strong>
                    {loading ? 'Creando tu diseño' : 'Generar mi diseño'}
                  </strong>
                </span>

                <span className="personalize__generate-arrow">
                  {loading ? '•••' : '→'}
                </span>
              </button>
            </div>
          </div>

          {/* ===============================
              LADO DERECHO
          =============================== */}

          <div className="personalize__result">
            <div className="personalize__result-decoration personalize__result-decoration--pink" />
            <div className="personalize__result-decoration personalize__result-decoration--blue" />

            <div className="personalize__result-header">
              <div>
                <small>Tu creación</small>
                <h3>Así podría quedar</h3>
              </div>

              <div className="personalize__creative-label">
                <span>✦</span>
                Diseño creativo
              </div>
            </div>

            <div className="personalize__scene">
              <div className="personalize__rainbow">
                <span />
                <span />
                <span />
              </div>

              <div className="personalize__cloud personalize__cloud--one" />
              <div className="personalize__cloud personalize__cloud--two" />

              <div className="personalize__sun">
                <span />
              </div>

              <span className="personalize__scene-star personalize__scene-star--one">
                ✦
              </span>

              <span className="personalize__scene-star personalize__scene-star--two">
                ★
              </span>

              <span className="personalize__scene-heart">♥</span>

              <div className="personalize__scene-floor" />

              {!generated && !loading && (
                <div className="personalize__empty">
                  <div className="personalize__magic">
                    <span className="personalize__magic-aura" />

                    <span className="personalize__magic-spark personalize__magic-spark--one">
                      ✦
                    </span>

                    <span className="personalize__magic-spark personalize__magic-spark--two">
                      ★
                    </span>

                    <span className="personalize__magic-main">✦</span>
                  </div>

                  <span className="personalize__empty-label">
                    Todo comienza con una idea
                  </span>

                  <h4>Tu diseño aparecerá aquí</h4>

                  <p>
                    Cuéntanos cómo lo imaginas y crearemos una propuesta para tu{' '}
                    <strong>{selectedProductData.name.toLowerCase()}</strong>.
                  </p>

                  <div className="personalize__color-dots">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {loading && (
                <div className="personalize__loading">
                  <div className="personalize__loading-world">
                    <span className="personalize__loading-center">✦</span>

                    <span className="personalize__loading-item personalize__loading-item--one">
                      ♥
                    </span>

                    <span className="personalize__loading-item personalize__loading-item--two">
                      ★
                    </span>

                    <span className="personalize__loading-item personalize__loading-item--three">
                      ✦
                    </span>
                  </div>

                  <h4>Creando algo especial...</h4>

                  <p>
                    Estamos preparando una propuesta para tu{' '}
                    {selectedProductData.name.toLowerCase()}.
                  </p>
                </div>
              )}

              {generated && !loading && (
                <div className="personalize__generated">
                  <span className="personalize__generated-pop personalize__generated-pop--one">
                    ✦
                  </span>

                  <span className="personalize__generated-pop personalize__generated-pop--two">
                    ♥
                  </span>

                  <div className="personalize__generated-card">
                    <span className="personalize__tape personalize__tape--one" />
                    <span className="personalize__tape personalize__tape--two" />

                    <div className="personalize__generated-content">
                      <span className="personalize__generated-emoji">
                        {selectedProductData.emoji}
                      </span>

                      <div>
                        <small>SD CREATIONS</small>
                        <strong>{selectedProductData.name}</strong>
                        <span>Tu diseño personalizado ✦</span>
                      </div>
                    </div>
                  </div>

                  <div className="personalize__generated-description">
                    <span>Tu idea</span>
                    <p>{idea}</p>
                  </div>
                </div>
              )}
            </div>

            {generated && (
              <div className="personalize__actions">
                <button
                  type="button"
                  className="personalize__again"
                  onClick={handleGenerate}
                >
                  <span>✦</span>
                  Crear otra propuesta
                </button>

                <a
                  href={`https://wa.me/524641060964?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="personalize__whatsapp"
                >
                  <span className="personalize__whatsapp-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" />
                      <path d="M9 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.7c.8 1.5 2 2.5 3.6 3.2l.7-.9c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.4.4.6-.1 1.4-1 2.1-2.3 2.1-3.7-.1-7.9-3.8-8.1-7.3 0-.6.1-1.1.4-1.5Z" />
                    </svg>
                  </span>

                  <span className="personalize__whatsapp-copy">
                    <small>¿Te gustó esta propuesta?</small>
                    <strong>Quiero este diseño</strong>
                  </span>

                  <span className="personalize__whatsapp-arrow">↗</span>
                </a>
              </div>
            )}

            <div className="personalize__notice">
              <span>i</span>

              <p>
                Esta imagen es una referencia visual. El diseño final se
                confirma contigo antes de elaborar el producto.
              </p>
            </div>
          </div>
        </div>

        <div className="personalize__footer-message">
          <span>✦</span>
          <p>
            Cada diseño puede ser diferente.
            <strong> Ahí está la magia.</strong>
          </p>
          <span>♥</span>
        </div>
      </div>
    </section>
  )
}

export default Personalize