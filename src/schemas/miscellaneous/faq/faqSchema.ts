import { defineField, defineType } from 'sanity'

export const faqSchema = defineType({
  name: 'faq',
  title: 'FAQ',
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
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'faqCategories',
      title: 'FAQ Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqCategory',
          title: 'FAQ Category',
          fields: [
            defineField({
              name: 'categoryName',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'questions',
              title: 'Questions & Answers',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'qa',
                  title: 'Q&A',
                  fields: [
                    defineField({
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                      validation: (Rule) => Rule.required().max(200),
                    }),
                    defineField({
                      name: 'answer',
                      title: 'Answer',
                      type: 'text',
                      validation: (Rule) => Rule.required().min(10),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'question',
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'categoryName',
              subtitle: 'questions',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              const questionCount = subtitle ? subtitle.length : 0
              return {
                title: title,
                subtitle: `${questionCount} question${questionCount !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
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
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
