const productImages = import.meta.glob(
  '../assets/products/**/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    import: 'default',
  }
)

const getImages = (folder) =>
  Object.entries(productImages)
    .filter(([path]) =>
      path.includes(`/products/${folder}/`)
    )
    .sort(([a], [b]) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )
    .map(([, image]) => image)

/* =====================================================
   ELECTRÓNICA

   Cada imagen de la carpeta "electronica" representa
   un producto independiente.
===================================================== */

const electronicaImages = getImages('electronica')

const electronicaInfo = [
  {
    name: 'Reloj inteligente Galaxy Watch',
    description:
      'Reloj inteligente con monitoreo de salud, modos deportivos y diferentes funciones para el día a día.',
  },

  {
    name: 'Audífonos Kuromi',
    description:
      'Audífonos inalámbricos con diseño de Kuromi, disponibles en diferentes modelos.',
  },

  {
    name: 'Audífonos Capitán América',
    description:
      'Audífonos inalámbricos con diseño inspirado en Capitán América.',
  },

  {
    name: 'Audífonos Mickey & Minnie',
    description:
      'Audífonos inalámbricos con diseños de Mickey y Minnie.',
  },

  {
    name: 'Audífonos Samsung Galaxy Buds',
    description:
      'Audífonos inalámbricos estilo Galaxy Buds disponibles en diferentes modelos.',
  },

  {
    name: 'Audífonos Sony',
    description:
      'Audífonos inalámbricos Sony disponibles en diferentes presentaciones.',
  },

  {
    name: 'Audífonos Motorola',
    description:
      'Audífonos inalámbricos Motorola disponibles en diferentes modelos.',
  },

  {
    name: 'Tablet',
    description:
      'Equipo portátil 2 en 1 con teclado, mouse y diferentes accesorios incluidos.',
  },

  {
    name: 'Reloj inteligente',
    description:
      'Reloj inteligente con funciones deportivas, monitoreo de salud y accesorios.',
  },
]

const electronicaProducts = electronicaImages.map(
  (image, index) => {
    const info = electronicaInfo[index]

    return {
      id: `electronica-${index + 1}`,

      name:
        info?.name ||
        'Producto electrónico',

      department: 'electronica',

      description:
        info?.description ||
        'Producto electrónico disponible en SD Creations. Consulta disponibilidad y precio.',

      price: null,

      priceLabel: 'Consultar',

      images: [image],

      customizable: false,

      quoteOnly: true,

      soldOut: false,

      featured: index < 3,
    }
  }
)

/* =====================================================
   PRODUCTOS
===================================================== */

