import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'bio', type: 'richText' },
    { name: 'profileImage', type: 'upload', relationTo: 'media' },
  ],
}
