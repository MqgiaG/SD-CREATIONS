import { useState } from 'react'
import './Personalize.css'

const featuredProducts = [
  {
    id: 'taza',
    catalogId: 'tazas-blancas',
    name: 'Taza',
    emoji: '☕',
    customization: 'Foto + texto',
    details: ['Foto o imagen', 'Nombre o frase', '11 oz o 15 oz'],
    placeholder:
      'Ej. Quiero una taza blanca con el nombre Amara, flores rosas, corazones y un estilo tierno...',
    generationGuide:
      'Taza blanca personalizada. Puede llevar fotografía, imagen, nombre o frase. Mantener el diseño aplicado sobre la superficie de la taza.',
  },
  {
    id: 'playera',
    catalogId: 'playeras-adulto',
    name: 'Playera',
    emoji: '👕',
    customization: 'Foto + texto + diseño',
    details: ['Color blanco', 'Tallas M, G y XL', 'Diseño al frente'],
    placeholder:
      'Ej. Quiero una playera blanca con el nombre Amara en rosa, mariposas y un diseño tierno al frente...',
    generationGuide:
      'Playera blanca para adulto. El diseño puede incluir fotografía, texto, logotipo o ilustración y debe mostrarse aplicado principalmente al frente.',
  },
  {
    id: 'caja',
    catalogId: 'cajas-personalizadas',
    name: 'Caja',
    emoji: '🎁',
    customization: 'Texto',
    details: [
      'Caja negra, blanca o rosa',
      'Letras negras, doradas, plata o rosa',
      'Solo texto',
    ],
    placeholder:
      'Ej. Quiero una caja rosa con el nombre Amara en letras doradas y una frase corta...',
    generationGuide:
      'Caja personalizada. La personalización disponible es únicamente con texto. Caja negra, blanca o rosa; letras negras, doradas, plata o rosa.',
  },
  {
    id: 'llavero',
    catalogId: 'llaveros',
    name: 'Llavero',
    emoji: '💖',
    customization: 'Fotografía',
    details: ['Fotografía', 'Modelo sujeto a disponibilidad'],
    placeholder:
      'Ej. Quiero un llavero con una foto de pareja y un estilo romántico...',
    generationGuide:
      'Llavero personalizado principalmente con fotografía. El modelo físico puede variar según disponibilidad.',
  },
  {
    id: 'cachucha',
    catalogId: 'cachuchas',
    name: 'Cachucha',
    emoji: '🧢',
    customization: 'Logo + letras',
    details: ['Logotipo', 'Nombre o letras', 'Diseño frontal'],
    placeholder:
      'Ej. Quiero una cachucha con mi logo al frente y el nombre MQGIA debajo...',
    generationGuide:
      'Cachucha personalizada con logotipo, nombre o letras. El diseño debe mostrarse aplicado en la parte frontal.',
  },
  {
    id: 'bolsa',
    catalogId: 'bolsa-ecologica',
    name: 'Bolsa',
    emoji: '👜',
    customization: 'Foto + texto',
    details: ['Fotografías', 'Frases', 'Uno o ambos lados'],
    placeholder:
      'Ej. Quiero una bolsa ecológica con una ilustración de flores y la frase Todo florece...',
    generationGuide:
      'Bolsa ecológica personalizada. Puede incluir fotografías, imágenes y frases. Puede imprimirse por un lado o por ambos.',
  },
]

