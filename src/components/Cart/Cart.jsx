import {
  useEffect,
  useState,
} from 'react'

import useCart from '../../hooks/useCart'

import './Cart.css'

const WHATSAPP_NUMBER =
  '524641060964'

/* =====================================================
   EMOJIS
===================================================== */

const EMOJI = {
  heart: String.fromCodePoint(
    0x1f496
  ),

  sparkle:
    String.fromCodePoint(
      0x2728
    ),

  bag: String.fromCodePoint(
    0x1f6cd,
    0xfe0f
  ),

  camera:
    String.fromCodePoint(
      0x1f4f8
    ),

  note:
    String.fromCodePoint(
      0x1f4dd
    ),

  pin: String.fromCodePoint(
    0x1f4cc
  ),

  money:
    String.fromCodePoint(
      0x1f4b0
    ),

  check:
    String.fromCodePoint(
      0x2705
    ),
}

/* =====================================================
   DINERO
===================================================== */

const formatMoney = (
  value
) =>
  new Intl.NumberFormat(
    'es-MX',
    {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits:
        0,
    }
  ).format(value)

/* =====================================================
   URL DE IMAGEN
===================================================== */

const isAbsoluteImageUrl = (
  value
) =>
  typeof value ===
    'string' &&
  /^https?:\/\//i.test(
    value
  )

/* =====================================================
   ILUSTRACIÓN BOLSA
===================================================== */

function BagIllustration() {
  return (
    <svg
      viewBox="0 0 180 180"
      aria-hidden="true"
    >
      <path
        d="M47 58h86l9 91H38l9-91Z"
        fill="#fff"
        stroke="#d875c7"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <path
        d="M66 63V46c0-15 10-25 24-25s24 10 24 25v17"
        fill="none"
        stroke="#7c70dc"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <circle
        cx="72"
        cy="101"
        r="5"
        fill="#4b384f"
      />

      <circle
        cx="108"
        cy="101"
        r="5"
        fill="#4b384f"
      />

      <path
        d="M78 116c7 8 18 8 25 0"
        fill="none"
        stroke="#4b384f"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <circle
        cx="62"
        cy="112"
        r="9"
        fill="#ffb4d3"
        opacity=".65"
      />

      <circle
        cx="118"
        cy="112"
        r="9"
        fill="#ffb4d3"
        opacity=".65"
      />
    </svg>
  )
}

/* =====================================================
   ICONO ELIMINAR
===================================================== */

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4 7h16" />

      <path d="M9 7V4h6v3" />

      <path d="M7 7l1 13h8l1-13" />

      <path d="M10 11v5M14 11v5" />
    </svg>
  )
}

/* =====================================================
   ICONO WHATSAPP
===================================================== */

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z" />

      <path d="M9 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.2.7l-.6.7c.8 1.5 2 2.5 3.6 3.2l.7-.9c.2-.2.4-.3.7-.2l1.9.9c.3.1.4.4.4.6-.1 1.4-1 2.1-2.3 2.1-3.7-.1-7.9-3.8-8.1-7.3 0-.6.1-1.1.4-1.5Z" />
    </svg>
  )
}

/* =====================================================
   CART
===================================================== */

