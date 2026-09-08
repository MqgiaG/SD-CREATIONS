import { useCallback, useMemo, useState } from 'react'
import './Products.css'

import products from '../../data/products'
import departments from '../../data/categories'
import ProductCard from '../ProductCard/ProductCard'
import ProductModal from '../ProductModal/ProductModal'

/* =====================================================
   NORMALIZAR TEXTO PARA BÚSQUEDA

   audífonos   -> audifonos
   electrónica -> electronica
   mágica      -> magica
   niño        -> nino
===================================================== */

const normalizeText = (text = '') =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

function Products() {
  const [activeDepartment, setActiveDepartment] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const closeProduct = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  /* =====================================================
     DEPARTMENTS
  ===================================================== */

  const departmentsWithProducts = useMemo(
    () =>
      departments.map((department) => {
        const departmentProducts = products.filter(
          (product) => product.department === department.id
        )

        return {
          ...department,
          products: departmentProducts,
        }
      }),
    []
  )

  const currentDepartment = departmentsWithProducts.find(
    (department) => department.id === activeDepartment
  )

  /* =====================================================
     SEARCH
  ===================================================== */

  const normalizedSearch = normalizeText(searchTerm)

  /* ======================
     GLOBAL SEARCH
  ====================== */

  const globalSearchResults = useMemo(() => {
    if (!normalizedSearch) {
      return []
    }

    return products.filter((product) => {
      const variantsText = product.variants
        ?.map((variant) => variant.name)
        .join(' ')

      const content = normalizeText(
        [
          product.name,
          product.description,
          product.notes,
          product.priceLabel,
          product.department,
          variantsText,
        ]
          .filter(Boolean)
          .join(' ')
      )

      return content.includes(normalizedSearch)
    })
  }, [normalizedSearch])

  /* ======================
     DEPARTMENT SEARCH
  ====================== */

  const departmentProducts = useMemo(() => {
    if (!currentDepartment) {
      return []
    }

    if (!normalizedSearch) {
      return currentDepartment.products
    }

    return currentDepartment.products.filter((product) => {
      const variantsText = product.variants
        ?.map((variant) => variant.name)
        .join(' ')

      const content = normalizeText(
        [
          product.name,
          product.description,
          product.notes,
          product.priceLabel,
          variantsText,
        ]
          .filter(Boolean)
          .join(' ')
      )

      return content.includes(normalizedSearch)
    })
  }, [currentDepartment, normalizedSearch])

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const scrollToProducts = () => {
    window.requestAnimationFrame(() => {
      document.getElementById('productos')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  const openDepartment = (departmentId) => {
    setActiveDepartment(departmentId)
    setSearchTerm('')
    scrollToProducts()
  }

  const closeDepartment = () => {
    setActiveDepartment(null)
    setSearchTerm('')
    scrollToProducts()
  }

  /* =====================================================
     DEPARTMENT PREVIEW
  ===================================================== */

  const getDepartmentPreview = (department) => {
    const preview = []

    department.products.forEach((product) => {
      const image = product.images?.[0]

      if (image && preview.length < 3) {
        preview.push({
          image,
          name: product.name,
        })
      }
    })

    if (preview.length < 3) {
      department.products.forEach((product) => {
        product.images?.slice(1).forEach((image) => {
          if (preview.length < 3) {
            preview.push({
              image,
              name: product.name,
            })
          }
        })
      })
    }

    return preview
  }

  return (
    <section className="products" id="productos">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="products__decoration" aria-hidden="true">
        <span className="products__bubble products__bubble--one" />

        <span className="products__bubble products__bubble--two" />

        <span className="products__bubble products__bubble--three" />

        <span className="products__floating products__floating--one">
          ✦
        </span>

        <span className="products__floating products__floating--two">
          ♡
        </span>

        <span className="products__floating products__floating--three">
          ★
        </span>
      </div>

      <div className="products__container">
        {/* =====================================================
            STORE HOME

            Este bloque permanece montado mientras escribes.
            El input no pierde el foco.
        ===================================================== */}

        {!activeDepartment && (
          <>
            <div className="store-hero">
              {/* ======================
                  AWNING
              ====================== */}

              <div className="store-hero__awning" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              {/* ======================
                  DECORATIONS
              ====================== */}

              <span
                className="store-hero__scribble store-hero__scribble--one"
                aria-hidden="true"
              >
                ✦
              </span>

              <span
                className="store-hero__scribble store-hero__scribble--two"
                aria-hidden="true"
              >
                ♡
              </span>

              <span
                className="store-hero__scribble store-hero__scribble--three"
                aria-hidden="true"
              >
                ★
              </span>

              {/* ======================
                  GIFT
              ====================== */}

              <div
                className="store-hero__pop store-hero__pop--gift"
                aria-hidden="true"
              >
                <div className="store-hero__pop-orbit" />

                <div className="store-hero__pop-icon">
                  <svg viewBox="0 0 64 64">
                    <rect
                      x="12"
                      y="27"
                      width="40"
                      height="28"
                      rx="4"
                    />

                    <rect
                      x="9"
                      y="20"
                      width="46"
                      height="11"
                      rx="4"
                    />

                    <path d="M32 20v35" />

                    <path d="M22 20c-7 0-9-10-2-12 7-2 12 12 12 12" />

                    <path d="M42 20c7 0 9-10 2-12-7-2-12 12-12 12" />
                  </svg>
                </div>

                <span className="store-hero__pop-label">
                  sorpresa
                </span>
              </div>

              {/* ======================
                  BALLOON
              ====================== */}

              <div
                className="store-hero__pop store-hero__pop--balloon"
                aria-hidden="true"
              >
                <div className="store-hero__pop-orbit" />

                <div className="store-hero__pop-icon">
                  <svg viewBox="0 0 64 64">
                    <path d="M32 7c-11 0-19 9-19 20 0 12 8 20 19 25 11-5 19-13 19-25C51 16 43 7 32 7Z" />

                    <path d="M28 52h8l-4 5z" />

                    <path d="M32 57c1 3 5 4 3 7" />
                  </svg>
                </div>

                <span className="store-hero__pop-label">
                  celebra
                </span>
              </div>

              {/* ======================
                  HEART
              ====================== */}

              <div
                className="store-hero__pop store-hero__pop--heart"
                aria-hidden="true"
              >
                <div className="store-hero__pop-orbit" />

                <div className="store-hero__pop-icon">
                  <svg viewBox="0 0 64 64">
                    <path d="M32 54S9 40 9 23c0-9 11-15 18-7l5 6 5-6c7-8 18-2 18 7 0 17-23 31-23 31Z" />
                  </svg>
                </div>

                <span className="store-hero__pop-label">
                  crea
                </span>
              </div>

              {/* ======================
                  SHOPPING BAG
              ====================== */}

              <div
                className="store-hero__pop store-hero__pop--bag"
                aria-hidden="true"
              >
                <div className="store-hero__pop-orbit" />

                <div className="store-hero__pop-icon">
                  <svg viewBox="0 0 64 64">
                    <path d="M15 22h34l4 34H11z" />

                    <path d="M23 24v-6c0-6 4-10 9-10s9 4 9 10v6" />

                    <path d="M26 37h12" />

                    <path d="M32 31v12" />
                  </svg>
                </div>

                <span className="store-hero__pop-label">
                  descubre
                </span>
              </div>

              {/* ======================
                  CENTER
              ====================== */}

              <div className="store-hero__center">
                <div className="store-hero__mini-sign">
                  <span>✦</span>

                  <p>BIENVENIDO A</p>

                  <span>✦</span>
                </div>

                <div className="store-hero__brand">
                  SD CREATIONS
                </div>

                <h2>
                  Encuentra algo

                  <span>
                    increíble.
                  </span>
                </h2>

                <p className="store-hero__description">
                  Personalizados, regalos, fiesta, juguetes,
                  electrónica y un montón de cosas bonitas
                  esperando por ti.
                </p>

                {/* ======================
                    GLOBAL SEARCH
                ====================== */}

                <label className="products__search products__search--main">
                  <span className="products__search-icon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        cx="10.5"
                        cy="10.5"
                        r="6"
                      />

                      <path d="m15 15 5 5" />
                    </svg>
                  </span>

                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="¿Qué se te antoja buscar?"
                    autoComplete="off"
                  />

                  {searchTerm ? (
                    <button
                      type="button"
                      className="products__search-clear"
                      onClick={() => setSearchTerm('')}
                      aria-label="Limpiar búsqueda"
                    >
                      ×
                    </button>
                  ) : (
                    <span
                      className="products__search-spark"
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                  )}
                </label>

                <div className="store-hero__microcopy">
                  <span>
                    🎁 Regalos
                  </span>

                  <b>•</b>

                  <span>
                    ✨ Personalizados
                  </span>

                  <b>•</b>

                  <span>
                    🎉 Fiesta
                  </span>
                </div>
              </div>

              <div
                className="store-hero__floor"
                aria-hidden="true"
              />
            </div>

            {/* =====================================================
                NO SEARCH → DEPARTMENTS
            ===================================================== */}

            {!normalizedSearch && (
              <>
                <div className="products__browse-label">
                  <span />

                  <div>
                    <b>✦</b>

                    <p>
                      Elige tu departamento
                    </p>

                    <b>✦</b>
                  </div>

                  <span />
                </div>

                <div className="departments">
                  {departmentsWithProducts.map(
                    (department, index) => {
                      const previews =
                        getDepartmentPreview(department)

                      return (
                        <button
                          key={department.id}
                          type="button"
                          className={`department department--${department.accent} department--${
                            index + 1
                          }`}
                          onClick={() =>
                            openDepartment(department.id)
                          }
                        >
                          <span className="department__ambient" />

                          <div className="department__copy">
                            <div className="department__heading">
                              <span className="department__symbol">
                                {department.symbol}
                              </span>

                              <span className="department__eyebrow">
                                {department.eyebrow}
                              </span>
                            </div>

                            <h3>
                              {department.name}
                            </h3>

                            <p>
                              {department.description}
                            </p>

                            <div className="department__footer">
                              <span className="department__open">
                                Explorar productos

                                <b aria-hidden="true">
                                  ✦
                                </b>
                              </span>
                            </div>
                          </div>

                          <div className="department__visual">
                            <span className="department__visual-shape" />

                            {previews.map(
                              (
                                preview,
                                previewIndex
                              ) => (
                                <div
                                  key={`${preview.image}-${previewIndex}`}
                                  className={`department__product department__product--${
                                    previewIndex + 1
                                  }`}
                                >
                                  <img
                                    src={preview.image}
                                    alt=""
                                    loading="lazy"
                                  />
                                </div>
                              )
                            )}

                            <span
                              className="department__mini-spark department__mini-spark--one"
                              aria-hidden="true"
                            >
                              ✦
                            </span>

                            <span
                              className="department__mini-spark department__mini-spark--two"
                              aria-hidden="true"
                            >
                              ♥
                            </span>
                          </div>
                        </button>
                      )
                    }
                  )}
                </div>
              </>
            )}

            {/* =====================================================
                LIVE SEARCH RESULTS
            ===================================================== */}

            {normalizedSearch && (
              <div className="products__results products__results--live">
                <div className="products__result-title">
                  <span>
                    Resultados
                  </span>

                  <h2>
                    Mira lo que

                    <strong>
                      {' '}
                      encontramos.
                    </strong>
                  </h2>

                  <p>
                    {globalSearchResults.length}{' '}

                    {globalSearchResults.length === 1
                      ? 'resultado'
                      : 'resultados'}{' '}

                    para “{searchTerm}”.
                  </p>
                </div>

                {globalSearchResults.length > 0 ? (
                  <div className="products__grid">
                    {globalSearchResults.map(
                      (product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={index}
                          onOpen={setSelectedProduct}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="products__empty">
                    <span>
                      ✦
                    </span>

                    <h3>
                      No encontramos ese producto
                    </h3>

                    <p>
                      Prueba escribiendo otra palabra.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setSearchTerm('')
                      }
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* =====================================================
            DEPARTMENT VIEW
        ===================================================== */}

        {currentDepartment && (
          <div
            className={`department-view department-view--${currentDepartment.accent}`}
          >
            <div className="products__topbar">
              <button
                type="button"
                className="products__back"
                onClick={closeDepartment}
              >
                <span>
                  ‹
                </span>

                Todos los departamentos
              </button>

              <label className="products__search">
                <span className="products__search-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      cx="10.5"
                      cy="10.5"
                      r="6"
                    />

                    <path d="m15 15 5 5" />
                  </svg>
                </span>

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder={`Buscar en ${currentDepartment.shortName}...`}
                  autoComplete="off"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchTerm('')
                    }
                    aria-label="Limpiar búsqueda"
                  >
                    ×
                  </button>
                )}
              </label>
            </div>

            <header className="department-view__hero">
              <span
                className="department-view__decor department-view__decor--one"
                aria-hidden="true"
              />

              <span
                className="department-view__decor department-view__decor--two"
                aria-hidden="true"
              />

              <div className="department-view__icon">
                {currentDepartment.symbol}
              </div>

              <div className="department-view__copy">
                <span>
                  {currentDepartment.eyebrow}
                </span>

                <h2>
                  {currentDepartment.name}
                </h2>

                <p>
                  {currentDepartment.description}
                </p>
              </div>

              <div
                className="department-view__spark"
                aria-hidden="true"
              >
                ✦
              </div>
            </header>

            <div className="department-view__label">
              <span />

              <p>
                Explora los productos
              </p>

              <span />
            </div>

            {departmentProducts.length > 0 ? (
              <div className="products__grid">
                {departmentProducts.map(
                  (product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onOpen={setSelectedProduct}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="products__empty">
                <span>
                  ✦
                </span>

                <h3>
                  No encontramos ese producto
                </h3>

                <p>
                  Intenta con otro nombre.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={closeProduct}
      />
    </section>
  )
}

export default Products