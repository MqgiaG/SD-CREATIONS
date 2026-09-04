import './Hero.css'
import logo from '../../assets/sd-logo.png'

function Hero() {
  return (
    <section className="hero" id="inicio">
      {/* GLOBOS */}

      <div className="hero__balloon hero__balloon--pink">
        <span className="hero__balloon-shine" />
        <span className="hero__balloon-knot" />
        <span className="hero__balloon-string" />
      </div>

      <div className="hero__balloon hero__balloon--purple">
        <span className="hero__balloon-shine" />
        <span className="hero__balloon-knot" />
        <span className="hero__balloon-string" />
      </div>

      <div className="hero__balloon hero__balloon--blue">
        <span className="hero__balloon-shine" />
        <span className="hero__balloon-knot" />
        <span className="hero__balloon-string" />
      </div>

      <div className="hero__balloon hero__balloon--yellow">
        <span className="hero__balloon-shine" />
        <span className="hero__balloon-knot" />
        <span className="hero__balloon-string" />
      </div>

      {/* DECORACIÓN */}

      <div className="hero__orb hero__orb--pink" />
      <div className="hero__orb hero__orb--blue" />
      <div className="hero__orb hero__orb--purple" />

      <span className="hero__shape hero__shape--star">✦</span>
      <span className="hero__shape hero__shape--spark">★</span>
      <span className="hero__shape hero__shape--heart">♥</span>

      <div className="hero__container">
        {/* CONTENIDO */}

        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-icon">✦</span>
            <span>Personalizamos tus ideas</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--dark">
              <span className="hero__title-aura" />
              Regalos únicos,
            </span>

            <span className="hero__title-line hero__title-line--pink">
              diseños que
            </span>

            <span className="hero__title-line hero__title-line--purple">
              enamoran.
            </span>
          </h1>

          <p className="hero__text">
            Encuentra tazas, playeras, termos, llaveros, cajas,
            vasos y mucho más. Personaliza tus favoritos y arma
            tu pedido directamente desde nuestro carrito.
          </p>

          {/* CTAS */}

          <div className="hero__buttons">
            <a
              href="#productos"
              className="hero__button-main"
            >
              <span className="hero__button-main-spark">
                ✦
              </span>

              <span className="hero__button-main-copy">
                <small>Descubre</small>
                <strong>Explorar productos</strong>
              </span>

              <span className="hero__button-main-arrow">
                →
              </span>
            </a>

            <a
              href="https://wa.me/524641060964"
              target="_blank"
              rel="noreferrer"
              className="hero__whatsapp-link"
            >
              <span className="hero__whatsapp-circle">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" />
                  <path d="M9 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.7c.8 1.5 2 2.5 3.6 3.2l.7-.9c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.4.4.6-.1 1.4-1 2.1-2.3 2.1-3.7-.1-7.9-3.8-8.1-7.3 0-.6.1-1.1.4-1.5Z" />
                </svg>
              </span>

              <span className="hero__whatsapp-copy">
                <small>¿Ya tienes una idea?</small>
                <strong>Pídela por WhatsApp</strong>
              </span>

              <span className="hero__whatsapp-arrow">
                ↗
              </span>
            </a>
          </div>

          {/* STATS */}

          <div className="hero__stats">
            <div className="hero__stat hero__stat--pink">
              <span className="hero__stat-dot" />
              <strong>100+</strong>
              <span>Productos</span>
            </div>

            <div className="hero__stat hero__stat--blue">
              <span className="hero__stat-dot" />
              <strong>3 días</strong>
              <span>Tiempo estimado</span>
            </div>

            <div className="hero__stat hero__stat--purple">
              <span className="hero__stat-dot" />
              <strong>100%</strong>
              <span>Personalizable</span>
            </div>
          </div>
        </div>

        {/* LOGO */}

        <div className="hero__visual">
          <div className="hero__logo-aura hero__logo-aura--pink" />
          <div className="hero__logo-aura hero__logo-aura--purple" />
          <div className="hero__logo-aura hero__logo-aura--blue" />

          <div className="hero__orbit hero__orbit--1" />
          <div className="hero__orbit hero__orbit--2" />

          <div className="hero__logo-wrap">
            <span className="hero__logo-glow" />

            <img
              src={logo}
              alt="SD Creations"
              className="hero__logo"
            />
          </div>

          <span className="hero__spark hero__spark--1">✦</span>
          <span className="hero__spark hero__spark--2">✦</span>
          <span className="hero__spark hero__spark--3">★</span>
          <span className="hero__spark hero__spark--4">♥</span>
          <span className="hero__spark hero__spark--5">✦</span>
        </div>
      </div>

      <div className="hero__wave" />
    </section>
  )
}

export default Hero