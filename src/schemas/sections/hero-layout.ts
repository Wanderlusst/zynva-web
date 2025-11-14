import { defineField, defineType } from 'sanity'

export const heroLayout = defineType({
  name: 'pageLayout',
  title: 'Page Layout',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'All Fields',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'cta',
      title: 'CTA Section',
    },
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'en',
      group: 'content',
      options: {
        list: [
          { title: 'US English', value: 'en' },
          { title: 'UK English', value: 'en-GB' },
          { title: 'Australia English', value: 'en-AU' },
        ],
      },
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'reference',
      to: [{ type: 'header' }],
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule) => Rule.required().max(100),
        },
        {
          name: 'keyHeading',
          title: 'Key Heading',
          type: 'string',
          description: 'Important sub-heading or key message to highlight',
          validation: (Rule) => Rule.max(120),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required().min(10),
        },
      ],
    }),
    defineField({
      name: 'subheadings',
      title: 'Subheadings',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'subheadings2',
      title: 'Subheadings 2',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'heroImage',
          title: 'Hero Image',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              order: 'order',
              media: 'image',
            },
            prepare(selection) {
              const { order } = selection
              return {
                title: `Hero Image ${order || 'No order'}`,
                subtitle: `Order: ${order || 'Not set'}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'globalContent',
      title: 'Global Content Sections',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'dynamicContent' },
            { type: 'faq' },
            { type: 'faqSection' },
          ],
        },
      ],
      description: 'Select and order the global content sections and miscellaneous content to display on this page',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      to: [{ type: 'footer' }],
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description: 'Page title for search engines (recommended: 50-60 characters)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
          description: 'Meta description for search engines (recommended: 150-160 characters)',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Keywords for SEO (comma-separated)',
        },
        {
          name: 'ogTitle',
          title: 'Open Graph Title',
          type: 'string',
          description: 'Title for social media sharing',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'ogDescription',
          title: 'Open Graph Description',
          type: 'text',
          rows: 3,
          description: 'Description for social media sharing',
          validation: (Rule) => Rule.max(200),
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media sharing (recommended: 1200x630px)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'ogUrl',
          title: 'Open Graph URL',
          type: 'url',
          description: 'Canonical URL for this page',
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Canonical URL to prevent duplicate content issues',
        },
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      group: 'cta',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'formId',
          title: 'HubSpot Form ID',
          type: 'string',
          description: 'The HubSpot form ID to use for demo requests',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'scheduleLink',
          title: 'Schedule Walkthrough Link',
          type: 'url',
          description: 'URL to open when clicking "Join Waiting List" buttons (opens in new tab)',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroSection.heading',
      subtitle: 'heroSection.description',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Page Layout',
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No hero section',
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