const extraProducts = [
  {
    id: 'taza-magica',
    catalogId: 'tazas-magicas',
    name: 'Taza mágica',
    emoji: '🌙',
    customization: 'Foto + texto',
    details: ['Fotografía', 'Nombre o frase', 'Efecto con bebida caliente'],
    placeholder:
      'Ej. Quiero una taza mágica con una foto, el nombre Melanie y estrellas moradas...',
    generationGuide:
      'Taza mágica que revela el diseño con bebida caliente. Puede llevar fotografía y frase.',
  },
  {
    id: 'rompecabezas',
    catalogId: 'rompecabezas',
    name: 'Rompecabezas',
    emoji: '🧩',
    customization: 'Fotografía',
    details: ['Fotografía', 'Tamaño carta', 'Cartón o DTF'],
    placeholder:
      'Ej. Quiero un rompecabezas con nuestra foto familiar y una frase pequeña abajo...',
    generationGuide:
      'Rompecabezas personalizado tamaño carta. La personalización principal es una fotografía.',
  },
  {
    id: 'pines',
    catalogId: 'pines',
    name: 'Pin',
    emoji: '📍',
    customization: 'Imagen o diseño',
    details: ['Imagen o diseño', '3 cm o 6 cm'],
    placeholder:
      'Ej. Quiero un pin con mi logo rosa y morado sobre fondo blanco...',
    generationGuide:
      'Pin personalizado con imagen o diseño. Presentaciones disponibles de 3 cm y 6 cm.',
  },
  {
    id: 'folder',
    catalogId: 'folder',
    name: 'Folder',
    emoji: '📁',
    customization: 'Foto + texto',
    details: ['Fotografías', 'Nombre o texto'],
    placeholder:
      'Ej. Quiero un folder con una foto, mi nombre y detalles en rosa pastel...',
    generationGuide:
      'Folder personalizado con fotografías, imágenes y texto.',
  },
  {
    id: 'gafete',
    catalogId: 'gafets',
    name: 'Gafete',
    emoji: '🪪',
    customization: 'Foto + texto',
    details: ['Fotografía', 'Nombre', 'Logotipo o texto'],
    placeholder:
      'Ej. Quiero un gafete con mi foto, nombre, puesto y el logo de mi negocio...',
    generationGuide:
      'Gafete personalizado con fotografía, nombre, logotipo o texto.',
  },
  {
    id: 'bolsa-dulcera',
    catalogId: 'bolsa-dulcera',
    name: 'Bolsa dulcera',
    emoji: '🍬',
    customization: 'Foto + texto',
    details: ['Fotografía o personaje', 'Nombre o frase', 'Tema del evento'],
    placeholder:
      'Ej. Quiero una bolsa dulcera de cumpleaños con Stitch, nombre Amara y colores rosa y morado...',
    generationGuide:
      'Bolsa dulcera personalizada con fotografías, personajes, nombres o frases y temática de evento.',
  },
  {
    id: 'vaso',
    catalogId: 'vasos',
    name: 'Vaso',
    emoji: '🥤',
    customization: 'Texto',
    details: ['Nombre o frase', '500 ml o 750 ml', 'Solo texto'],
    placeholder:
      'Ej. Quiero un vaso de 750 ml con el nombre Amara en letras rosas...',
    generationGuide:
      'Vaso personalizado únicamente con letras o texto. Presentaciones de 500 ml y 750 ml.',
  },
  {
    id: 'taza-color',
    catalogId: 'tazas-fondo-color',
    name: 'Taza de color',
    emoji: '🌈',
    customization: 'Foto + texto',
    details: ['Fotografía', 'Texto', 'Fondo de color'],
    placeholder:
      'Ej. Quiero una taza con fondo azul, una foto al centro y una frase debajo...',
    generationGuide:
      'Taza con fondo de color personalizada con fotografía y texto.',
  },
  {
    id: 'taza-perla',
    catalogId: 'taza-perla',
    name: 'Taza perla',
    emoji: '✨',
    customization: 'Foto + texto',
    details: ['Fotografía', 'Nombre o frase', 'Acabado especial'],
    placeholder:
      'Ej. Quiero una taza perla con una foto y el nombre Vianey en letras elegantes...',
    generationGuide:
      'Taza con acabado perla personalizada con fotografías, nombres o diseños.',
  },
  {
    id: 'sticker-ropa',
    catalogId: 'sticker-ropa',
    name: 'Sticker ropa',
    emoji: '🎨',
    customization: 'Fotografía',
    details: ['Fotografía o imagen', 'Ropa oscura o mezclilla'],
    placeholder:
      'Ej. Quiero un sticker para mezclilla con una fotografía y un borde rosa...',
    generationGuide:
      'Sticker para ropa oscura o mezclilla personalizado con fotografía o imagen.',
  },
  {
    id: 'estrella-helio',
    catalogId: 'estrellas-de-helio',
    name: 'Estrella de helio',
    emoji: '⭐',
    customization: 'Texto',
    details: ['Nombre o frase', 'Solo texto'],
    placeholder:
      'Ej. Quiero una estrella de helio con Feliz cumpleaños Amara en letras rosas...',
    generationGuide:
      'Estrella de helio personalizada únicamente con texto, nombre o frase.',
  },
]

