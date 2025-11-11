import { type SchemaTypeDefinition } from 'sanity'

import { post } from './post'
import { layoutSchemas } from './layout'
import { globalContentSchemas } from './global-content'
import { sectionSchemas } from './sections'
import { miscellaneousSchemas } from './miscellaneous'
import { mediaSchemas } from './media/mediaSchemas'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Core documents
    post,
    // Layout (header, footer)
    ...layoutSchemas,
    // Global content (dynamicContent etc.)
    ...globalContentSchemas,
    // Sections (pageLayout, faqSection, etc.)
    ...sectionSchemas,
    // Miscellaneous (faq)
    ...miscellaneousSchemas,
    // Media helpers
    ...mediaSchemas,
  ],
}
