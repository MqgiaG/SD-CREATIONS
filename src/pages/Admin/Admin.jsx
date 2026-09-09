import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import './Admin.css'

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:3001'
    : 'https://api-sdcreations.mqgiadev.com')

const TOKEN_KEY =
  'sd_creations_admin_token'

const MAX_UPLOAD_FILES = 8

const MAX_FILE_SIZE =
  8 * 1024 * 1024

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

const DEPARTMENTS = [
  {
    id: 'personalizados',
    name: 'Personalizados',
  },
  {
    id: 'fiesta-eventos',
    name: 'Fiesta & eventos',
  },
  {
    id: 'regalos-detalles',
    name: 'Regalos & detalles',
  },
  {
    id: 'infantil',
    name: 'Niños & bebé',
  },
  {
    id: 'electronica',
    name: 'Electrónica',
  },
  {
    id: 'accesorios-varios',
    name: 'Accesorios & más',
  },
]

const VARIANT_TEMPLATES = [
  {
    id: 'clothing-sizes',
    emoji: '👕',
    label: 'Tallas',
    preview: 'CH · M · G · XL',
    values: ['CH', 'M', 'G', 'XL'],
  },
  {
    id: 'cups',
    emoji: '☕',
    label: 'Tazas',
    preview: '11 oz · 15 oz',
    values: ['11 oz', '15 oz'],
  },
  {
    id: 'general-sizes',
    emoji: '📏',
    label: 'Tamaños',
    preview: 'Chico · Mediano · Grande',
    values: ['Chico', 'Mediano', 'Grande'],
  },
  {
    id: 'kids-sizes',
    emoji: '🧸',
    label: 'Infantil',
    preview: '2 · 4 · 6 · 8 · 10 · 12',
    values: ['2', '4', '6', '8', '10', '12'],
  },
]

const createVariantId = (
  suffix = ''
) =>
  `variant-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}${suffix ? `-${suffix}` : ''}`

const EMPTY_PRODUCT = {
  id: '',
  name: '',
  department: 'personalizados',
  description: '',
  price: '',
  priceLabel: '',
  notes: '',
  customizable: false,
  quoteOnly: false,
  soldOut: false,
  featured: false,
  active: true,
  images: [],
  variants: [],
}

const getDepartmentName = (
  departmentId
) =>
  DEPARTMENTS.find(
    (department) =>
      department.id === departmentId
  )?.name || departmentId

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(
      /[\u0300-\u036f]/g,
      ''
    )
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      '-'
    )
    .replace(
      /^-+|-+$/g,
      ''
    )

const getProductPrice = (
  product
) => {
  if (product.priceLabel) {
    return product.priceLabel
  }

  if (
    product.price === null ||
    product.price === undefined
  ) {
    return 'Consultar'
  }

  return `$${product.price}`
}

