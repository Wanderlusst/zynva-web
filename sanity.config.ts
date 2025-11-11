import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import { media } from 'sanity-plugin-media'
import { schema } from './src/schemas'
import type { StructureBuilder } from 'sanity/structure'
import { 
  EarthGlobeIcon, 
  DocumentIcon, 
  BookIcon, 
  HelpCircleIcon 
} from '@sanity/icons'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'as6uu48r'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'RoHealth Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Translation metadata')
              .icon(EarthGlobeIcon)
              .child(
                S.documentTypeList('translation.metadata')
                  .title('Translation metadata')
              ),
            S.listItem()
              .title('Layout')
              .icon(DocumentIcon)
              .child(
                S.list()
                  .title('Layout')
                  .items([
                    S.listItem()
                      .title('Header')
                      .icon(DocumentIcon)
                      .child(
                        S.documentTypeList('header')
                          .title('Header')
                      ),
                    S.listItem()
                      .title('Footer')
                      .icon(DocumentIcon)
                      .child(
                        S.documentTypeList('footer')
                          .title('Footer')
                      ),
                  ])
              ),
            S.listItem()
              .title('Miscellaneous')
              .icon(BookIcon)
              .child(
                S.list()
                  .title('Miscellaneous')
                  .items([
                    S.listItem()
                      .title('FAQ')
                      .icon(HelpCircleIcon)
                      .child(
                        S.documentTypeList('faq')
                          .title('FAQ')
                      ),
                  ])
              ),
      S.listItem()
        .title('Global Content')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('dynamicContent')
            .title('Global Content')
        ),
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('pageLayout')
            .title('Pages')
        ),
          ]),
    }),
    visionTool(),
    media(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'US English' },
        { id: 'en-GB', title: 'UK English' },
        { id: 'en-AU', title: 'Australia English' },
      ],
      schemaTypes: [
        'pageLayout',
        'header',
        'footer',
        'faq',
        'dynamicContent',
        'faqSection',
      ],
    }),
  ],
  schema,
})