function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    hasQuotedItems,

    isCartOpen,
    closeCart,

    removeFromCart,
    increaseQuantity,
    decreaseQuantity,

    clearCart,
  } = useCart()

  const [
    note,
    setNote,
  ] = useState('')

  /* =====================================================
     BLOQUEAR / LIBERAR SCROLL
  ===================================================== */

  useEffect(() => {
    const handleEscape = (
      event
    ) => {
      if (
        event.key ===
        'Escape'
      ) {
        closeCart()
      }
    }

    if (isCartOpen) {
      document.body.style.overflow =
        'hidden'

      document.documentElement.style.overflow =
        'hidden'

      window.addEventListener(
        'keydown',
        handleEscape
      )
    } else {
      document.body.style.overflow =
        ''

      document.documentElement.style.overflow =
        ''
    }

    return () => {
      document.body.style.overflow =
        ''

      document.documentElement.style.overflow =
        ''

      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [
    isCartOpen,
    closeCart,
  ])

  /* =====================================================
     MENSAJE WHATSAPP — TICKET
  ===================================================== */

  const buildMessage = () => {
    const lines = [
      `${EMOJI.heart} *SD CREATIONS* ${EMOJI.heart}`,
      '==============================',
      `${EMOJI.bag} *TICKET DE PEDIDO*`,
      '==============================',
      '',
    ]

    cartItems.forEach(
      (
        item,
        index
      ) => {
        const subtotal =
          typeof item.price ===
          'number'
            ? item.price *
              item.quantity
            : null

        /* PRODUCTO */

        lines.push(
          `*${index + 1}. ${item.name}*`
        )

        /* VARIANTE */

        if (
          item.variantName
        ) {
          lines.push(
            `${EMOJI.pin} Opción: ${item.variantName}`
          )
        }

        /* PERSONALIZACIÓN */

        if (
          item.customization
        ) {
          lines.push(
            `${EMOJI.sparkle} Personalización:`
          )

          lines.push(
            `   ${item.customization}`
          )
        }

        /* CANTIDAD */

        lines.push(
          `Cantidad: ${item.quantity}`
        )

        /* PRECIO */

        if (
          typeof item.price ===
          'number'
        ) {
          lines.push(
            `Precio unitario: ${formatMoney(
              item.price
            )}`
          )

          lines.push(
            `${EMOJI.money} Subtotal: *${formatMoney(
              subtotal
            )}*`
          )
        } else {
          lines.push(
            `${EMOJI.money} Precio: *${
              item.priceLabel ||
              'Cotizar'
            }*`
          )
        }

        /* FOTO */

        if (
          isAbsoluteImageUrl(
            item.image
          )
        ) {
          lines.push(
            `${EMOJI.camera} Foto del producto:`
          )

          lines.push(
            item.image
          )
        }

        lines.push('')

        lines.push(
          '------------------------------'
        )

        lines.push('')
      }
    )

    /* =================================================
       TOTAL
    ================================================= */

    if (
      cartTotal > 0
    ) {
      lines.push(
        `${EMOJI.money} *TOTAL ESTIMADO: ${formatMoney(
          cartTotal
        )}*`
      )
    }

    /* =================================================
       PRODUCTOS PARA COTIZAR
    ================================================= */

    if (
      hasQuotedItems
    ) {
      lines.push('')

      lines.push(
        'Algunos productos requieren cotización.'
      )
    }

    /* =================================================
       NOTA
    ================================================= */

    if (
      note.trim()
    ) {
      lines.push('')

      lines.push(
        `${EMOJI.note} *Nota del pedido:*`
      )

      lines.push(
        note.trim()
      )
    }

    /* =================================================
       CIERRE
    ================================================= */

    lines.push('')

    lines.push(
      '=============================='
    )

    lines.push(
      `${EMOJI.check} ¿Me ayudas a confirmar disponibilidad, total y forma de entrega?`
    )

    lines.push('')

    lines.push(
      `${EMOJI.sparkle} ¡Gracias!`
    )

    return lines.join(
      '\n'
    )
  }

  /* =====================================================
     ABRIR WHATSAPP

     Importante:
     URLSearchParams se encarga de codificar el texto
     completo antes de enviarlo a WhatsApp.
  ===================================================== */

  const handleWhatsApp =
    () => {
      if (
        cartItems.length ===
        0
      ) {
        return
      }

      const params =
        new URLSearchParams({
          phone:
            WHATSAPP_NUMBER,

          text:
            buildMessage(),
        })

      const whatsappUrl =
        `https://api.whatsapp.com/send?${params.toString()}`

      window.open(
        whatsappUrl,
        '_blank',
        'noopener,noreferrer'
      )
    }

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <div
      className={`cart ${
        isCartOpen
          ? 'cart--open'
          : ''
      }`}
      aria-hidden={
        !isCartOpen
      }
    >
      {/* OVERLAY */}

      <button
        type="button"
        className="cart__overlay"
        aria-label="Cerrar carrito"
        onClick={
          closeCart
        }
      />

      {/* DRAWER */}

      <aside
        className="cart__drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* HEADER */}

        <div className="cart__top">
          <div>
            <span className="cart__eyebrow">
              Tu selección
            </span>

            <h2>
              Tu pedido
            </h2>
          </div>

          <div className="cart__top-actions">
            <span className="cart__count">
              {cartCount}
            </span>

            <button
              type="button"
              className="cart__close"
              onClick={
                closeCart
              }
              aria-label="Cerrar carrito"
            >
              ×
            </button>
          </div>
        </div>

        {/* VACÍO */}

        {cartItems.length ===
        0 ? (
          <div className="cart__empty">
            <div className="cart__empty-illustration">
              <BagIllustration />
            </div>

            <span>
              Aún no elegimos
              nada
            </span>

            <h3>
              Tu bolsita está
              vacía
            </h3>

            <p>
              Explora la tienda
              y agrega tus
              favoritos.
            </p>

            <button
              type="button"
              className="cart__continue cart__continue--empty"
              onClick={
                closeCart
              }
            >
              Seguir explorando
            </button>
          </div>
        ) : (
          <>
            {/* PRODUCTOS */}

            <div className="cart__items">
              {cartItems.map(
                (
                  item
                ) => (
                  <article
                    className="cart-item"
                    key={
                      item.lineId
                    }
                  >
                    {/* IMAGEN */}

                    <div className="cart-item__image">
                      {item.image ? (
                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                        />
                      ) : (
                        <span>
                          ✦
                        </span>
                      )}
                    </div>

                    {/* CONTENIDO */}

                    <div className="cart-item__content">
                      <div className="cart-item__heading">
                        <div>
                          <h3>
                            {
                              item.name
                            }
                          </h3>

                          {item.variantName && (
                            <span>
                              {
                                item.variantName
                              }
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          className="cart-item__remove"
                          aria-label={`Eliminar ${item.name}`}
                          onClick={() =>
                            removeFromCart(
                              item.lineId
                            )
                          }
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      {/* PERSONALIZACIÓN */}

                      {item.customization && (
                        <p className="cart-item__custom">
                          “
                          {
                            item.customization
                          }
                          ”
                        </p>
                      )}

                      {/* BOTTOM */}

                      <div className="cart-item__bottom">
                        {/* CANTIDAD */}

                        <div className="cart-item__quantity">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item.lineId
                              )
                            }
                            aria-label="Reducir cantidad"
                          >
                            −
                          </button>

                          <strong>
                            {
                              item.quantity
                            }
                          </strong>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item.lineId
                              )
                            }
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>

                        {/* PRECIO */}

                        <div className="cart-item__price">
                          {typeof item.price ===
                          'number' ? (
                            <>
                              <small>
                                {item.quantity >
                                1
                                  ? `${formatMoney(
                                      item.price
                                    )} c/u`
                                  : 'Precio'}
                              </small>

                              <strong>
                                {formatMoney(
                                  item.price *
                                    item.quantity
                                )}
                              </strong>
                            </>
                          ) : (
                            <>
                              <small>
                                Precio
                              </small>

                              <strong>
                                {
                                  item.priceLabel ||
                                  'Cotizar'
                                }
                              </strong>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>

            {/* NOTA */}

            <div className="cart__note">
              <label htmlFor="cart-note">
                ¿Quieres agregar
                una nota?
              </label>

              <textarea
                id="cart-note"
                value={note}
                maxLength={400}
                onChange={(
                  event
                ) =>
                  setNote(
                    event.target
                      .value
                  )
                }
                placeholder="Ej. Lo necesito para cumpleaños, colores rosas..."
              />

              <small>
                {note.length}
                /400
              </small>
            </div>

            {/* FOOTER */}

            <div className="cart__footer">
              {/* TOTAL */}

              <div className="cart__total">
                <div>
                  <span>
                    Total estimado
                  </span>

                  {hasQuotedItems && (
                    <small>
                      + productos
                      por cotizar
                    </small>
                  )}
                </div>

                <strong>
                  {formatMoney(
                    cartTotal
                  )}
                </strong>
              </div>

              {/* WHATSAPP */}

              <button
                type="button"
                className="cart__whatsapp"
                onClick={
                  handleWhatsApp
                }
              >
                <span className="cart__whatsapp-icon">
                  <WhatsAppIcon />
                </span>

                <span>
                  <small>
                    Finalizar pedido
                  </small>

                  <strong>
                    Enviar por
                    WhatsApp
                  </strong>
                </span>

                <b>
                  ✦
                </b>
              </button>

              {/* SEGUIR COMPRANDO */}

              <button
                type="button"
                className="cart__continue"
                onClick={
                  closeCart
                }
              >
                Seguir comprando
              </button>

              {/* VACIAR */}

              <button
                type="button"
                className="cart__clear"
                onClick={
                  clearCart
                }
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default Cart