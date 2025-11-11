import { type SchemaTypeDefinition } from 'sanity'

import { dynamicContent } from './dynamic-content'

export const globalContentSchemas: SchemaTypeDefinition[] = [
  dynamicContent,
]

export { dynamicContent }
