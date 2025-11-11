import { type SchemaTypeDefinition } from 'sanity'

import { footer } from './footer'
import { header } from './header'

export const layoutSchemas: SchemaTypeDefinition[] = [
  header,
  footer,
]

export { footer,header }
export { Footer } from './footer'
export { Header } from './header'
