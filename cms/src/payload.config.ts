import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { FashionCollections } from './collections/FashionCollections'
import { Homepage } from './globals/Homepage'
import { About } from './globals/About'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, FashionCollections],
  globals: [Homepage, About],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  cors: [process.env.FRONTEND_URL || 'http://localhost:5173'],
  csrf: [process.env.FRONTEND_URL || 'http://localhost:5173'],
})
