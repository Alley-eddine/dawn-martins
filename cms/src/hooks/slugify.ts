import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

export const slugify =
  (sourceField: string): FieldHook =>
  ({ data, operation, value }) => {
    if (operation === 'create' || !value) {
      const sourceValue = data?.[sourceField]
      if (typeof sourceValue === 'string') {
        return format(sourceValue)
      }
    }
    return value
  }
