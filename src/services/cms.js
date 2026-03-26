const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3002'

function mediaUrl(media, size) {
  if (!media) return null
  if (typeof media === 'string') return media
  if (size && media.sizes?.[size]?.url) return media.sizes[size].url
  return media.url || null
}

export async function getHomepage() {
  const res = await fetch(`${CMS_URL}/api/globals/homepage?depth=2`)
  const data = await res.json()

  return {
    hero: {
      backgroundImage: mediaUrl(data.hero?.backgroundImage, 'hero') || mediaUrl(data.hero?.backgroundImage),
      title: data.hero?.title || '',
      subtitle: data.hero?.subtitle || '',
    },
    about: {
      title: data.about?.title || '',
      subtitle: data.about?.subtitle || '',
    },
    gallery: (data.gallery || []).map((item) => ({
      image: mediaUrl(item.image, 'gallery') || mediaUrl(item.image),
      link: item.collection?.slug ? `/collection/${item.collection.slug}` : '#',
    })),
    articles: (data.articles || []).map((a) => ({
      date: a.date,
      title: a.title,
      description: a.description,
      link: a.link,
      author: a.author,
    })),
  }
}

export async function getCollections() {
  const res = await fetch(`${CMS_URL}/api/fashion-collections?depth=1&limit=100&sort=order`)
  const data = await res.json()

  return (data.docs || []).map((col) => ({
    id: col.slug,
    title: col.title,
    subtitle: col.subtitle,
    year: col.year,
    description: col.description,
    image: mediaUrl(col.image, 'card') || mediaUrl(col.image),
    heroImage: mediaUrl(col.heroImage, 'hero') || mediaUrl(col.heroImage),
    photos: (col.photos || []).map((p) => mediaUrl(p.image, 'gallery') || mediaUrl(p.image)),
  }))
}

function docUrl(doc) {
  if (!doc) return null
  if (typeof doc === 'string') return doc
  return doc.url || null
}

export async function getAbout() {
  const res = await fetch(`${CMS_URL}/api/globals/about?depth=1`)
  const data = await res.json()

  return {
    title: data.title || '',
    subtitle: data.subtitle || '',
    bio: data.bio || null,
    profileImage: mediaUrl(data.profileImage, 'hero') || mediaUrl(data.profileImage),
    cv: docUrl(data.cv),
    email: data.email || null,
  }
}

export async function getCollection(slug) {
  const res = await fetch(
    `${CMS_URL}/api/fashion-collections?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`,
  )
  const data = await res.json()
  const col = data.docs?.[0]
  if (!col) return null

  return {
    id: col.slug,
    title: col.title,
    subtitle: col.subtitle,
    year: col.year,
    description: col.description,
    image: mediaUrl(col.image, 'card') || mediaUrl(col.image),
    heroImage: mediaUrl(col.heroImage, 'hero') || mediaUrl(col.heroImage),
    photos: (col.photos || []).map((p) => mediaUrl(p.image, 'gallery') || mediaUrl(p.image)),
  }
}