export const products = [
  /* =====================================================
     PERSONALIZADOS
  ===================================================== */

  {
    id: 'tazas-blancas',
    name: 'Tazas blancas',
    department: 'personalizados',

    description:
      'Personaliza tu taza con fotografía, nombre, frase o diseño especial.',

    price: 65,
    priceLabel: 'Desde $65',

    images: getImages('tazas-blancas'),

    customizable: true,

    variants: [
      {
        id: '11oz',
        name: '11 oz',
        price: 65,
      },

      {
        id: '15oz',
        name: '15 oz',
        price: 90,
      },
    ],

    featured: true,
  },

  {
    id: 'tazas-magicas',
    name: 'Taza mágica',
    department: 'personalizados',

    description:
      'Revela el diseño con una bebida caliente. Personalízala con fotografía y frase.',

    price: 90,

    images: getImages('tazas-magicas'),

    customizable: true,

    featured: true,
  },

  {
    id: 'taza-perla',
    name: 'Taza perla',
    department: 'personalizados',

    description:
      'Taza con acabado especial que puedes personalizar con fotografías, nombres o diseños.',

    price: 90,

    images: getImages('taza-perla'),

    customizable: true,
  },

  {
    id: 'taza-magica-duo',
    name: 'Taza mágica dúo',
    department: 'personalizados',

    description:
      'Set de dos tazas mágicas personalizadas con fotografías y frases.',

    price: 180,

    images: getImages('taza-magica-duo'),

    customizable: true,
  },

  {
    id: 'tazas-fondo-color',
    name: 'Taza con fondo de color',
    department: 'personalizados',

    description:
      'Taza con fondo de color personalizada con fotografía, texto o diseño.',

    price: 90,

    images: getImages(
      'tazas-con-fondo-de-color'
    ),

    customizable: true,
  },

  {
    id: 'playeras-adulto',
    name: 'Playera para adulto',
    department: 'personalizados',

    description:
      'Playera blanca personalizada para hombre o mujer.',

    price: 140,

    images: getImages('playeras-adulto'),

    customizable: true,

    variants: [
      {
        id: 'm',
        name: 'Talla M',
        price: 140,
      },

      {
        id: 'g',
        name: 'Talla G',
        price: 140,
      },

      {
        id: 'xl',
        name: 'Talla XL',
        price: 140,
      },
    ],

    notes:
      'Disponible únicamente en color blanco.',

    featured: true,
  },

  {
    id: 'termos',
    name: 'Termos personalizados',
    department: 'personalizados',

    description:
      'Termos personalizados con nombres, palabras o frases.',

    price: 190,
    priceLabel: 'Desde $190',

    images: getImages('termos'),

    customizable: true,

    variants: [
      {
        id: 'chico',
        name: 'Termo chico',
        price: 190,
      },

      {
        id: 'grande',
        name: 'Termo grande',
        price: 220,
      },
    ],

    notes:
      'Personalización únicamente con letras o texto.',

    soldOut: true,

    featured: true,
  },

  {
    id: 'vasos',
    name: 'Vasos personalizados',
    department: 'personalizados',

    description:
      'Vasos personalizados con nombres, palabras o frases.',

    price: 45,
    priceLabel: 'Desde $45',

    images: getImages('vasos'),

    customizable: true,

    variants: [
      {
        id: '500ml',
        name: '500 ml',
        price: 45,
      },

      {
        id: '750ml',
        name: '750 ml',
        price: 65,
      },
    ],

    notes:
      'Personalización únicamente con letras o texto.',

    featured: true,
  },

  {
    id: 'tarro-cervecero',
    name: 'Tarro cervecero',
    department: 'personalizados',

    description:
      'Tarro cervecero personalizado con fotografías y frases.',

    price: 140,

    images: getImages('tarro-cervecero'),

    customizable: true,

    soldOut: true,

    featured: true,
  },

  {
    id: 'llaveros',
    name: 'Llaveros personalizados',
    department: 'personalizados',

    description:
      'Personaliza tu llavero con la fotografía que quieras.',

    price: 35,

    images: getImages('llaveros'),

    customizable: true,

    notes:
      'Pregunta por WhatsApp por los modelos disponibles.',

    featured: true,
  },

  {
    id: 'pines',
    name: 'Pines personalizados',
    department: 'personalizados',

    description:
      'Pines personalizados con la imagen o diseño que quieras.',

    price: 15,
    priceLabel: 'Desde $15',

    images: getImages('pines'),

    customizable: true,

    variants: [
      {
        id: '3cm',
        name: '3 cm',
        price: 15,
      },

      {
        id: '6cm',
        name: '6 cm',
        price: 25,
      },
    ],
  },

  {
    id: 'cachuchas',
    name: 'Cachuchas personalizadas',
    department: 'personalizados',

    description:
      'Cachuchas personalizadas con logotipos, nombres o letras.',

    price: 85,

    images: getImages('cachuchas'),

    customizable: true,
  },

  {
    id: 'cajas-personalizadas',
    name: 'Cajas personalizadas',
    department: 'personalizados',

    description:
      'Caja personalizada con nombres, palabras o frases.',

    price: 65,

    images: getImages(
      'cajas-personalizadas'
    ),

    customizable: true,

    notes:
      'Caja en negro, blanco o rosa. Letras en negro, dorado, plata o rosa.',

    featured: true,
  },

  {
    id: 'bolsa-ecologica',
    name: 'Bolsa ecológica',
    department: 'personalizados',

    description:
      'Bolsa ecológica personalizada con fotografías y frases.',

    price: 70,
    priceLabel: 'Desde $70',

    images: getImages('bolsa-ecologica'),

    customizable: true,

    variants: [
      {
        id: 'un-lado',
        name: 'Un lado',
        price: 70,
      },

      {
        id: 'dos-lados',
        name: 'Ambos lados',
        price: 90,
      },
    ],
  },

  {
    id: 'bolsa-dulcera',
    name: 'Bolsa dulcera',
    department: 'personalizados',

    description:
      'Bolsa dulcera personalizada con fotografías, personajes, nombres o frases.',

    price: 35,

    images: getImages('bolsa-dulcera'),

    customizable: true,
  },

  {
    id: 'rompecabezas',
    name: 'Rompecabezas personalizado',
    department: 'personalizados',

    description:
      'Rompecabezas tamaño carta personalizado con tu fotografía favorita.',

    price: 50,
    priceLabel: 'Desde $50',

    images: getImages('rompecabezas'),

    customizable: true,

    variants: [
      {
        id: 'carton',
        name: 'Cartón',
        price: 50,
      },

      {
        id: 'dtf',
        name: 'DTF',
        price: 100,
      },
    ],
  },

  {
    id: 'sticker-ropa',
    name: 'Sticker para ropa',
    department: 'personalizados',

    description:
      'Sticker para ropa oscura o mezclilla personalizado con fotografía.',

    price: 30,

    images: getImages(
      'sticker-para-ropa'
    ),

    customizable: true,
  },

  /* =====================================================
     FIESTA & EVENTOS
  ===================================================== */

  {
    id: 'letras-decoracion',
    name: 'Letras para decoración',
    department: 'fiesta-eventos',

    description:
      'Letras para decoración o pastel. Precio por hoja tamaño carta.',

    price: 20,

    images: getImages(
      'letras-para-decoracion'
    ),

    customizable: true,

    notes:
      'Colores disponibles: rojo, plata y dorado.',
  },

  {
    id: 'centros-de-mesa',
    name: 'Centros de mesa',
    department: 'fiesta-eventos',

    description:
      'Centros de mesa personalizados según temática, colores y estilo del evento.',

    price: null,
    priceLabel: 'Cotizar',

    images: getImages('centros-de-mesa'),

    customizable: true,

    quoteOnly: true,

    featured: true,
  },

  {
    id: 'globo-jumbo',
    name: 'Globo jumbo',
    department: 'fiesta-eventos',

    description:
      'Globo jumbo personalizado. El precio depende de la decoración y contenido solicitado.',

    price: null,
    priceLabel: 'Cotizar',

    images: getImages('globo-jumbo'),

    customizable: true,

    quoteOnly: true,

    featured: true,
  },

  {
    id: 'globo-burbuja',
    name: 'Globo burbuja',
    department: 'fiesta-eventos',

    description:
      'Globo burbuja personalizado con relleno decorativo y frase corta.',

    price: 130,

    images: getImages('globo-burbuja'),

    customizable: true,

    notes:
      'Relleno con pintura, diamantina, bolitas de unicel o papel picado.',

    featured: true,
  },

  {
    id: 'estrellas-de-helio',
    name: 'Estrella de helio',
    department: 'fiesta-eventos',

    description:
      'Estrella de helio personalizada con nombre, palabra o frase.',

    price: 90,

    images: getImages(
      'estrellas-de-helio'
    ),

    customizable: true,
  },

  {
    id: 'distintivos',
    name: 'Distintivos',
    department: 'fiesta-eventos',

    description:
      'Distintivos para baby shower o revelación de sexo.',

    price: 70,
    priceLabel: 'Desde $70',

    images: getImages('distintivos'),

    customizable: true,

    variants: [
      {
        id: 'uno',
        name: '1 distintivo',
        price: 70,
      },

      {
        id: 'par',
        name: 'Par',
        price: 130,
      },
    ],

    notes:
      'Temáticas: baby shower niña, baby shower niño o revelación de sexo.',
  },

  {
    id: 'bolsa-dulcera-evento',
    name: 'Bolsas para evento',
    department: 'fiesta-eventos',

    description:
      'Bolsas dulceras que puedes adaptar a la temática de tu celebración.',

    price: 35,

    images: getImages('bolsa-dulcera'),

    customizable: true,
  },

  /* =====================================================
     REGALOS & DETALLES
  ===================================================== */

  {
    id: 'set-taza-caja',
    name: 'Set taza + caja',
    department: 'regalos-detalles',

    description:
      'Set de taza con caja personalizada con el diseño de tu preferencia.',

    price: 100,

    images: getImages('set-taza-caja'),

    customizable: true,

    featured: true,
  },

  {
    id: 'perfumes',
    name: 'Perfumes',
    department: 'regalos-detalles',

    description:
      'Perfumes disponibles en diferentes modelos y presentaciones.',

    price: null,
    priceLabel: 'Ver modelos',

    images: getImages('perfumes'),

    quoteOnly: true,

    featured: true,
  },

  /* =====================================================
     NIÑOS & BEBÉ
  ===================================================== */

  {
    id: 'bebe',
    name: 'Productos para bebé',
    department: 'infantil',

    description:
      'Productos para bebé disponibles en diferentes modelos.',

    price: null,
    priceLabel: 'Consultar',

    images: getImages('bebe'),

    quoteOnly: true,
  },

  {
    id: 'montables',
    name: 'Montables',
    department: 'infantil',

    description:
      'Montables infantiles disponibles en diferentes modelos.',

    price: null,
    priceLabel: 'Consultar',

    images: getImages('montables'),

    quoteOnly: true,

    featured: true,
  },

  {
    id: 'juguetes-para-nino',
    name: 'Juguetes',
    department: 'infantil',

    description:
      'Juguetes infantiles disponibles en distintos modelos.',

    price: null,
    priceLabel: 'Consultar',

    images: getImages(
      'jugetes-para-nin-o'
    ),

    quoteOnly: true,

    featured: true,
  },

  /* =====================================================
     ELECTRÓNICA
     Cada imagen es un artículo independiente.
  ===================================================== */

  ...electronicaProducts,

  /* =====================================================
     ACCESORIOS & MÁS
  ===================================================== */

  {
    id: 'folder',
    name: 'Folder personalizado',
    department: 'accesorios-varios',

    description:
      'Folder personalizado con fotografías, imágenes y texto.',

    price: 35,

    images: getImages('folder'),

    customizable: true,
  },

  {
    id: 'gafets',
    name: 'Gafetes personalizados',
    department: 'accesorios-varios',

    description:
      'Gafete personalizado con fotografía, nombre, logotipo o texto.',

    price: 20,

    images: getImages('gafets'),

    customizable: true,
  },
]

/* =====================================================
   HELPERS
===================================================== */

export const featuredProducts =
  products.filter(
    (product) => product.featured
  )

export const getProductsByDepartment = (
  departmentId
) =>
  products.filter(
    (product) =>
      product.department === departmentId
  )

export default products