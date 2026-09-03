import { useState } from 'react'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header__container">

        {/* =========================
            LOGO
        ========================== */}
        <a
          href="#inicio"
          className="header__brand"
          onClick={closeMenu}
        >
          <div className="header__wordmark">
            <div className="header__sd">
              <span className="header__sd-letter header__sd-letter--s">
                S
              </span>

              <span className="header__sd-letter header__sd-letter--d">
                D
              </span>
            </div>

            <div className="header__creations">
              <span className="header__creation-letter header__creation-letter--1">
                C
              </span>
              <span className="header__creation-letter header__creation-letter--2">
                R
              </span>
              <span className="header__creation-letter header__creation-letter--3">
                E
              </span>
              <span className="header__creation-letter header__creation-letter--4">
                A
              </span>
              <span className="header__creation-letter header__creation-letter--5">
                T
              </span>
              <span className="header__creation-letter header__creation-letter--6">
                I
              </span>
              <span className="header__creation-letter header__creation-letter--7">
                O
              </span>
              <span className="header__creation-letter header__creation-letter--8">
                N
              </span>
              <span className="header__creation-letter header__creation-letter--9">
                S
              </span>
            </div>

            <span className="header__brand-star header__brand-star--one">
              ✦
            </span>

            <span className="header__brand-star header__brand-star--two">
              ♥
            </span>
          </div>

          <span className="header__slogan">
            Tu imaginación, nuestro diseño
          </span>
        </a>

        {/* =========================
            NAVEGACIÓN
        ========================== */}
        <nav
          className={`header__nav ${
            menuOpen ? 'header__nav--open' : ''
          }`}
        >
          <a
            href="#inicio"
            className="header__nav-link header__nav-link--pink"
            onClick={closeMenu}
          >
            <span className="header__nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5.5 10.5V20h13v-9.5" />
                <path d="M9.5 20v-6h5v6" />
              </svg>
            </span>

            <span>Inicio</span>
          </a>

          <a
            href="#productos"
            className="header__nav-link header__nav-link--blue"
            onClick={closeMenu}
          >
            <span className="header__nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4 8h16v12H4z" />
                <path d="M3 8h18" />
                <path d="M12 8v12" />
                <path d="M12 8c-3 0-5-1.2-5-3 0-1.2.9-2 2.1-2C11 3 12 5.5 12 8Z" />
                <path d="M12 8c3 0 5-1.2 5-3 0-1.2-.9-2-2.1-2C13 3 12 5.5 12 8Z" />
              </svg>
            </span>

            <span>Tienda</span>
          </a>

          <a
            href="#personalizados"
            className="header__nav-link header__nav-link--purple"
            onClick={closeMenu}
          >
            <span className="header__nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14 4 20 10" />
                <path d="m13 5-8.5 8.5a3.5 3.5 0 0 0 0 5 3.5 3.5 0 0 0 5 0L18 10" />
                <path d="M4 20c2.5 0 4-.5 5.5-2" />
              </svg>
            </span>

            <span>Personaliza</span>
          </a>

          <a
            href="#galeria"
            className="header__nav-link header__nav-link--cyan"
            onClick={closeMenu}
          >
            <span className="header__nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="m12 3 1.6 4.7L18 9.5l-4.4 1.8L12 16l-1.6-4.7L6 9.5l4.4-1.8Z" />
                <path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
              </svg>
            </span>

            <span>Creaciones</span>
          </a>

          <a
            href="#contacto"
            className="header__nav-link header__nav-link--yellow"
            onClick={closeMenu}
          >
            <span className="header__nav-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="3"
                />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </span>

            <span>Contacto</span>
          </a>
        </nav>

        {/* =========================
            ACCIONES
        ========================== */}
        <div className="header__actions">
          <a
            href="https://wa.me/524641060964"
            target="_blank"
            rel="noreferrer"
            className="header__whatsapp"
          >
            <span className="header__whatsapp-glow" />

            <span className="header__whatsapp-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" />
                <path d="M9 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.7c.8 1.5 2 2.5 3.6 3.2l.7-.9c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.4.4.6-.1 1.4-1 2.1-2.3 2.1-3.7-.1-7.9-3.8-8.1-7.3 0-.6.1-1.1.4-1.5Z" />
              </svg>
            </span>

            <span className="header__whatsapp-copy">
              <small>¿Quieres algo especial?</small>
              <strong>
                Pídelo por WhatsApp
                <span>→</span>
              </strong>
            </span>
          </a>

          <button
            type="button"
            className="header__cart"
            aria-label="Abrir carrito"
          >
            <span className="header__cart-shine" />

            <svg
              className="header__cart-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 8h12l1 12H5L6 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>

            <span className="header__cart-count">
              0
            </span>
          </button>

          <button
            type="button"
            className={`header__menu ${
              menuOpen ? 'header__menu--open' : ''
            }`}
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header