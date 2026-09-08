import './Contact.css'

const FACEBOOK_URL =
  'https://www.facebook.com/share/1DmEGoAYtg/?mibextid=wwXIfr'

const TIKTOK_URL =
  'https://www.tiktok.com/@sdcreations_0?_r=1&_t=ZS-99Eqz3I4Q8A'

const WHATSAPP_GROUP_URL =
  'https://chat.whatsapp.com/DfNLK8ejGz7DfaFcJm3h9c?s=cl&p=i&mlu=4'

const WHATSAPP_URL = 'https://wa.me/524641060964'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M24 5C13.6 5 5.2 12.9 5.2 22.7c0 3.8 1.2 7.4 3.3 10.3L6 43l10.4-2.8A19.5 19.5 0 0 0 24 41.7c10.4 0 18.8-7.9 18.8-19S34.4 5 24 5Z"
        fill="currentColor"
      />

      <path
        d="M18.2 14.8c.5-1 1-1.1 1.8-1.1h1.4c.6 0 1.1.2 1.6 1.3l2 4.6c.3.7.2 1.3-.3 1.9l-1.7 1.8c1.8 3.7 4.7 6.2 8.6 8l1.7-2.2c.5-.7 1.2-.8 2-.5l4.8 2.2c.9.4 1.3.9 1.3 1.6-.2 3.3-2.4 5.2-5.6 5.2-9.4-.1-20.6-9.6-21.2-18.4-.1-1.8.4-3.3 1.3-4.4Z"
        fill="#fff"
        transform="scale(.74) translate(7 6)"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="#4b8df5" />

      <path
        d="M27.5 16h5v-6c-.9-.1-3.8-.4-7.2-.4-7.1 0-12 4.3-12 12.3v6.7H7v6.7h6.3V44h8.1v-8.7h7l1.1-6.7h-8.1v-5.9c0-2 .6-6.7 6.1-6.7Z"
        fill="#fff"
        transform="scale(.72) translate(10 5)"
      />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="#2d2435" />

      <path
        d="M28.5 12.5c.4 3.4 2.4 5.7 6 6.3v5a13.2 13.2 0 0 1-6-1.8v9.1c0 5.4-3.5 8.5-8.2 8.5-4.6 0-7.8-3.5-7.8-7.9 0-5 3.8-8.3 8.8-8.3v5c-2.3 0-3.7 1.4-3.7 3.2 0 1.8 1.3 3 2.9 3 2 0 3.1-1.3 3.1-3.7V12.5h4.9Z"
        fill="#fff"
      />

      <path
        d="M28.5 12.5c.4 2.3 1.5 4 3.3 5.1"
        fill="none"
        stroke="#ff4d9f"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <path
        d="M20.7 23.8c-4.4.3-7.2 3.4-7.2 7.9"
        fill="none"
        stroke="#55d5e9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="contactPin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff58aa" />
          <stop offset="55%" stopColor="#dd4ed1" />
          <stop offset="100%" stopColor="#7c69ed" />
        </linearGradient>
      </defs>

      <path
        d="M32 5C19.2 5 10 14.3 10 26c0 15.4 22 33 22 33s22-17.6 22-33C54 14.3 44.8 5 32 5Z"
        fill="url(#contactPin)"
      />

      <path
        d="m20 28 12-10 12 10v14h-8v-8h-8v8h-8V28Z"
        fill="#fff"
      />
    </svg>
  )
}

