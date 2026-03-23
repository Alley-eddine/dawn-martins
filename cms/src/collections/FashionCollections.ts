import type { CollectionConfig } from 'payload'
import { slugify } from '../hooks/slugify'

export const FashionCollections: CollectionConfig = {
  slug: 'fashion-collections',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'subtitle'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [slugify('title')],
      },
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Thumbnail image for collection cards' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Hero banner image for the collection page' },
    },
    {
      name: 'photos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Display order (lower = first)',
      },
      defaultValue: 0,
    },
  ],
}
