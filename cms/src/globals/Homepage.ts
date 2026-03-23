import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        {
          name: 'collection',
          type: 'relationship',
          relationTo: 'fashion-collections',
        },
      ],
    },
    {
      name: 'articles',
      type: 'array',
      fields: [
        { name: 'date', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'link', type: 'text' },
        { name: 'author', type: 'text' },
      ],
    },
  ],
}