function GiftIllustration() {
  return (
    <svg viewBox="0 0 230 230" aria-hidden="true">
      <defs>
        <linearGradient id="giftPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd5e8" />
          <stop offset="100%" stopColor="#ff9bc9" />
        </linearGradient>

        <linearGradient id="giftRibbon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f863af" />
          <stop offset="100%" stopColor="#b763e7" />
        </linearGradient>
      </defs>

      <ellipse
        cx="112"
        cy="198"
        rx="66"
        ry="14"
        fill="rgba(126,83,143,.08)"
      />

      <path
        d="M50 92c0-13 10-23 23-23h82c13 0 23 10 23 23v84c0 13-10 23-23 23H73c-13 0-23-10-23-23V92Z"
        fill="url(#giftPink)"
        stroke="#bd68d4"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <path
        d="M38 86c0-10 8-18 18-18h116c10 0 18 8 18 18v29H38V86Z"
        fill="#ffe4f1"
        stroke="#bd68d4"
        strokeWidth="5"
      />

      <rect
        x="101"
        y="69"
        width="26"
        height="130"
        rx="10"
        fill="url(#giftRibbon)"
      />

      <path
        d="M114 69c-30 1-50-13-48-29 2-14 20-18 34-4 10 10 14 33 14 33Z"
        fill="#ff8cc5"
        stroke="#bd68d4"
        strokeWidth="5"
      />

      <path
        d="M114 69c30 1 50-13 48-29-2-14-20-18-34-4-10 10-14 33-14 33Z"
        fill="#c986ed"
        stroke="#9564d7"
        strokeWidth="5"
      />

      <path
        d="M84 141c10-17 28-7 30 5 3-12 21-22 31-5 13 21-31 42-31 42s-43-21-30-42Z"
        fill="#fff"
        opacity=".96"
      />

      <path
        d="M48 60c-13-10-18-20-15-29"
        fill="none"
        stroke="#ff68ae"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M182 54c10-10 17-18 17-29"
        fill="none"
        stroke="#856ae5"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BalloonsIllustration() {
  return (
    <svg viewBox="0 0 250 300" aria-hidden="true">
      <path
        d="M96 48c0 31-23 55-45 55S9 79 9 48 31 1 52 1s44 16 44 47Z"
        fill="#ff93c7"
        stroke="#dd5fb1"
        strokeWidth="5"
      />

      <path
        d="M169 76c0 28-21 49-40 49S91 104 91 76s20-45 39-45 39 17 39 45Z"
        fill="#bc8bec"
        stroke="#9365d3"
        strokeWidth="5"
      />

      <path
        d="M239 52c0 31-23 55-45 55s-43-24-43-55S173 5 194 5s45 16 45 47Z"
        fill="#a3d6ff"
        stroke="#65ace7"
        strokeWidth="5"
      />

      <path
        d="M53 102 62 115H44ZM130 125l8 11h-16ZM194 107l9 13h-18Z"
        fill="#925fc8"
      />

      <path
        d="M53 114c8 42 34 76 72 113M130 136c2 40 1 73-5 92M194 118c-12 38-34 78-69 109"
        fill="none"
        stroke="#9d7caf"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M104 226c17 17 32 17 43 1-1 24-10 35-23 37-12-4-19-16-20-38Z"
        fill="#ff86be"
        stroke="#cb63ae"
        strokeWidth="4"
      />

      <path
        d="M50 39c5-9 11-13 17-13"
        fill="none"
        stroke="#fff"
        strokeWidth="8"
        strokeLinecap="round"
        opacity=".55"
      />

      <path
        d="M191 41c5-9 11-13 17-13"
        fill="none"
        stroke="#fff"
        strokeWidth="8"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  )
}

function MugIllustration() {
  return (
    <svg viewBox="0 0 220 220" aria-hidden="true">
      <ellipse
        cx="102"
        cy="195"
        rx="68"
        ry="13"
        fill="rgba(111,77,127,.07)"
      />

      <path
        d="M46 73h104v85c0 26-18 38-52 38s-52-12-52-38V73Z"
        fill="#fff"
        stroke="#a877ce"
        strokeWidth="5"
      />

      <path
        d="M149 101c42-4 53 17 47 41-6 25-26 37-47 30"
        fill="none"
        stroke="#6ab8ef"
        strokeWidth="15"
        strokeLinecap="round"
      />

      <path
        d="M46 73c18-14 87-14 104 0-15 15-89 15-104 0Z"
        fill="#ff9ccc"
        stroke="#c56bd3"
        strokeWidth="5"
      />

      <circle cx="88" cy="126" r="5" fill="#4b384f" />
      <circle cx="116" cy="126" r="5" fill="#4b384f" />

      <path
        d="M92 139c5 6 14 6 20 0"
        fill="none"
        stroke="#4b384f"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <circle
        cx="80"
        cy="134"
        r="7"
        fill="#ffb4d3"
        opacity=".75"
      />

      <circle
        cx="124"
        cy="134"
        r="7"
        fill="#ffb4d3"
        opacity=".75"
      />

      <path
        d="M75 50c-11-13 5-23 0-38M107 48c-9-12 6-23 1-36"
        fill="none"
        stroke="#b49abe"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StarIllustration() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true">
      <path
        d="m80 10 19 43 47 4-36 31 11 46-41-24-41 24 11-46-36-31 47-4 19-43Z"
        fill="#ffd77a"
        stroke="#efae47"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <circle cx="67" cy="75" r="4" fill="#59435b" />
      <circle cx="93" cy="75" r="4" fill="#59435b" />

      <path
        d="M72 85c5 6 11 6 16 0"
        fill="none"
        stroke="#59435b"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <circle cx="57" cy="83" r="7" fill="#ff9ebd" />
      <circle cx="103" cy="83" r="7" fill="#ff9ebd" />
    </svg>
  )
}

function Contact() {
  return (
    <section className="contact" id="contacto">
      <span className="contact__wash contact__wash--pink" />
      <span className="contact__wash contact__wash--blue" />

      <div className="contact__gift" aria-hidden="true">
        <GiftIllustration />
      </div>

      <div className="contact__balloons" aria-hidden="true">
        <BalloonsIllustration />
      </div>

      <div className="contact__mug" aria-hidden="true">
        <MugIllustration />
      </div>

      <div className="contact__star" aria-hidden="true">
        <StarIllustration />
      </div>

      <span className="contact__doodle-heart contact__doodle-heart--one" />
      <span className="contact__doodle-heart contact__doodle-heart--two" />

      <span className="contact__confetti contact__confetti--one" />
      <span className="contact__confetti contact__confetti--two" />
      <span className="contact__confetti contact__confetti--three" />
      <span className="contact__confetti contact__confetti--four" />

      <div className="contact__container">
        <header className="contact__header">
          <div className="contact__eyebrow">
            <i />
            Hablemos
            <i />
          </div>

          <h2>
            ¿Tienes una idea?
            <span>Cuéntanosla.</span>
          </h2>

          <p>
            Escríbenos y te ayudamos a convertir tu idea en un detalle bonito,
            personalizado y hecho con cariño.
          </p>

          <div className="contact__benefits">
            <div className="contact__benefit contact__benefit--pink">
              <span className="contact__benefit-symbol">♥</span>
              <strong>Detalles personalizados</strong>
            </div>

            <div className="contact__benefit contact__benefit--yellow">
              <span className="contact__benefit-symbol">◆</span>
              <strong>Atención directa</strong>
            </div>

            <div className="contact__benefit contact__benefit--purple">
              <span className="contact__benefit-symbol">▣</span>
              <strong>Recoge o recibe</strong>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="contact__whatsapp"
          >
            <span className="contact__whatsapp-icon">
              <WhatsAppIcon />
            </span>

            <span className="contact__whatsapp-copy">
              <small>WhatsApp</small>
              <strong>Escríbeme</strong>
            </span>

            <span className="contact__whatsapp-chevron">
              <i />
            </span>
          </a>

          <span className="contact__whatsapp-message">
            ¡Será un gusto leerte!
          </span>
        </header>

        <div className="contact__location">
          <span className="contact__location-swoosh contact__location-swoosh--pink" />
          <span className="contact__location-swoosh contact__location-swoosh--blue" />

          <div className="contact__pin">
            <PinIcon />
          </div>

          <small>Nuestro domicilio</small>

          <h3>
            Mina 207
            <i />
            San Felipe, Gto.
          </h3>

          <p>Aquí puedes recoger directamente tu pedido.</p>

          <div className="contact__location-info">
            <span>
              <i className="contact__location-dot contact__location-dot--pink" />
              Entrega local desde $100
            </span>

            <span>
              <i className="contact__location-dot contact__location-dot--blue" />
              Solo entrega local
            </span>
          </div>
        </div>

        <div className="contact__social">
          <span className="contact__social-line" />

          <p>
            Más de <strong>SD Creations</strong>
          </p>

          <div className="contact__social-links">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de SD Creations"
            >
              <FacebookIcon />
              <span>Facebook</span>
            </a>

            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok de SD Creations"
            >
              <TikTokIcon />
              <span>TikTok</span>
            </a>

            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Grupo de WhatsApp de SD Creations"
            >
              <span className="contact__group-icon">
                <WhatsAppIcon />
              </span>

              <span>Grupo</span>
            </a>
          </div>

          <span className="contact__social-line contact__social-line--right" />
        </div>

        <div className="contact__closing">
          Tu idea comienza aquí.
          <strong> Nosotros la hacemos especial.</strong>
        </div>
      </div>
    </section>
  )
}

export default Contact