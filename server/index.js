import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001

const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || 'http://localhost:5173'

const POLLINATIONS_API_KEY =
  process.env.POLLINATIONS_API_KEY

const IMAGE_MODEL =
  process.env.POLLINATIONS_IMAGE_MODEL || 'zimage'

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
)

app.use(
  express.json({
    limit: '2mb',
  })
)

/* =====================================================
   REGLAS DEL PRODUCTO
===================================================== */

const getPhysicalProductRules = (productId, productName) => {
  const rules = {
    taza: `
The product MUST be a classic white ceramic mug.
It MUST have a visible handle.
The customization must appear directly on the mug.
Do not generate another type of product.
`,

    playera: `
The product MUST be a white adult short-sleeve T-shirt.
Show the full front clearly.
The design must be printed on the front.
Do not generate a hoodie, sweatshirt, dress, poncho or cap.
`,

    caja: `
The product MUST be a rigid gift box.
The box can be black, white or pink.
Customization is text only.
Do not add photographs or unrelated illustrations.
`,

    llavero: `
The product MUST clearly be a keychain.
Show a visible key ring and hanging personalized piece.
Do not generate a poster, shirt or framed image.
`,

    cachucha: `
The product MUST be a realistic baseball cap.

It MUST have:
- curved visor
- crown
- visible panels
- realistic wearable cap shape

The design must appear on the FRONT PANEL.

Never generate:
- shirt
- hoodie
- poncho
- sweatshirt
- bag
- poster
- blanket
- fabric sheet
`,

    bolsa: `
The product MUST be a reusable ecological tote bag.
Show the handles and complete bag.
The design must be printed directly on the bag.
`,

    'taza-magica': `
The product MUST be a ceramic heat-sensitive magic mug.
It MUST have a visible handle.
The design must be applied directly to the mug.
`,

    rompecabezas: `
The product MUST be a rectangular jigsaw puzzle.
Puzzle-piece divisions must be visible.
The design must cover the puzzle surface.
`,

    pines: `
The product MUST be a round pin/button badge.
The artwork must appear inside the circular face.
`,

    folder: `
The product MUST be a document folder.
Apply the requested design directly to its front cover.
`,

    gafete: `
The product MUST be an identification badge.
Show a realistic badge/card.
`,

    'bolsa-dulcera': `
The product MUST be a small party candy bag.
Show the complete bag.
Apply the requested theme directly to the bag.
`,

    vaso: `
The product MUST be a reusable drinking cup.
Customization is TEXT ONLY.
Do not add photographs.
`,

    'taza-color': `
The product MUST be a ceramic mug with a colored surface.
It MUST have a visible handle.
`,

    'taza-perla': `
The product MUST be a pearl-finish ceramic mug.
It MUST have a visible handle.
`,

    'sticker-ropa': `
Show the requested artwork as a heat-transfer design applied to dark clothing or denim.
Do not show it as a loose sticker.
`,

    'estrella-helio': `
The product MUST be a metallic star-shaped helium balloon.
Customization is TEXT ONLY.
`,
  }

  return (
    rules[productId] ||
    `
The physical product MUST clearly be a ${productName}.
Never replace it with another type of product.
`
  )
}

/* =====================================================
   TEXTO EXACTO ENTRE COMILLAS
===================================================== */

const extractExactText = (idea) => {
  const matches = [
    ...idea.matchAll(/["“](.+?)["”]/g),
  ]

  return matches
    .map((match) => match[1]?.trim())
    .filter(Boolean)
}

/* =====================================================
   LIMPIAR INSTRUCCIONES
===================================================== */

const cleanCustomerIdea = (idea) =>
  idea
    .replace(/\ben chiquito\b/gi, 'small')
    .replace(/\ben pequeñito\b/gi, 'small')
    .replace(/\ben pequeño\b/gi, 'small')
    .replace(/\ben grande\b/gi, 'large')
    .replace(/\s{2,}/g, ' ')
    .trim()

/* =====================================================
   HEALTH
===================================================== */

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'SD Creations API funcionando ✨',
  })
})

/* =====================================================
   GENERAR DISEÑO
===================================================== */

