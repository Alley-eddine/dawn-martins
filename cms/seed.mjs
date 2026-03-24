/**
 * Seed script — migrates JSON content + images into Payload CMS.
 *
 * Usage (from inside the cms container):
 *   node seed.mjs
 *
 * Env vars (set by docker-compose):
 *   PAYLOAD_PUBLIC_SERVER_URL — e.g. http://localhost:3002
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3002'
const IMAGES_DIR = path.resolve(__dirname, '../public/images')
const CONTENT_DIR = path.resolve(__dirname, '../public/content')

const ADMIN_EMAIL = 'dawn@dawnmartins.com'
const ADMIN_PASSWORD = 'Dawn2025!cms'

let token = ''

// ─── Helpers ──────────────────────────────────────────────

async function api(method, endpoint, body, isFormData = false) {
  const headers = {}
  if (token) headers['Authorization'] = `JWT ${token}`
  if (!isFormData) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${API}${endpoint}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    console.error(`Failed to parse response from ${endpoint}:`, text.slice(0, 200))
    throw new Error(`API ${method} ${endpoint} returned ${res.status}`)
  }
}

async function createAdmin() {
  console.log('Creating admin user...')
  const res = await api('POST', '/api/users/first-register', {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  })
  if (res.token) {
    token = res.token
    console.log(`  Admin created: ${ADMIN_EMAIL}`)
  } else if (res.errors) {
    // Already exists, login
    console.log('  Admin already exists, logging in...')
    const login = await api('POST', '/api/users/login', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    })
    if (login.token) {
      token = login.token
      console.log('  Logged in.')
    } else {
      throw new Error('Cannot create or login admin: ' + JSON.stringify(login))
    }
  }
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const mimes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.jpe': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }
  return mimes[ext] || 'application/octet-stream'
}

async function uploadImage(imagePath, altText) {
  // imagePath is like "/images/meteore/image00008.jpeg"
  const localPath = path.join(IMAGES_DIR, '..', imagePath)

  if (!fs.existsSync(localPath)) {
    console.warn(`  SKIP: file not found: ${localPath}`)
    return null
  }

  const fileName = path.basename(imagePath)
  const fileBuffer = fs.readFileSync(localPath)
  const mimeType = getMimeType(fileName)
  const file = new File([fileBuffer], fileName, { type: mimeType })

  const form = new FormData()
  form.append('file', file)
  form.append('_payload', JSON.stringify({ alt: altText || fileName }))

  const res = await api('POST', '/api/media', form, true)
  if (res.doc) {
    console.log(`  Uploaded: ${fileName} → id=${res.doc.id}`)
    return res.doc.id
  } else {
    console.warn(`  WARN: upload failed for ${fileName}:`, JSON.stringify(res).slice(0, 200))
    return null
  }
}

// Cache to avoid uploading the same image twice
const imageCache = new Map()

async function getOrUploadImage(imagePath, alt) {
  if (!imagePath) return null
  if (imageCache.has(imagePath)) return imageCache.get(imagePath)

  const id = await uploadImage(imagePath, alt)
  if (id) imageCache.set(imagePath, id)
  return id
}

// ─── Seed Collections ─────────────────────────────────────

async function seedCollections() {
  console.log('\nSeeding fashion collections...')
  const data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'collections.json'), 'utf-8'))

  for (let i = 0; i < data.collections.length; i++) {
    const col = data.collections[i]
    console.log(`\n  Collection: ${col.title}`)

    // Upload thumbnail
    const imageId = await getOrUploadImage(col.image, `${col.title} thumbnail`)
    // Upload hero
    const heroId = await getOrUploadImage(col.heroImage, `${col.title} hero`)

    // Upload all photos
    const photos = []
    for (const photoPath of col.photos) {
      const photoId = await getOrUploadImage(photoPath, `${col.title} photo`)
      if (photoId) {
        photos.push({ image: photoId })
      }
    }

    // Create the collection
    const res = await api('POST', '/api/fashion-collections', {
      title: col.title,
      slug: col.id,
      subtitle: col.subtitle,
      year: col.year,
      description: col.description,
      image: imageId,
      heroImage: heroId,
      photos,
      order: i,
    })

    if (res.doc) {
      console.log(`  Created: ${res.doc.title} (id=${res.doc.id})`)
    } else {
      console.warn(`  WARN: failed to create ${col.title}:`, JSON.stringify(res).slice(0, 300))
    }
  }
}

// ─── Seed Homepage Global ────────────────────────────────

async function seedHomepage() {
  console.log('\nSeeding homepage global...')
  const data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'homepage.json'), 'utf-8'))

  // Upload hero background
  const heroBgId = await getOrUploadImage(data.hero.backgroundImage, 'Homepage hero background')

  // Fetch all fashion collections to map links to IDs
  const collectionsRes = await api('GET', '/api/fashion-collections?limit=100')
  const collectionsBySlug = {}
  if (collectionsRes.docs) {
    for (const doc of collectionsRes.docs) {
      collectionsBySlug[doc.slug] = doc.id
    }
  }

  // Upload gallery images and map collections
  const gallery = []
  for (const item of data.gallery) {
    const imgId = await getOrUploadImage(item.image, 'Homepage gallery')
    if (imgId) {
      // Extract slug from link like "/collection/contraste"
      const slug = item.link?.split('/').pop()
      const collectionId = slug ? collectionsBySlug[slug] : null
      gallery.push({
        image: imgId,
        ...(collectionId ? { collection: collectionId } : {}),
      })
    }
  }

  const res = await api('POST', '/api/globals/homepage', {
    hero: {
      title: data.hero.title,
      subtitle: data.hero.subtitle,
      backgroundImage: heroBgId,
    },
    about: {
      title: data.about.title,
      subtitle: data.about.subtitle,
    },
    gallery,
    articles: data.articles,
  })

  if (res.result || res.hero) {
    console.log('  Homepage global updated.')
  } else {
    console.warn('  WARN: homepage update result:', JSON.stringify(res).slice(0, 300))
  }
}

// ─── Main ─────────────────────────────────────────────────

async function main() {
  console.log(`Payload CMS Seed Script`)
  console.log(`API: ${API}`)
  console.log(`Images: ${IMAGES_DIR}`)
  console.log('')

  await createAdmin()
  await seedCollections()
  await seedHomepage()

  console.log('\n✓ Seed complete!')
  console.log(`  Admin login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
