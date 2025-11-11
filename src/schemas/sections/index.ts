import { type SchemaTypeDefinition } from 'sanity'

import { faqSection } from './faq-section'
import { heroLayout } from './hero-layout'

export const sectionSchemas: SchemaTypeDefinition[] = [
  heroLayout,
  faqSection,
]

export { faqSection,heroLayout }