app.post('/api/generate-design', async (req, res) => {
  try {
    const {
      productId,
      productName,
      idea,
      generationGuide,
      details = [],
    } = req.body

    if (!idea?.trim()) {
      return res.status(400).json({
        error:
          'Describe tu idea antes de generar el diseño.',
      })
    }

    if (!productName?.trim()) {
      return res.status(400).json({
        error:
          'No se recibió el producto seleccionado.',
      })
    }

    if (!POLLINATIONS_API_KEY) {
      return res.status(500).json({
        error:
          'Falta configurar POLLINATIONS_API_KEY.',
      })
    }

    const exactTexts =
      extractExactText(idea)

    const cleanedIdea =
      cleanCustomerIdea(idea)

    const productDetails =
      Array.isArray(details)
        ? details.join(', ')
        : ''

    const physicalRules =
      getPhysicalProductRules(
        productId,
        productName
      )

    const textRules =
      exactTexts.length > 0
        ? `
TEXT RULES — EXTREMELY IMPORTANT:

The ONLY text allowed anywhere in the image is:

${exactTexts.map((text) => `"${text}"`).join('\n')}

Write those phrases EXACTLY as provided.

Do not translate them.
Do not correct them.
Do not add words.
Do not add titles.
Do not add product names.
Do not add captions.
Do not add SD CREATIONS.
Do not add labels.

Any other visible text is forbidden.
`
        : `
TEXT RULES — EXTREMELY IMPORTANT:

NO TEXT IS ALLOWED IN THE GENERATED IMAGE.

Do not generate:
- words
- letters
- numbers
- captions
- product names
- logos
- brand names
- labels
- promotional text

The image must contain ZERO visible text.
`

    const prompt = `
Create one realistic professional ecommerce product mockup.

================================
PRODUCT
================================

${productName}

${physicalRules}

================================
CUSTOMIZATION
================================

${generationGuide || ''}

Available options:

${productDetails}

================================
CUSTOMER IDEA
================================

${cleanedIdea}

The customer writes instructions in Spanish.

Understand the meaning of the customer's request.

Words describing:
- size
- position
- colors
- occasion
- style
- theme

are INSTRUCTIONS, not text that should automatically appear on the product.

================================
${textRules}
================================

PRODUCT ACCURACY HAS HIGHEST PRIORITY.

The physical object MUST remain a ${productName}.

Apply the requested artwork directly onto the product.

Do not show the artwork floating outside the product.

================================
VISUAL STYLE
================================

- one main product only
- complete product visible
- centered composition
- realistic ecommerce photography
- clean studio background
- professional soft lighting
- realistic proportions
- personalization clearly visible
- no watermark
- no promotional banner
- no random branding
- no technical labels
- no product ID
`.trim()

    console.log('')
    console.log('🎨 Nueva generación')
    console.log(`📦 Producto: ${productName}`)
    console.log(`💭 Idea: ${idea}`)

    if (exactTexts.length) {
      console.log(
        `✍️ Texto permitido: ${exactTexts.join(' | ')}`
      )
    } else {
      console.log(
        '🚫 Texto permitido: ninguno'
      )
    }

    const imageUrl = new URL(
      `https://gen.pollinations.ai/image/${encodeURIComponent(
        prompt
      )}`
    )

    imageUrl.searchParams.set(
      'model',
      IMAGE_MODEL
    )

    imageUrl.searchParams.set(
      'width',
      '1024'
    )

    imageUrl.searchParams.set(
      'height',
      '1024'
    )

    imageUrl.searchParams.set(
      'seed',
      Math.floor(
        Math.random() * 1000000
      ).toString()
    )

    const response = await fetch(
      imageUrl,
      {
        headers: {
          Authorization:
            `Bearer ${POLLINATIONS_API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      const errorText =
        await response.text()

      console.error(
        '❌ Error Pollinations:',
        response.status,
        errorText
      )

      return res
        .status(response.status)
        .json({
          error:
            'No se pudo generar la imagen en este momento.',
        })
    }

    const contentType =
      response.headers.get(
        'content-type'
      ) || 'image/jpeg'

    const imageBuffer =
      Buffer.from(
        await response.arrayBuffer()
      )

    const base64 =
      imageBuffer.toString('base64')

    const generatedImage =
      `data:${contentType};base64,${base64}`

    console.log(
      '✅ Imagen generada correctamente'
    )

    return res.json({
      success: true,
      image: generatedImage,
    })
  } catch (error) {
    console.error(
      '❌ Error generando diseño:',
      error
    )

    return res.status(500).json({
      error:
        'Ocurrió un error al generar tu diseño.',
    })
  }
})

/* =====================================================
   SERVER
===================================================== */

app.listen(PORT, () => {
  console.log('')
  console.log('✨ SD CREATIONS API')
  console.log(`🚀 http://localhost:${PORT}`)
  console.log(`🎨 Modelo: ${IMAGE_MODEL}`)
  console.log('💖 Generador preparado')
  console.log('')
})