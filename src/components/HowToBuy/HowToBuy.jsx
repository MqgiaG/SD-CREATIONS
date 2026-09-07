import './HowToBuy.css'

function BagIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="bagGradient" x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#ff55a7" />
          <stop offset="100%" stopColor="#ff86c4" />
        </linearGradient>
      </defs>

      <path
        d="M17 23h30l-3 28H20L17 23Z"
        fill="url(#bagGradient)"
      />

      <path
        d="M24 24c0-8 3.2-12 8-12s8 4 8 12"
        fill="none"
        stroke="#b93078"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M32 32c-4.8-5.8-11.5.5-5.8 6.2L32 44l5.8-5.8C43.5 32.5 36.8 26.2 32 32Z"
        fill="#fff"
      />
    </svg>
  )
}

function IdeaIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect
        x="9"
        y="11"
        width="38"
        height="43"
        rx="10"
        fill="#f4edff"
        stroke="#c6a8ff"
        strokeWidth="3"
      />

      <path
        d="M17 23h20M17 31h16M17 39h11"
        fill="none"
        stroke="#9c72e9"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="m43 13 10 7-19 31-10 3 3-10 16-31Z"
        fill="#ff70ac"
      />

      <path
        d="m43 13 10 7"
        fill="none"
        stroke="#7f56d8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PreviewIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect
        x="8"
        y="13"
        width="46"
        height="37"
        rx="10"
        fill="#eaf6ff"
        stroke="#79b9f7"
        strokeWidth="3"
      />

      <circle cx="43" cy="24" r="5" fill="#ffd166" />

      <path
        d="m14 44 12-13 9 8 7-6 8 11H14Z"
        fill="#77acf2"
      />

      <path
        d="M48 38c-3.7-4.5-9.2.2-4.7 4.7L48 47l4.7-4.3c4.5-4.5-1-9.2-4.7-4.7Z"
        fill="#ff68a7"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="whatsappGradient" x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#35d978" />
          <stop offset="100%" stopColor="#21bb5c" />
        </linearGradient>
      </defs>

      <path
        d="M32 8C19.2 8 9 17.8 9 30c0 4.6 1.5 8.9 4 12.4L10 55l13-3.7A24.3 24.3 0 0 0 32 53c12.8 0 23-9.8 23-23S44.8 8 32 8Z"
        fill="url(#whatsappGradient)"
      />

      <path
        d="M24.8 20.5c.7-1.4 1.4-1.5 2.4-1.5h1.8c.7 0 1.5.3 2.1 1.8l2.7 6.2c.4 1 .3 1.8-.4 2.6l-2.2 2.5c2.4 5 6.2 8.4 11.4 10.7l2.3-3c.7-.9 1.6-1.2 2.7-.8l6.4 3c1.2.5 1.8 1.2 1.8 2.2-.2 4.5-3.2 7.1-7.5 7.1-12.5-.2-27.5-13-28.3-25-.2-2.4.5-4.5 1.8-5.8Z"
        fill="#fff"
        transform="scale(.7) translate(8.5 7)"
      />
    </svg>
  )
}

const steps = [
  {
    number: '01',
    eyebrow: 'Explora',
    title: 'Elige tu producto',
    description:
      'Encuentra el artículo que quieres personalizar: taza, playera, caja, llavero, cachucha y mucho más.',
    action: 'Explorar productos',
    accent: 'pink',
    icon: BagIcon,
  },
  {
    number: '02',
    eyebrow: 'Imagina',
    title: 'Cuéntanos tu idea',
    description:
      'Dinos colores, nombres, frases, temática o imágenes para acercarnos lo más posible a lo que imaginas.',
    action: 'Describe tu idea',
    accent: 'purple',
    icon: IdeaIcon,
  },
  {
    number: '03',
    eyebrow: 'Visualiza',
    title: 'Mira tu propuesta',
    description:
      'Creamos una referencia visual para que puedas imaginar cómo podría quedar tu producto antes de confirmar.',
    action: 'Mira el resultado',
    accent: 'blue',
    icon: PreviewIcon,
  },
  {
    number: '04',
    eyebrow: 'Confirma',
    title: 'Confirma por WhatsApp',
    description:
      'Si te gusta la propuesta, confirmamos contigo detalles, precio, tiempo de entrega y forma de pago.',
    action: 'Escríbenos',
    accent: 'yellow',
    icon: WhatsAppIcon,
  },
]

function HowToBuy() {
  return (
    <section className="howtobuy" id="como-comprar">
      <div className="howtobuy__glow howtobuy__glow--pink" />
      <div className="howtobuy__glow howtobuy__glow--blue" />

      <div className="howtobuy__bubble howtobuy__bubble--one" />
      <div className="howtobuy__bubble howtobuy__bubble--two" />
      <div className="howtobuy__bubble howtobuy__bubble--three" />

      <div className="howtobuy__container">
        <header className="howtobuy__header">
          <div className="howtobuy__eyebrow">
            <span />
            Cómo comprar
            <span />
          </div>

          <h2>
            Pide <strong>fácil, bonito</strong> y sin complicarte.
          </h2>

          <p>
            Sigue estos pasos y convierte tu idea en un regalo personalizado
            listo para sorprender.
          </p>
        </header>

        <div className="howtobuy__steps">
          <div className="howtobuy__route" aria-hidden="true">
            <span className="howtobuy__route-node howtobuy__route-node--one" />
            <span className="howtobuy__route-node howtobuy__route-node--two" />
            <span className="howtobuy__route-node howtobuy__route-node--three" />
          </div>

          {steps.map((step) => {
            const Icon = step.icon

            return (
              <article
                key={step.number}
                className={`howtobuy__card howtobuy__card--${step.accent}`}
              >
                <div className="howtobuy__card-top">
                  <span
                    className={`howtobuy__number howtobuy__number--${step.accent}`}
                  >
                    {step.number}
                  </span>

                  <div className="howtobuy__icon">
                    <Icon />
                  </div>
                </div>

                <small>{step.eyebrow}</small>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                <div
                  className={`howtobuy__label howtobuy__label--${step.accent}`}
                >
                  <span />
                  {step.action}
                </div>
              </article>
            )
          })}
        </div>

        <div className="howtobuy__bottom">
          <div className="howtobuy__tip">
            <div className="howtobuy__tip-mark">
              <span />
              <span />
              <span />
            </div>

            <p>
              <strong>Tip:</strong> entre más clara sea tu idea, más cercana
              será la propuesta a lo que imaginas.
            </p>
          </div>

          <a href="#personalizados" className="howtobuy__cta">
            <div className="howtobuy__cta-mark">
              <span />
              <span />
              <span />
            </div>

            <span>
              <small>¿Ya tienes una idea?</small>
              <strong>Quiero personalizar ahora</strong>
            </span>

            <i />
          </a>
        </div>
      </div>
    </section>
  )
}

export default HowToBuy