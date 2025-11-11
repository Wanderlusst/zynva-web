import { defineField, defineType } from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'en',
      options: {
        list: [
          { title: 'US English', value: 'en' },
          { title: 'UK English', value: 'en-GB' },
          { title: 'Australia English', value: 'en-AU' },
        ],
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'showCategoryName',
      title: 'Show Category Names',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show or hide category names in the FAQ section',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqCategory',
          title: 'FAQ Category',
          fields: [
            {
              name: 'category',
              title: 'FAQ Category',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'questions',
              title: 'Questions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'questionAnswer',
                  title: 'Question & Answer',
                  fields: [
                    {
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'answer',
                      title: 'Answer',
                      type: 'text',
                      rows: 4,
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'question',
                      subtitle: 'answer',
                    },
                    prepare(selection) {
                      const { title, subtitle } = selection
                      return {
                        title: title || 'Question',
                        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No answer',
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'category',
              subtitle: 'questions.length',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title || 'FAQ Category',
                subtitle: `${subtitle || 0} questions`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'FAQ Section',
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No description',
      }
    },
  },
  orderings: [
    {
      title: 'Heading',
      name: 'heading',
      by: [{ field: 'heading', direction: 'asc' }],
    },
  ],
})
