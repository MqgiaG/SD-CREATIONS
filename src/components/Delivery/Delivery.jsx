import './Delivery.css'

function PickupIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <linearGradient id="pickupMini" x1="10" y1="8" x2="70" y2="72">
          <stop offset="0%" stopColor="#ff6db4" />
          <stop offset="100%" stopColor="#e83d9d" />
        </linearGradient>
      </defs>

      <path
        d="M40 7C27.5 7 18 16.3 18 28c0 15.7 22 35 22 35s22-19.3 22-35C62 16.3 52.5 7 40 7Z"
        fill="url(#pickupMini)"
      />

      <circle cx="40" cy="28" r="11" fill="#fff" />

      <path
        d="m34 28 4 4 8-9"
        fill="none"
        stroke="#eb459e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="m19 62 15-6 14 4 14-5"
        fill="none"
        stroke="#9ed7f6"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PaymentIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <linearGradient id="paymentMiniOne" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff62b0" />
          <stop offset="100%" stopColor="#d44cc6" />
        </linearGradient>

        <linearGradient id="paymentMiniTwo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a69ef" />
          <stop offset="100%" stopColor="#607dea" />
        </linearGradient>
      </defs>

      <rect
        x="13"
        y="19"
        width="47"
        height="30"
        rx="9"
        fill="url(#paymentMiniOne)"
        transform="rotate(-8 13 19)"
      />

      <rect
        x="22"
        y="31"
        width="48"
        height="31"
        rx="9"
        fill="url(#paymentMiniTwo)"
        transform="rotate(4 22 31)"
      />

      <rect x="29" y="41" width="34" height="5" rx="2.5" fill="#fff" opacity=".28" />
      <rect x="30" y="51" width="12" height="4" rx="2" fill="#fff" />
      <circle cx="58" cy="54" r="5" fill="#ffd45a" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <linearGradient id="clockMini" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#62bdf7" />
          <stop offset="100%" stopColor="#696ae9" />
        </linearGradient>
      </defs>

      <circle cx="40" cy="42" r="27" fill="url(#clockMini)" />
      <circle cx="40" cy="42" r="20" fill="#fff" />

      <path
        d="M40 29v14l10 6"
        fill="none"
        stroke="#6263e1"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="40" cy="42" r="3.5" fill="#ff5ca8" />

      <path
        d="m22 18-7-7M58 18l7-7"
        stroke="#5da5ef"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="homeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff6caf" />
          <stop offset="100%" stopColor="#e83ba1" />
        </linearGradient>
      </defs>

      <path
        d="M32 4C18 4 8 14.5 8 27.5 8 44 32 61 32 61s24-17 24-33.5C56 14.5 46 4 32 4Z"
        fill="url(#homeGradient)"
      />

      <path
        d="m19 29 13-12 13 12v15H36v-9h-8v9h-9V29Z"
        fill="#fff"
      />
    </svg>
  )
}