const allProducts = [...featuredProducts, ...extraProducts]

function Personalize() {
  const [selectedProduct, setSelectedProduct] = useState('taza')
  const [idea, setIdea] = useState('')
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const selectedProductData =
    allProducts.find((product) => product.id === selectedProduct) ||
    featuredProducts[0]

  const handleProductChange = (product) => {
    setSelectedProduct(product.id)
    setIdea('')
    setGenerated(false)
    setLoading(false)

    if (extraProducts.some((item) => item.id === product.id)) {
      setShowMore(true)
    }
  }

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
Personalización disponible: ${selectedProductData.customization}

Detalles del producto:
${selectedProductData.details.map((detail) => `• ${detail}`).join('\n')}

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
                {featuredProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className={`personalize__product ${
                      selectedProduct === product.id
                        ? 'personalize__product--active'
                        : ''
                    }`}
                    onClick={() => handleProductChange(product)}
                  >
                    <span className="personalize__product-icon">
                      {product.emoji}
                    </span>

                    <strong>{product.name}</strong>
                    <small>{product.customization}</small>

                    {selectedProduct === product.id && (
                      <span className="personalize__product-check">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className={`personalize__more ${
                  showMore ? 'personalize__more--open' : ''
                }`}
                onClick={() => setShowMore((current) => !current)}
              >
                <span className="personalize__more-icon">✦</span>

                <span className="personalize__more-copy">
                  <small>
                    {showMore ? 'Ocultar opciones' : 'Tenemos más para crear'}
                  </small>

                  <strong>
                    {showMore
                      ? 'Ver menos productos'
                      : 'Ver más productos personalizables'}
                  </strong>
                </span>

                <span className="personalize__more-symbol">
                  {showMore ? '−' : '+'}
                </span>
              </button>

              {showMore && (
                <div className="personalize__extras">
                  {extraProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      className={`personalize__extra ${
                        selectedProduct === product.id
                          ? 'personalize__extra--active'
                          : ''
                      }`}
                      onClick={() => handleProductChange(product)}
                    >
                      <span>{product.emoji}</span>

                      <div>
                        <strong>{product.name}</strong>
                        <small>{product.customization}</small>
                      </div>

                      {selectedProduct === product.id && <b>✓</b>}
                    </button>
                  ))}
                </div>
              )}

              <div className="personalize__rules">
                <div className="personalize__rules-top">
                  <div>
                    <span>✦</span>
                    <small>Para tu {selectedProductData.name.toLowerCase()}</small>
                  </div>

                  <strong>{selectedProductData.customization}</strong>
                </div>

                <div className="personalize__rules-list">
                  {selectedProductData.details.map((detail) => (
                    <span key={detail}>
                      <i>✓</i>
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="personalize__divider">
              <span />
              <i>✦</i>
              <span />
            </div>

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
                  placeholder={selectedProductData.placeholder}
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
                      : `Propuesta para ${selectedProductData.name.toLowerCase()}`}
                  </small>

                  <strong>
                    {loading ? 'Creando tu diseño' : 'Generar mi diseño'}
                  </strong>
                </span>

                <span className="personalize__generate-arrow">
                  {loading ? '•••' : '✦'}
                </span>
              </button>
            </div>
          </div>

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

                    <span className="personalize__magic-main">
                      {selectedProductData.emoji}
                    </span>
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
                        <span>{selectedProductData.customization} ✦</span>
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

                  <span className="personalize__whatsapp-arrow">✦</span>
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
