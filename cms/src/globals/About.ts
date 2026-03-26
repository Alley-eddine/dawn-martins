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
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'documents',
      admin: { description: 'PDF file for the downloadable CV' },
    },
    {
      name: 'email',
      type: 'email',
      admin: { description: 'Contact email displayed on the About page' },
    },
  ],
}