function Admin() {
  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [
    showPassword,
    setShowPassword,
  ] = useState(false)

  const [admin, setAdmin] =
    useState(null)

  const [
    isLoading,
    setIsLoading,
  ] = useState(false)

  const [
    isCheckingSession,
    setIsCheckingSession,
  ] = useState(true)

  const [error, setError] =
    useState('')

  /* =====================================================
     DASHBOARD
  ===================================================== */

  const [
    products,
    setProducts,
  ] = useState([])

  const [
    isLoadingProducts,
    setIsLoadingProducts,
  ] = useState(false)

  const [
    productsError,
    setProductsError,
  ] = useState('')

  const [
    search,
    setSearch,
  ] = useState('')

  const [
    departmentFilter,
    setDepartmentFilter,
  ] = useState('all')

  const [
    statusFilter,
    setStatusFilter,
  ] = useState('all')

  const [
    actionProductId,
    setActionProductId,
  ] = useState(null)

  /* =====================================================
     EDITOR
  ===================================================== */

  const [
    isEditorOpen,
    setIsEditorOpen,
  ] = useState(false)

  const [
    editorMode,
    setEditorMode,
  ] = useState('edit')

  const [
    draft,
    setDraft,
  ] = useState(EMPTY_PRODUCT)

  const [
    isSaving,
    setIsSaving,
  ] = useState(false)

  const [
    editorError,
    setEditorError,
  ] = useState('')

  /* =====================================================
     IMÁGENES
  ===================================================== */

  const [
    isUploadingImages,
    setIsUploadingImages,
  ] = useState(false)

  const [
    imageUploadError,
    setImageUploadError,
  ] = useState('')

  const imageInputRef =
    useRef(null)

  /* =====================================================
     TOKEN
  ===================================================== */

  const getToken = () =>
    sessionStorage.getItem(
      TOKEN_KEY
    )

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout =
    useCallback(() => {
      sessionStorage.removeItem(
        TOKEN_KEY
      )

      setAdmin(null)
      setProducts([])
      setEmail('')
      setPassword('')
      setError('')
    }, [])

  /* =====================================================
     FETCH AUTENTICADO
  ===================================================== */

  const authenticatedFetch =
    useCallback(
      async (
        path,
        options = {}
      ) => {
        const token =
          getToken()

        const isFormData =
          typeof FormData !==
            'undefined' &&
          options.body instanceof
            FormData

        const response =
          await fetch(
            `${API_URL}${path}`,
            {
              ...options,

              headers: {
                ...(
                  options.body &&
                  !isFormData
                    ? {
                        'Content-Type':
                          'application/json',
                      }
                    : {}
                ),

                ...options.headers,

                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        if (
          response.status === 401
        ) {
          logout()

          throw new Error(
            'Tu sesión expiró. Inicia sesión nuevamente.'
          )
        }

        return response
      },
      [logout]
    )

  /* =====================================================
     COMPROBAR SESIÓN
  ===================================================== */

  useEffect(() => {
    const checkSession =
      async () => {
        const token =
          getToken()

        if (!token) {
          setIsCheckingSession(
            false
          )

          return
        }

        try {
          const response =
            await fetch(
              `${API_URL}/api/auth/me`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            )

          if (!response.ok) {
            sessionStorage.removeItem(
              TOKEN_KEY
            )

            setIsCheckingSession(
              false
            )

            return
          }

          const data =
            await response.json()

          setAdmin(
            data.admin
          )
        } catch (
          requestError
        ) {
          console.error(
            'Error comprobando sesión:',
            requestError
          )

          sessionStorage.removeItem(
            TOKEN_KEY
          )
        } finally {
          setIsCheckingSession(
            false
          )
        }
      }

    checkSession()
  }, [])

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleSubmit =
    async (event) => {
      event.preventDefault()

      setError('')
      setIsLoading(true)

      try {
        const response =
          await fetch(
            `${API_URL}/api/auth/login`,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body:
                JSON.stringify({
                  email,
                  password,
                }),
            }
          )

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              'No se pudo iniciar sesión.'
          )
        }

        sessionStorage.setItem(
          TOKEN_KEY,
          data.token
        )

        setAdmin(
          data.admin
        )

        setPassword('')
      } catch (
        requestError
      ) {
        setError(
          requestError.message ||
            'No se pudo iniciar sesión.'
        )
      } finally {
        setIsLoading(false)
      }
    }

  /* =====================================================
     OBTENER PRODUCTOS
  ===================================================== */

  const loadProducts =
    useCallback(
      async () => {
        setProductsError('')
        setIsLoadingProducts(
          true
        )

        try {
          const response =
            await authenticatedFetch(
              '/api/products/admin'
            )

          const data =
            await response.json()

          if (!response.ok) {
            throw new Error(
              data.error ||
                'No se pudo cargar el catálogo.'
            )
          }

          setProducts(
            data.products ||
              []
          )
        } catch (
          requestError
        ) {
          setProductsError(
            requestError.message
          )
        } finally {
          setIsLoadingProducts(
            false
          )
        }
      },
      [authenticatedFetch]
    )

  useEffect(() => {
    if (admin) {
      loadProducts()
    }
  }, [
    admin,
    loadProducts,
  ])

  /* =====================================================
     FILTROS
  ===================================================== */

  const filteredProducts =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase()

      return products.filter(
        (product) => {
          const matchesSearch =
            !normalizedSearch ||
            product.name
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            product.description
              ?.toLowerCase()
              .includes(
                normalizedSearch
              )

          const matchesDepartment =
            departmentFilter ===
              'all' ||
            product.department ===
              departmentFilter

          let matchesStatus =
            true

          if (
            statusFilter ===
            'available'
          ) {
            matchesStatus =
              product.active &&
              !product.soldOut
          }

          if (
            statusFilter ===
            'soldOut'
          ) {
            matchesStatus =
              product.soldOut
          }

          if (
            statusFilter ===
            'hidden'
          ) {
            matchesStatus =
              !product.active
          }

          if (
            statusFilter ===
            'featured'
          ) {
            matchesStatus =
              product.featured
          }

          return (
            matchesSearch &&
            matchesDepartment &&
            matchesStatus
          )
        }
      )
    }, [
      products,
      search,
      departmentFilter,
      statusFilter,
    ])

  /* =====================================================
     ESTADÍSTICAS
  ===================================================== */

  const stats =
    useMemo(
      () => ({
        total:
          products.length,

        active:
          products.filter(
            (product) =>
              product.active
          ).length,

        soldOut:
          products.filter(
            (product) =>
              product.soldOut
          ).length,

        featured:
          products.filter(
            (product) =>
              product.featured
          ).length,
      }),
      [products]
    )

  /* =====================================================
     ACTUALIZAR PRODUCTO RÁPIDO
  ===================================================== */

  const updateProduct =
    async (
      productId,
      updates
    ) => {
      setActionProductId(
        productId
      )

      try {
        const response =
          await authenticatedFetch(
            `/api/products/${productId}`,
            {
              method: 'PATCH',

              body:
                JSON.stringify(
                  updates
                ),
            }
          )

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              'No se pudo actualizar el producto.'
          )
        }

        setProducts(
          (
            currentProducts
          ) =>
            currentProducts.map(
              (product) =>
                product.id ===
                productId
                  ? data.product
                  : product
            )
        )
      } catch (
        requestError
      ) {
        window.alert(
          requestError.message
        )
      } finally {
        setActionProductId(
          null
        )
      }
    }

  /* =====================================================
     ELIMINAR PRODUCTO
  ===================================================== */

  const handleDelete =
    async (product) => {
      const confirmed =
        window.confirm(
          `¿Seguro que quieres eliminar "${product.name}"?\n\nEsta acción sí lo borra de MongoDB.`
        )

      if (!confirmed) {
        return
      }

      setActionProductId(
        product.id
      )

      try {
        const response =
          await authenticatedFetch(
            `/api/products/${product.id}`,
            {
              method:
                'DELETE',
            }
          )

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              'No se pudo eliminar el producto.'
          )
        }

        setProducts(
          (
            currentProducts
          ) =>
            currentProducts.filter(
              (
                currentProduct
              ) =>
                currentProduct.id !==
                product.id
            )
        )
      } catch (
        requestError
      ) {
        window.alert(
          requestError.message
        )
      } finally {
        setActionProductId(
          null
        )
      }
    }

  /* =====================================================
     ABRIR EDITOR
  ===================================================== */

  const openEditor = (
    product
  ) => {
    setEditorMode('edit')

    setDraft({
      ...EMPTY_PRODUCT,
      ...product,

      price:
        product.price ??
        '',

      images:
        Array.isArray(
          product.images
        )
          ? [...product.images]
          : [],

      variants:
        Array.isArray(
          product.variants
        )
          ? product.variants.map(
              (variant) => ({
                ...variant,

                price:
                  variant.price ??
                  '',
              })
            )
          : [],
    })

    setEditorError('')
    setImageUploadError('')
    setIsEditorOpen(true)
  }

  /* =====================================================
     NUEVO PRODUCTO
  ===================================================== */

  const openNewProduct =
    () => {
      setEditorMode(
        'create'
      )

      setDraft({
        ...EMPTY_PRODUCT,

        images: [],
        variants: [],
      })

      setEditorError('')
      setImageUploadError('')
      setIsEditorOpen(true)
    }

  /* =====================================================
     CERRAR EDITOR
  ===================================================== */

  const closeEditor = () => {
    if (
      isSaving ||
      isUploadingImages
    ) {
      return
    }

    setIsEditorOpen(false)
    setEditorError('')
    setImageUploadError('')
  }

  /* =====================================================
     ACTUALIZAR DRAFT
  ===================================================== */

  const updateDraft = (
    field,
    value
  ) => {
    setDraft(
      (
        currentDraft
      ) => ({
        ...currentDraft,

        [field]:
          value,
      })
    )
  }

  /* =====================================================
     SUBIR IMÁGENES
  ===================================================== */

  const handleImageSelection =
    async (event) => {
      const files =
        Array.from(
          event.target.files ||
            []
        )

      if (
        files.length === 0
      ) {
        return
      }

      setImageUploadError('')

      if (
        files.length >
        MAX_UPLOAD_FILES
      ) {
        setImageUploadError(
          `Puedes subir máximo ${MAX_UPLOAD_FILES} imágenes a la vez.`
        )

        event.target.value =
          ''

        return
      }

      const invalidType =
        files.find(
          (file) =>
            !ALLOWED_IMAGE_TYPES.includes(
              file.type
            )
        )

      if (invalidType) {
        setImageUploadError(
          'Solo puedes subir imágenes JPG, PNG o WebP.'
        )

        event.target.value =
          ''

        return
      }

      const oversizedFile =
        files.find(
          (file) =>
            file.size >
            MAX_FILE_SIZE
        )

      if (
        oversizedFile
      ) {
        setImageUploadError(
          `La imagen "${oversizedFile.name}" pesa más de 8 MB.`
        )

        event.target.value =
          ''

        return
      }

      const formData =
        new FormData()

      files.forEach(
        (file) => {
          formData.append(
            'images',
            file
          )
        }
      )

      setIsUploadingImages(
        true
      )

      try {
        const response =
          await authenticatedFetch(
            '/api/uploads/images',
            {
              method: 'POST',
              body: formData,
            }
          )

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              'No se pudieron subir las imágenes.'
          )
        }

        const uploadedUrls =
          (
            data.images ||
            []
          )
            .map(
              (image) =>
                image.url
            )
            .filter(Boolean)

        if (
          uploadedUrls.length ===
          0
        ) {
          throw new Error(
            'Cloudinary no devolvió ninguna imagen.'
          )
        }

        setDraft(
          (
            currentDraft
          ) => ({
            ...currentDraft,

            images: [
              ...(
                currentDraft.images ||
                []
              ),

              ...uploadedUrls,
            ],
          })
        )
      } catch (
        requestError
      ) {
        setImageUploadError(
          requestError.message ||
            'No se pudieron subir las imágenes.'
        )
      } finally {
        setIsUploadingImages(
          false
        )

        if (
          imageInputRef.current
        ) {
          imageInputRef.current.value =
            ''
        }
      }
    }

  /* =====================================================
     QUITAR IMAGEN
  ===================================================== */

  const removeDraftImage = (
    imageIndex
  ) => {
    setDraft(
      (
        currentDraft
      ) => ({
        ...currentDraft,

        images:
          (
            currentDraft.images ||
            []
          ).filter(
            (
              image,
              index
            ) =>
              index !==
              imageIndex
          ),
      })
    )

    setImageUploadError('')
  }

  /* =====================================================
     HACER PORTADA
  ===================================================== */

  const makeImageCover = (
    imageIndex
  ) => {
    setDraft(
      (
        currentDraft
      ) => {
        const images = [
          ...(
            currentDraft.images ||
            []
          ),
        ]

        if (
          imageIndex <= 0 ||
          imageIndex >=
            images.length
        ) {
          return currentDraft
        }

        const [
          selectedImage,
        ] = images.splice(
          imageIndex,
          1
        )

        images.unshift(
          selectedImage
        )

        return {
          ...currentDraft,
          images,
        }
      }
    )
  }

  /* =====================================================
     MOVER IMAGEN IZQUIERDA
  ===================================================== */

  const moveImageLeft = (
    imageIndex
  ) => {
    if (
      imageIndex <= 0
    ) {
      return
    }

    setDraft(
      (
        currentDraft
      ) => {
        const images = [
          ...(
            currentDraft.images ||
            []
          ),
        ]

        const previous =
          images[
            imageIndex - 1
          ]

        images[
          imageIndex - 1
        ] =
          images[
            imageIndex
          ]

        images[
          imageIndex
        ] = previous

        return {
          ...currentDraft,
          images,
        }
      }
    )
  }

  /* =====================================================
     MOVER IMAGEN DERECHA
  ===================================================== */

  const moveImageRight = (
    imageIndex
  ) => {
    setDraft(
      (
        currentDraft
      ) => {
        const images = [
          ...(
            currentDraft.images ||
            []
          ),
        ]

        if (
          imageIndex >=
          images.length - 1
        ) {
          return currentDraft
        }

        const next =
          images[
            imageIndex + 1
          ]

        images[
          imageIndex + 1
        ] =
          images[
            imageIndex
          ]

        images[
          imageIndex
        ] = next

        return {
          ...currentDraft,
          images,
        }
      }
    )
  }

  /* =====================================================
     VARIANTES
  ===================================================== */

  const getVariantBasePrice = (
    currentDraft
  ) => {
    if (
      currentDraft.price === '' ||
      currentDraft.price === null ||
      currentDraft.price === undefined
    ) {
      return ''
    }

    const parsedPrice = Number(
      currentDraft.price
    )

    return Number.isFinite(
      parsedPrice
    ) && parsedPrice >= 0
      ? currentDraft.price
      : ''
  }

  const addVariant = () => {
    setDraft(
      (
        currentDraft
      ) => ({
        ...currentDraft,

        variants: [
          ...(
            currentDraft.variants ||
            []
          ),

          {
            id:
              createVariantId(),

            name: '',

            price:
              getVariantBasePrice(
                currentDraft
              ),
          },
        ],
      })
    )

    setEditorError('')
  }

  const updateVariant = (
    variantIndex,
    field,
    value
  ) => {
    setDraft(
      (
        currentDraft
      ) => ({
        ...currentDraft,

        variants:
          (
            currentDraft.variants ||
            []
          ).map(
            (
              variant,
              index
            ) =>
              index ===
              variantIndex
                ? {
                    ...variant,

                    [field]:
                      value,
                  }
                : variant
          ),
      })
    )
  }

  const removeVariant = (
    variantIndex
  ) => {
    setDraft(
      (
        currentDraft
      ) => ({
        ...currentDraft,

        variants:
          (
            currentDraft.variants ||
            []
          ).filter(
            (
              variant,
              index
            ) =>
              index !==
              variantIndex
          ),
      })
    )

    setEditorError('')
  }

  const duplicateVariant = (
    variantIndex
  ) => {
    setDraft(
      (
        currentDraft
      ) => {
        const variants = [
          ...(
            currentDraft.variants ||
            []
          ),
        ]

        const sourceVariant =
          variants[
            variantIndex
          ]

        if (!sourceVariant) {
          return currentDraft
        }

        const duplicatedVariant = {
          ...sourceVariant,

          id:
            createVariantId(
              'copy'
            ),

          name:
            sourceVariant.name
              ? `${sourceVariant.name} copia`
              : '',
        }

        variants.splice(
          variantIndex + 1,
          0,
          duplicatedVariant
        )

        return {
          ...currentDraft,
          variants,
        }
      }
    )

    setEditorError('')
  }

  const applyVariantTemplate = (
    template
  ) => {
    const hasExistingVariants =
      (
        draft.variants ||
        []
      ).length > 0

    if (
      hasExistingVariants &&
      !window.confirm(
        'Esta plantilla reemplazará las variantes actuales. ¿Quieres continuar?'
      )
    ) {
      return
    }

    setDraft(
      (
        currentDraft
      ) => {
        const basePrice =
          getVariantBasePrice(
            currentDraft
          )

        return {
          ...currentDraft,

          variants:
            template.values.map(
              (
                name,
                index
              ) => ({
                id:
                  createVariantId(
                    `${template.id}-${index}`
                  ),

                name,

                price:
                  basePrice,
              })
            ),
        }
      }
    )

    setEditorError('')
  }

  const applyBasePriceToVariants = () => {
    if (
      !draft.variants?.length
    ) {
      setEditorError(
        'Agrega al menos una variante antes de copiar el precio base.'
      )

      return
    }

    const parsedBasePrice =
      Number(
        draft.price
      )

    if (
      draft.price === '' ||
      !Number.isFinite(
        parsedBasePrice
      ) ||
      parsedBasePrice < 0
    ) {
      setEditorError(
        'Primero agrega un precio base válido al producto.'
      )

      return
    }

    setDraft(
      (
        currentDraft
      ) => ({
        ...currentDraft,

        variants:
          (
            currentDraft.variants ||
            []
          ).map(
            (variant) => ({
              ...variant,

              price:
                currentDraft.price,
            })
          ),
      })
    )

    setEditorError('')
  }

  const clearVariants = () => {
    if (
      !draft.variants?.length
    ) {
      return
    }

    const confirmed =
      window.confirm(
        '¿Quieres eliminar todas las variantes de este producto?'
      )

    if (!confirmed) {
      return
    }

    setDraft(
      (
        currentDraft
      ) => ({
        ...currentDraft,
        variants: [],
      })
    )

    setEditorError('')
  }

  /* =====================================================
     GUARDAR PRODUCTO
  ===================================================== */

  const handleSaveProduct =
    async (event) => {
      event.preventDefault()

      if (
        isUploadingImages
      ) {
        setEditorError(
          'Espera a que terminen de subir las imágenes.'
        )

        return
      }

      setEditorError('')
      setIsSaving(true)

      try {
        const name =
          draft.name.trim()

        const description =
          draft.description.trim()

        if (
          !name ||
          !description
        ) {
          throw new Error(
            'Nombre y descripción son obligatorios.'
          )
        }

        const productId =
          editorMode ===
          'create'
            ? slugify(name)
            : draft.id

        if (!productId) {
          throw new Error(
            'No se pudo generar el ID del producto.'
          )
        }

        const parsedPrice =
          draft.price === ''
            ? null
            : Number(
                draft.price
              )

        if (
          parsedPrice !==
            null &&
          (
            Number.isNaN(
              parsedPrice
            ) ||
            parsedPrice < 0
          )
        ) {
          throw new Error(
            'El precio no es válido.'
          )
        }

        /* ===============================================
           NORMALIZAR VARIANTES
        =============================================== */

        const normalizedVariants =
          (
            draft.variants ||
            []
          )
            .filter(
              (variant) => {
                const hasName =
                  variant.name
                    ?.toString()
                    .trim()

                const hasPrice =
                  variant.price !==
                    '' &&
                  variant.price !==
                    null &&
                  variant.price !==
                    undefined

                return (
                  hasName ||
                  hasPrice
                )
              }
            )
            .map(
              (
                variant,
                index
              ) => {
                const variantName =
                  variant.name
                    ?.toString()
                    .trim()

                if (
                  !variantName
                ) {
                  throw new Error(
                    `La variante ${index + 1} necesita un nombre.`
                  )
                }

                if (
                  variant.price ===
                    '' ||
                  variant.price ===
                    null ||
                  variant.price ===
                    undefined
                ) {
                  throw new Error(
                    `Agrega el precio de "${variantName}".`
                  )
                }

                const variantPrice =
                  Number(
                    variant.price
                  )

                if (
                  Number.isNaN(
                    variantPrice
                  ) ||
                  variantPrice <
                    0
                ) {
                  throw new Error(
                    `El precio de "${variantName}" no es válido.`
                  )
                }

                return {
                  id:
                    variant.id ||
                    `variant-${Date.now()}-${index}`,

                  name:
                    variantName,

                  price:
                    variantPrice,
                }
              }
            )

        const payload = {
          name,

          department:
            draft.department,

          description,

          price:
            parsedPrice,

          priceLabel:
            draft.priceLabel
              ?.trim() ||
            null,

          notes:
            draft.notes
              ?.trim() ||
            null,

          customizable:
            Boolean(
              draft.customizable
            ),

          quoteOnly:
            Boolean(
              draft.quoteOnly
            ),

          soldOut:
            Boolean(
              draft.soldOut
            ),

          featured:
            Boolean(
              draft.featured
            ),

          active:
            Boolean(
              draft.active
            ),

          images:
            Array.isArray(
              draft.images
            )
              ? draft.images
              : [],

          variants:
            normalizedVariants,
        }

        let response

        if (
          editorMode ===
          'create'
        ) {
          response =
            await authenticatedFetch(
              '/api/products',
              {
                method:
                  'POST',

                body:
                  JSON.stringify({
                    id:
                      productId,

                    ...payload,
                  }),
              }
            )
        } else {
          response =
            await authenticatedFetch(
              `/api/products/${draft.id}`,
              {
                method:
                  'PATCH',

                body:
                  JSON.stringify(
                    payload
                  ),
              }
            )
        }

        const data =
          await response.json()

        if (!response.ok) {
          throw new Error(
            data.error ||
              'No se pudo guardar el producto.'
          )
        }

        if (
          editorMode ===
          'create'
        ) {
          setProducts(
            (
              currentProducts
            ) => [
              ...currentProducts,
              data.product,
            ]
          )
        } else {
          setProducts(
            (
              currentProducts
            ) =>
              currentProducts.map(
                (product) =>
                  product.id ===
                  draft.id
                    ? data.product
                    : product
              )
          )
        }

        setIsEditorOpen(
          false
        )

        setImageUploadError(
          ''
        )
      } catch (
        requestError
      ) {
        setEditorError(
          requestError.message
        )
      } finally {
        setIsSaving(false)
      }
    }

  /* =====================================================
     LOADER
  ===================================================== */

  if (
    isCheckingSession
  ) {
    return (
      <main className="admin-shell admin-shell--loading">
        <div className="admin-loader">
          <div className="admin-loader__spark">
            ✦
          </div>

          <p>
            Preparando SD
            Creations
          </p>
        </div>
      </main>
    )
  }

  /* =====================================================
     DASHBOARD
  ===================================================== */

  if (admin) {
    return (
      <main className="admin-dashboard">
        <div className="admin-dashboard__glow admin-dashboard__glow--one" />

        <div className="admin-dashboard__glow admin-dashboard__glow--two" />

        <header className="admin-dashboard__header">
          <div className="admin-dashboard__brand">
            <div className="admin-dashboard__logo">
              SD
            </div>

            <div>
              <p>
                SD CREATIONS
              </p>

              <span>
                Panel
                administrativo
              </span>
            </div>
          </div>

          <div className="admin-dashboard__user">
            <div className="admin-dashboard__avatar">
              {admin.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div className="admin-dashboard__user-info">
              <strong>
                {admin.name}
              </strong>

              <span>
                Administradora
              </span>
            </div>

            <button
              type="button"
              className="admin-dashboard__logout"
              onClick={logout}
            >
              Salir
            </button>
          </div>
        </header>

        <div className="admin-dashboard__content">
          <section className="admin-dashboard__hero">
            <div>
              <span className="admin-dashboard__eyebrow">
                ✦ TU CATÁLOGO
              </span>

              <h1>
                Hola,{' '}

                <span>
                  {admin.name
                    ?.split(
                      ' '
                    )[0]}
                </span>
                .
              </h1>

              <p>
                Administra los
                productos de SD
                Creations desde un
                solo lugar.
              </p>
            </div>

            <button
              type="button"
              className="admin-dashboard__new"
              onClick={
                openNewProduct
              }
            >
              <span>
                ＋
              </span>

              Nuevo producto
            </button>
          </section>

          {/* =================================================
              ESTADÍSTICAS
          ================================================= */}

          <section className="admin-stats">
            <article className="admin-stat-card">
              <span className="admin-stat-card__icon">
                📦
              </span>

              <div>
                <strong>
                  {stats.total}
                </strong>

                <p>
                  Productos
                </p>
              </div>
            </article>

            <article className="admin-stat-card">
              <span className="admin-stat-card__icon">
                💗
              </span>

              <div>
                <strong>
                  {stats.active}
                </strong>

                <p>
                  Visibles
                </p>
              </div>
            </article>

            <article className="admin-stat-card">
              <span className="admin-stat-card__icon">
                💤
              </span>

              <div>
                <strong>
                  {stats.soldOut}
                </strong>

                <p>
                  Agotados
                </p>
              </div>
            </article>

            <article className="admin-stat-card">
              <span className="admin-stat-card__icon">
                ✨
              </span>

              <div>
                <strong>
                  {stats.featured}
                </strong>

                <p>
                  Destacados
                </p>
              </div>
            </article>
          </section>

          {/* =================================================
              FILTROS
          ================================================= */}

          <section className="admin-toolbar">
            <div className="admin-toolbar__search">
              <span>
                ⌕
              </span>

              <input
                type="search"
                placeholder="Buscar producto..."
                value={search}
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
              />
            </div>

            <select
              value={
                departmentFilter
              }
              onChange={(
                event
              ) =>
                setDepartmentFilter(
                  event.target
                    .value
                )
              }
            >
              <option value="all">
                Todos los
                departamentos
              </option>

              {DEPARTMENTS.map(
                (
                  department
                ) => (
                  <option
                    key={
                      department.id
                    }
                    value={
                      department.id
                    }
                  >
                    {
                      department.name
                    }
                  </option>
                )
              )}
            </select>

            <select
              value={
                statusFilter
              }
              onChange={(
                event
              ) =>
                setStatusFilter(
                  event.target
                    .value
                )
              }
            >
              <option value="all">
                Todos los estados
              </option>

              <option value="available">
                Disponibles
              </option>

              <option value="soldOut">
                Agotados
              </option>

              <option value="hidden">
                Ocultos
              </option>

              <option value="featured">
                Destacados
              </option>
            </select>
          </section>

          {productsError && (
            <div className="admin-dashboard__message admin-dashboard__message--error">
              {
                productsError
              }
            </div>
          )}

          {isLoadingProducts ? (
            <div className="admin-products-loading">
              <span>
                ✦
              </span>

              Cargando
              catálogo...
            </div>
          ) : (
            <>
              <div className="admin-products-heading">
                <div>
                  <h2>
                    Productos
                  </h2>

                  <p>
                    {
                      filteredProducts.length
                    }{' '}
                    resultado
                    {
                      filteredProducts.length !==
                      1
                        ? 's'
                        : ''
                    }
                  </p>
                </div>
              </div>

              <section className="admin-products-grid">
                {filteredProducts.map(
                  (
                    product
                  ) => {
                    const isBusy =
                      actionProductId ===
                      product.id

                    return (
                      <article
                        className={`admin-product-card ${
                          !product.active
                            ? 'admin-product-card--hidden'
                            : ''
                        }`}
                        key={
                          product._id ||
                          product.id
                        }
                      >
                        <div className="admin-product-card__image">
                          {product
                            .images?.[0] ? (
                            <img
                              src={
                                product
                                  .images[0]
                              }
                              alt={
                                product.name
                              }
                            />
                          ) : (
                            <div className="admin-product-card__placeholder">
                              <span>
                                📷
                              </span>

                              Sin imagen
                            </div>
                          )}

                          <div className="admin-product-card__badges">
                            {product.soldOut && (
                              <span className="admin-badge admin-badge--soldout">
                                Agotado
                              </span>
                            )}

                            {!product.active && (
                              <span className="admin-badge admin-badge--hidden">
                                Oculto
                              </span>
                            )}

                            {product.featured && (
                              <span className="admin-badge admin-badge--featured">
                                ✦
                                Destacado
                              </span>
                            )}

                            {product
                              .variants
                              ?.length >
                              0 && (
                              <span className="admin-badge admin-badge--variants">
                                🌈{' '}
                                {
                                  product
                                    .variants
                                    .length
                                }{' '}
                                opciones
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="admin-product-card__body">
                          <span className="admin-product-card__department">
                            {getDepartmentName(
                              product.department
                            )}
                          </span>

                          <h3>
                            {
                              product.name
                            }
                          </h3>

                          <p className="admin-product-card__description">
                            {
                              product.description
                            }
                          </p>

                          <div className="admin-product-card__price">
                            {getProductPrice(
                              product
                            )}
                          </div>

                          <div className="admin-product-card__toggles">
                            <button
                              type="button"
                              disabled={
                                isBusy
                              }
                              className={
                                product.soldOut
                                  ? 'is-active'
                                  : ''
                              }
                              onClick={() =>
                                updateProduct(
                                  product.id,
                                  {
                                    soldOut:
                                      !product.soldOut,
                                  }
                                )
                              }
                            >
                              <span>
                                {product.soldOut
                                  ? '●'
                                  : '○'}
                              </span>

                              Agotado
                            </button>

                            <button
                              type="button"
                              disabled={
                                isBusy
                              }
                              className={
                                product.featured
                                  ? 'is-active'
                                  : ''
                              }
                              onClick={() =>
                                updateProduct(
                                  product.id,
                                  {
                                    featured:
                                      !product.featured,
                                  }
                                )
                              }
                            >
                              <span>
                                ✦
                              </span>

                              Destacar
                            </button>
                          </div>

                          <div className="admin-product-card__actions">
                            <button
                              type="button"
                              className="admin-product-card__edit"
                              onClick={() =>
                                openEditor(
                                  product
                                )
                              }
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              disabled={
                                isBusy
                              }
                              className="admin-product-card__visibility"
                              onClick={() =>
                                updateProduct(
                                  product.id,
                                  {
                                    active:
                                      !product.active,
                                  }
                                )
                              }
                            >
                              {product.active
                                ? 'Ocultar'
                                : 'Mostrar'}
                            </button>

                            <button
                              type="button"
                              disabled={
                                isBusy
                              }
                              className="admin-product-card__delete"
                              onClick={() =>
                                handleDelete(
                                  product
                                )
                              }
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </article>
                    )
                  }
                )}
              </section>

              {filteredProducts.length ===
                0 && (
                <div className="admin-products-empty">
                  <span>
                    ♡
                  </span>

                  <h3>
                    No encontramos
                    productos
                  </h3>

                  <p>
                    Prueba cambiando
                    los filtros o la
                    búsqueda.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* =================================================
            EDITOR
        ================================================= */}

        {isEditorOpen && (
          <div
            className="admin-editor-overlay"
            onMouseDown={(
              event
            ) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeEditor()
              }
            }}
          >
            <section className="admin-editor">
              <div className="admin-editor__header">
                <div>
                  <span>
                    ✦ SD CREATIONS
                  </span>

                  <h2>
                    {editorMode ===
                    'create'
                      ? 'Nuevo producto'
                      : 'Editar producto'}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={
                    closeEditor
                  }
                  disabled={
                    isUploadingImages ||
                    isSaving
                  }
                >
                  ×
                </button>
              </div>

              <form
                className="admin-editor__form"
                onSubmit={
                  handleSaveProduct
                }
              >
                <div className="admin-editor__grid">
                  <label className="admin-editor__field admin-editor__field--wide">
                    <span>
                      Nombre del
                      producto
                    </span>

                    <input
                      type="text"
                      value={
                        draft.name
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'name',
                          event.target
                            .value
                        )
                      }
                      required
                    />
                  </label>

                  <label className="admin-editor__field">
                    <span>
                      Departamento
                    </span>

                    <select
                      value={
                        draft.department
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'department',
                          event.target
                            .value
                        )
                      }
                    >
                      {DEPARTMENTS.map(
                        (
                          department
                        ) => (
                          <option
                            key={
                              department.id
                            }
                            value={
                              department.id
                            }
                          >
                            {
                              department.name
                            }
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  <label className="admin-editor__field">
                    <span>
                      Precio base
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Ej. 90"
                      value={
                        draft.price
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'price',
                          event.target
                            .value
                        )
                      }
                    />
                  </label>

                  <label className="admin-editor__field admin-editor__field--wide">
                    <span>
                      Texto del
                      precio
                    </span>

                    <input
                      type="text"
                      placeholder="Ej. Desde $90 o Cotizar"
                      value={
                        draft.priceLabel ||
                        ''
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'priceLabel',
                          event.target
                            .value
                        )
                      }
                    />
                  </label>

                  <label className="admin-editor__field admin-editor__field--wide">
                    <span>
                      Descripción
                    </span>

                    <textarea
                      rows="4"
                      value={
                        draft.description
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'description',
                          event.target
                            .value
                        )
                      }
                      required
                    />
                  </label>

                  <label className="admin-editor__field admin-editor__field--wide">
                    <span>
                      Notas
                    </span>

                    <textarea
                      rows="3"
                      placeholder="Información adicional..."
                      value={
                        draft.notes ||
                        ''
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'notes',
                          event.target
                            .value
                        )
                      }
                    />
                  </label>
                </div>

                {/* =================================================
                    FOTOS
                ================================================= */}

                <section className="admin-image-manager">
                  <div className="admin-image-manager__top">
                    <div>
                      <span className="admin-image-manager__eyebrow">
                        📸 GALERÍA
                      </span>

                      <h3>
                        Fotos del
                        producto
                      </h3>

                      <p>
                        La primera
                        imagen será la
                        portada.
                      </p>
                    </div>

                    <div className="admin-image-manager__count">
                      {
                        draft.images
                          ?.length ||
                        0
                      }

                      <span>
                        fotos
                      </span>
                    </div>
                  </div>

                  <input
                    ref={
                      imageInputRef
                    }
                    className="admin-image-manager__input"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={
                      handleImageSelection
                    }
                    disabled={
                      isUploadingImages
                    }
                  />

                  <button
                    type="button"
                    className={`admin-image-manager__upload ${
                      isUploadingImages
                        ? 'is-uploading'
                        : ''
                    }`}
                    onClick={() =>
                      imageInputRef.current?.click()
                    }
                    disabled={
                      isUploadingImages
                    }
                  >
                    <span className="admin-image-manager__upload-icon">
                      {isUploadingImages
                        ? '✦'
                        : '＋'}
                    </span>

                    <span>
                      <strong>
                        {isUploadingImages
                          ? 'Subiendo fotos...'
                          : 'Agregar fotos'}
                      </strong>

                      <small>
                        JPG, PNG o
                        WebP · máximo
                        8 MB
                      </small>
                    </span>
                  </button>

                  {isUploadingImages && (
                    <div className="admin-image-manager__progress">
                      <div className="admin-image-manager__progress-bar" />

                      <span>
                        Guardando tus
                        fotos en la
                        nube ✨
                      </span>
                    </div>
                  )}

                  {imageUploadError && (
                    <div className="admin-image-manager__error">
                      <span>
                        !
                      </span>

                      {
                        imageUploadError
                      }
                    </div>
                  )}

                  {draft.images &&
                  draft.images.length >
                    0 ? (
                    <div className="admin-image-manager__grid">
                      {draft.images.map(
                        (
                          image,
                          imageIndex
                        ) => (
                          <article
                            className={`admin-image-item ${
                              imageIndex ===
                              0
                                ? 'admin-image-item--cover'
                                : ''
                            }`}
                            key={`${image}-${imageIndex}`}
                          >
                            <div className="admin-image-item__photo">
                              <img
                                src={
                                  image
                                }
                                alt={`Foto ${imageIndex + 1} de ${draft.name || 'producto'}`}
                              />

                              {imageIndex ===
                                0 && (
                                <span className="admin-image-item__cover-badge">
                                  ⭐
                                  Portada
                                </span>
                              )}

                              <button
                                type="button"
                                className="admin-image-item__remove"
                                onClick={() =>
                                  removeDraftImage(
                                    imageIndex
                                  )
                                }
                              >
                                ×
                              </button>
                            </div>

                            <div className="admin-image-item__actions">
                              {imageIndex !==
                                0 && (
                                <button
                                  type="button"
                                  className="admin-image-item__cover-button"
                                  onClick={() =>
                                    makeImageCover(
                                      imageIndex
                                    )
                                  }
                                >
                                  ⭐
                                  Portada
                                </button>
                              )}

                              <div className="admin-image-item__move">
                                <button
                                  type="button"
                                  disabled={
                                    imageIndex ===
                                    0
                                  }
                                  onClick={() =>
                                    moveImageLeft(
                                      imageIndex
                                    )
                                  }
                                >
                                  ←
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    imageIndex ===
                                    draft.images
                                      .length -
                                      1
                                  }
                                  onClick={() =>
                                    moveImageRight(
                                      imageIndex
                                    )
                                  }
                                >
                                  →
                                </button>
                              </div>
                            </div>
                          </article>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="admin-image-manager__empty">
                      <span>
                        🌸
                      </span>

                      <strong>
                        Aún no hay
                        fotos
                      </strong>

                      <p>
                        Agrega una o
                        varias imágenes.
                      </p>
                    </div>
                  )}
                </section>

                {/* =================================================
                    VARIANTES
                ================================================= */}

                <section className="admin-variants">
                  <div className="admin-variants__header">
                    <div>
                      <span className="admin-variants__eyebrow">
                        ✨ OPCIONES
                      </span>

                      <h3>
                        Variantes del
                        producto
                      </h3>

                      <p>
                        Agrega tallas,
                        medidas,
                        presentaciones
                        u opciones con
                        precios
                        diferentes.
                      </p>
                    </div>

                    <div className="admin-variants__count">
                      {
                        draft.variants
                          ?.length ||
                        0
                      }

                      <span>
                        variantes
                      </span>
                    </div>
                  </div>

                  <div className="admin-variants__quick">
                    <div className="admin-variants__quick-copy">
                      <span>
                        Plantillas rápidas
                      </span>

                      <small>
                        Crea varias opciones en un toque.
                      </small>
                    </div>

                    <div className="admin-variants__templates">
                      {VARIANT_TEMPLATES.map(
                        (template) => (
                          <button
                            key={
                              template.id
                            }
                            type="button"
                            className="admin-variants__template"
                            onClick={() =>
                              applyVariantTemplate(
                                template
                              )
                            }
                            title={
                              template.preview
                            }
                          >
                            <span>
                              {
                                template.emoji
                              }
                            </span>

                            <div>
                              <strong>
                                {
                                  template.label
                                }
                              </strong>

                              <small>
                                {
                                  template.preview
                                }
                              </small>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {draft.variants
                    ?.length >
                  0 && (
                    <div className="admin-variants__bulk-actions">
                      <button
                        type="button"
                        className="admin-variants__base-price"
                        onClick={
                          applyBasePriceToVariants
                        }
                      >
                        <span>
                          💸
                        </span>

                        Usar precio base en todas
                      </button>

                      <button
                        type="button"
                        className="admin-variants__clear"
                        onClick={
                          clearVariants
                        }
                      >
                        Limpiar todas
                      </button>
                    </div>
                  )}

                  {draft.variants
                    ?.length >
                  0 ? (
                    <div className="admin-variants__list">
                      {draft.variants.map(
                        (
                          variant,
                          variantIndex
                        ) => (
                          <div
                            className="admin-variant"
                            key={
                              variant.id ||
                              variantIndex
                            }
                          >
                            <div className="admin-variant__number">
                              {
                                variantIndex +
                                1
                              }
                            </div>

                            <label className="admin-variant__field">
                              <span>
                                Nombre
                              </span>

                              <input
                                type="text"
                                placeholder="Ej. XL, 15 oz, Grande..."
                                value={
                                  variant.name ||
                                  ''
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateVariant(
                                    variantIndex,
                                    'name',
                                    event.target
                                      .value
                                  )
                                }
                              />
                            </label>

                            <label className="admin-variant__field admin-variant__field--price">
                              <span>
                                Precio
                              </span>

                              <div className="admin-variant__price-input">
                                <b>
                                  $
                                </b>

                                <input
                                  type="number"
                                  min="0"
                                  step="1"
                                  placeholder="0"
                                  value={
                                    variant.price ??
                                    ''
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    updateVariant(
                                      variantIndex,
                                      'price',
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                />
                              </div>
                            </label>

                            <div className="admin-variant__actions">
                              <button
                                type="button"
                                className="admin-variant__duplicate"
                                onClick={() =>
                                  duplicateVariant(
                                    variantIndex
                                  )
                                }
                                title="Duplicar variante"
                                aria-label={`Duplicar ${
                                  variant.name ||
                                  'variante'
                                }`}
                              >
                                ⧉
                              </button>

                              <button
                                type="button"
                                className="admin-variant__delete"
                                onClick={() =>
                                  removeVariant(
                                    variantIndex
                                  )
                                }
                                title="Eliminar variante"
                                aria-label={`Eliminar ${
                                  variant.name ||
                                  'variante'
                                }`}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="admin-variants__empty">
                      <span>
                        🌈
                      </span>

                      <div>
                        <strong>
                          Sin variantes
                        </strong>

                        <p>
                          Usa una plantilla
                          rápida o agrega una
                          opción manualmente.
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className="admin-variants__add"
                    onClick={
                      addVariant
                    }
                  >
                    <span>
                      ＋
                    </span>

                    <div>
                      <strong>
                        Agregar
                        variante
                      </strong>

                      <small>
                        Talla, medida,
                        presentación,
                        etc.
                      </small>
                    </div>
                  </button>
                </section>

                {/* =================================================
                    OPCIONES
                ================================================= */}

                <div className="admin-editor__options">
                  <label>
                    <input
                      type="checkbox"
                      checked={
                        draft.customizable
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'customizable',
                          event.target
                            .checked
                        )
                      }
                    />

                    Personalizable
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={
                        draft.quoteOnly
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'quoteOnly',
                          event.target
                            .checked
                        )
                      }
                    />

                    Solo cotización
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={
                        draft.soldOut
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'soldOut',
                          event.target
                            .checked
                        )
                      }
                    />

                    Agotado
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={
                        draft.featured
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'featured',
                          event.target
                            .checked
                        )
                      }
                    />

                    Destacado
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={
                        draft.active
                      }
                      onChange={(
                        event
                      ) =>
                        updateDraft(
                          'active',
                          event.target
                            .checked
                        )
                      }
                    />

                    Visible en
                    tienda
                  </label>
                </div>

                {editorError && (
                  <div className="admin-editor__error">
                    {
                      editorError
                    }
                  </div>
                )}

                <div className="admin-editor__footer">
                  <button
                    type="button"
                    className="admin-editor__cancel"
                    onClick={
                      closeEditor
                    }
                    disabled={
                      isSaving ||
                      isUploadingImages
                    }
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="admin-editor__save"
                    disabled={
                      isSaving ||
                      isUploadingImages
                    }
                  >
                    {isUploadingImages
                      ? 'Subiendo fotos...'
                      : isSaving
                      ? 'Guardando...'
                      : editorMode ===
                        'create'
                      ? 'Crear producto'
                      : 'Guardar cambios'}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>
    )
  }

  /* =====================================================
     LOGIN
  ===================================================== */

  return (
    <main className="admin-shell">
      <div className="admin-decoration admin-decoration--one" />

      <div className="admin-decoration admin-decoration--two" />

      <div className="admin-decoration admin-decoration--three" />

      <section className="admin-layout">
        <div className="admin-brand">
          <div className="admin-brand__top">
            <div className="admin-brand__logo">
              <span>
                S
              </span>

              <span>
                D
              </span>
            </div>

            <span className="admin-brand__name">
              SD CREATIONS
            </span>
          </div>

          <div className="admin-brand__content">
            <span className="admin-brand__mini">
              ✦ ESPACIO
              ADMINISTRATIVO
            </span>

            <h1>
              Tu imaginación,

              <span>
                nuestro diseño.
              </span>
            </h1>

            <p>
              Administra tu
              catálogo de una
              forma sencilla,
              bonita y
              completamente
              personalizada
              para SD Creations.
            </p>

            <div className="admin-brand__features">
              <div>
                <span className="admin-brand__feature-icon">
                  ✦
                </span>

                <div>
                  <strong>
                    Productos
                  </strong>

                  <small>
                    Agrega y edita
                    tu catálogo
                  </small>
                </div>
              </div>

              <div>
                <span className="admin-brand__feature-icon">
                  ♡
                </span>

                <div>
                  <strong>
                    Disponibilidad
                  </strong>

                  <small>
                    Controla
                    existencias
                  </small>
                </div>
              </div>

              <div>
                <span className="admin-brand__feature-icon">
                  ✿
                </span>

                <div>
                  <strong>
                    Precios
                  </strong>

                  <small>
                    Actualiza todo
                    fácilmente
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="admin-brand__doodles">
            <span className="admin-doodle admin-doodle--heart">
              ♡
            </span>

            <span className="admin-doodle admin-doodle--spark">
              ✦
            </span>

            <span className="admin-doodle admin-doodle--flower">
              ✿
            </span>
          </div>

          <p className="admin-brand__footer">
            Hecho especialmente
            para SD Creations ✨
          </p>
        </div>

        <div className="admin-access">
          <div className="admin-card">
            <div className="admin-card__header">
              <span className="admin-card__icon">
                ✨
              </span>

              <p>
                PANEL
                ADMINISTRATIVO
              </p>

              <h2>
                Bienvenida
              </h2>

              <span className="admin-card__subtitle">
                Inicia sesión para
                continuar
              </span>
            </div>

            <form
              className="admin-form"
              onSubmit={
                handleSubmit
              }
            >
              <label className="admin-form__field">
                <span className="admin-form__label">
                  Correo
                  electrónico
                </span>

                <div className="admin-form__input-wrap">
                  <span className="admin-form__input-icon">
                    @
                  </span>

                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    value={email}
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event.target
                          .value
                      )
                    }
                    required
                  />
                </div>
              </label>

              <label className="admin-form__field">
                <span className="admin-form__label">
                  Contraseña
                </span>

                <div className="admin-form__input-wrap">
                  <span className="admin-form__input-icon">
                    ♡
                  </span>

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    placeholder="Tu contraseña"
                    autoComplete="current-password"
                    value={
                      password
                    }
                    onChange={(
                      event
                    ) =>
                      setPassword(
                        event.target
                          .value
                      )
                    }
                    required
                  />

                  <button
                    className="admin-form__show-password"
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (
                          current
                        ) =>
                          !current
                      )
                    }
                  >
                    {showPassword
                      ? 'Ocultar'
                      : 'Ver'}
                  </button>
                </div>
              </label>

              {error && (
                <div className="admin-form__error">
                  <span>
                    !
                  </span>

                  {error}
                </div>
              )}

              <button
                className="admin-form__submit"
                type="submit"
                disabled={
                  isLoading
                }
              >
                <span>
                  {isLoading
                    ? 'Entrando...'
                    : 'Entrar al panel'}
                </span>

                {!isLoading && (
                  <span className="admin-form__arrow">
                    →
                  </span>
                )}
              </button>
            </form>

            <div className="admin-card__secure">
              <span>
                🔒
              </span>

              Acceso privado
              para administración
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Admin