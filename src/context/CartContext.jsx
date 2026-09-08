import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

export const CartContext = createContext(null)

const STORAGE_KEY = 'sd-creations-cart'

const readStorage = () => {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY)

    if (!savedCart) {
      return []
    }

    const parsedCart = JSON.parse(savedCart)

    return Array.isArray(parsedCart)
      ? parsedCart
      : []
  } catch {
    return []
  }
}

const parsePrice = (value) => {
  if (
    typeof value === 'number' &&
    Number.isFinite(value)
  ) {
    return value
  }

  if (typeof value !== 'string') {
    return null
  }

  const cleaned = value
    .replace(/,/g, '')
    .replace(/[^\d.]/g, '')

  const parsed = Number.parseFloat(cleaned)

  return Number.isFinite(parsed)
    ? parsed
    : null
}

const getProductPrice = (
  product,
  options = {}
) => {
  const possiblePrices = [
    options.price,
    options.variant?.price,
    product?.price,
    product?.priceFrom,
    product?.minPrice,
  ]

  for (const price of possiblePrices) {
    const parsedPrice =
      parsePrice(price)

    if (parsedPrice !== null) {
      return parsedPrice
    }
  }

  return null
}

const getProductImage = (product) => {
  if (product?.image) {
    return product.image
  }

  if (
    Array.isArray(product?.images) &&
    product.images.length > 0
  ) {
    return product.images[0]
  }

  return ''
}

const getLineId = (
  product,
  options = {}
) => {
  const variant =
    options.variant?.id ||
    options.variant?.name ||
    options.variant ||
    options.variantName ||
    ''

  const customization =
    options.customization ||
    options.personalization ||
    ''

  return [
    product?.id ||
      product?.slug ||
      product?.name,
    variant,
    customization,
  ]
    .filter(Boolean)
    .join('__')
}

export function CartProvider({
  children,
}) {
  const [cartItems, setCartItems] =
    useState(readStorage)

  const [
    isCartOpen,
    setIsCartOpen,
  ] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cartItems)
    )
  }, [cartItems])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const toggleCart =
    useCallback(() => {
      setIsCartOpen(
        (current) => !current
      )
    }, [])

  const addToCart = useCallback(
    (product, options = {}) => {
      if (!product) {
        return
      }

      const quantity = Math.max(
        1,
        Number(options.quantity) || 1
      )

      const lineId = getLineId(
        product,
        options
      )

      const variantName =
        options.variant?.name ||
        options.variantName ||
        (typeof options.variant ===
        'string'
          ? options.variant
          : '')

      const customization =
        options.customization ||
        options.personalization ||
        ''

      const price =
        getProductPrice(
          product,
          options
        )

      const newItem = {
        lineId,

        id:
          product.id ||
          product.slug ||
          product.name,

        name:
          product.name ||
          product.title ||
          'Producto',

        image:
          getProductImage(product),

        price,

        priceLabel:
          options.priceLabel ||
          product.priceLabel ||
          (price === null
            ? 'Cotizar'
            : ''),

        variantName,

        customization,

        quantity,
      }

      setCartItems(
        (currentItems) => {
          const existingItem =
            currentItems.find(
              (item) =>
                item.lineId ===
                lineId
            )

          if (!existingItem) {
            return [
              ...currentItems,
              newItem,
            ]
          }

          return currentItems.map(
            (item) =>
              item.lineId ===
              lineId
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      quantity,
                  }
                : item
          )
        }
      )

      setIsCartOpen(true)
    },
    []
  )

  const removeFromCart =
    useCallback((lineId) => {
      setCartItems(
        (currentItems) =>
          currentItems.filter(
            (item) =>
              item.lineId !== lineId
          )
      )
    }, [])

  const increaseQuantity =
    useCallback((lineId) => {
      setCartItems(
        (currentItems) =>
          currentItems.map(
            (item) =>
              item.lineId === lineId
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      1,
                  }
                : item
          )
      )
    }, [])

  const decreaseQuantity =
    useCallback((lineId) => {
      setCartItems(
        (currentItems) =>
          currentItems
            .map((item) =>
              item.lineId === lineId
                ? {
                    ...item,
                    quantity:
                      item.quantity -
                      1,
                  }
                : item
            )
            .filter(
              (item) =>
                item.quantity > 0
            )
      )
    }, [])

  const updateQuantity =
    useCallback(
      (lineId, quantity) => {
        const parsedQuantity =
          Number(quantity)

        if (
          !Number.isFinite(
            parsedQuantity
          ) ||
          parsedQuantity <= 0
        ) {
          removeFromCart(lineId)
          return
        }

        setCartItems(
          (currentItems) =>
            currentItems.map(
              (item) =>
                item.lineId ===
                lineId
                  ? {
                      ...item,
                      quantity:
                        parsedQuantity,
                    }
                  : item
            )
        )
      },
      [removeFromCart]
    )

  const clearCart =
    useCallback(() => {
      setCartItems([])
    }, [])

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [cartItems]
  )

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => {
          if (
            typeof item.price !==
            'number'
          ) {
            return total
          }

          return (
            total +
            item.price *
              item.quantity
          )
        },
        0
      ),
    [cartItems]
  )

  const hasQuotedItems =
    useMemo(
      () =>
        cartItems.some(
          (item) =>
            typeof item.price !==
            'number'
        ),
      [cartItems]
    )

  const value = {
    cartItems,
    cart: cartItems,
    items: cartItems,

    addToCart,
    addItem: addToCart,

    removeFromCart,
    removeItem:
      removeFromCart,

    updateQuantity,
    increaseQuantity,
    decreaseQuantity,

    clearCart,

    cartCount,
    totalItems: cartCount,

    cartTotal,
    total: cartTotal,

    hasQuotedItems,

    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  }

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  )
}