function ScooterIcon() {
  return (
    <svg viewBox="0 0 70 56" aria-hidden="true">
      <circle cx="18" cy="44" r="8" fill="#4e456d" />
      <circle cx="53" cy="44" r="8" fill="#4e456d" />

      <circle cx="18" cy="44" r="4" fill="#dce8ff" />
      <circle cx="53" cy="44" r="4" fill="#dce8ff" />

      <path
        d="M23 40h23l6-17H35l-7 8H17"
        fill="none"
        stroke="#9564e8"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path d="M31 15h23l-4 14H27Z" fill="#ff69ad" />

      <path
        d="M51 23h8m-1 0-3-10"
        stroke="#6559c9"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

const payments = ['Tarjeta', 'Transferencia', 'Depósito', 'Efectivo']

function Delivery() {
  return (
    <section className="delivery" id="entregas">
      <div className="delivery__glow delivery__glow--pink" />
      <div className="delivery__glow delivery__glow--blue" />

      <div className="delivery__container">
        <header className="delivery__header">
          <span className="delivery__eyebrow">
            <i />
            Entrega & pagos
            <i />
          </span>

          <h2>
            Así llega tu idea <span>hasta tus manos.</span>
          </h2>

          <p>
            Recibe, paga y disfruta. Así de sencillo.
          </p>
        </header>

        <div className="delivery__route">
          <div className="delivery__route-line" aria-hidden="true">
            <span />
            <span />
          </div>

          <article className="delivery__step delivery__step--pink">
            <span className="delivery__number">01</span>

            <div className="delivery__icon">
              <PickupIcon />
            </div>

            <small>Entrega</small>

            <h3>Tú decides cómo</h3>

            <p>
              Recoge con nosotros o pide entrega local a domicilio.
            </p>

            <div className="delivery__mini-info">
              <span>Recoge aquí</span>
              <span>Domicilio desde $100</span>
            </div>
          </article>

          <article className="delivery__step delivery__step--purple">
            <span className="delivery__number">02</span>

            <div className="delivery__icon">
              <PaymentIcon />
            </div>

            <small>Formas de pago</small>

            <h3>Paga como prefieras</h3>

            <p>
              Elige la opción que más te convenga al confirmar.
            </p>

            <div className="delivery__payments">
              {payments.map((payment, index) => (
                <span key={payment}>
                  <i className={`delivery__dot delivery__dot--${index + 1}`} />
                  {payment}
                </span>
              ))}
            </div>
          </article>

          <article className="delivery__step delivery__step--blue">
            <span className="delivery__number">03</span>

            <div className="delivery__icon">
              <ClockIcon />
            </div>

            <small>Tiempo</small>

            <h3>Lo hacemos con cariño</h3>

            <p>
              La mayoría de personalizados pueden estar listos en:
            </p>

            <div className="delivery__time">
              <strong>1</strong>

              <span>
                <b>DÍA</b>
                <small>aproximadamente</small>
              </span>
            </div>
          </article>
        </div>

        <div className="delivery__location-bar">
          <div className="delivery__address">
            <div className="delivery__address-icon">
              <HomeIcon />
            </div>

            <div className="delivery__address-copy">
              <small>Nuestro domicilio</small>

              <h3>
                Mina 207
                <span>·</span>
                San Felipe, Gto.
              </h3>

              <p>
                Aquí puedes recoger directamente tu pedido.
              </p>
            </div>
          </div>

          <div className="delivery__separator" />

          <div className="delivery__local">
            <div className="delivery__local-icon">
              <ScooterIcon />
            </div>

            <div>
              <small>Entrega local</small>
              <strong>Desde $100</strong>
              <p>Hasta la puerta de tu casa.</p>
            </div>
          </div>

          <div className="delivery__separator" />

          <div className="delivery__shipping">
            <span className="delivery__shipping-symbol">
              <i />
            </span>

            <div>
              <small>Importante</small>
              <strong>No manejamos envíos</strong>
              <p>Solo entrega local por ahora.</p>
            </div>
          </div>
        </div>

        <div className="delivery__bottom">
          <p className="delivery__note">
            <span>!</span>
            Disponibilidad y tiempo final se confirman contigo antes de elaborar tu pedido.
          </p>

          <a
            href="https://wa.me/524641060964"
            target="_blank"
            rel="noreferrer"
            className="delivery__whatsapp"
          >
            <span className="delivery__whatsapp-icon">
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <path
                  d="M16 4.5A11.3 11.3 0 0 0 6.4 22l-1.5 5 5.2-1.3A11.4 11.4 0 1 0 16 4.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M11.7 10.8c.3-.6.6-.7 1-.7h.7c.4 0 .7.2.9.7l1.1 2.5c.2.4.1.8-.2 1.1l-.9 1c.9 1.9 2.5 3.3 4.4 4.2l.9-1.1c.3-.4.7-.5 1.1-.3l2.5 1.2c.5.2.7.5.7.9-.1 1.8-1.3 2.9-3 2.9-4.8-.1-10.3-5-10.7-9.6-.1-1 .2-1.8.7-2.6Z"
                  fill="currentColor"
                />
              </svg>
            </span>

            <span>
              <small>¿Tienes alguna duda?</small>
              <strong>Pregúntanos por WhatsApp</strong>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Delivery