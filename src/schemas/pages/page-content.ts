import { defineField, defineType } from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
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
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'reference',
      to: [{ type: 'header' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      to: [{ type: 'footer' }],
      validation: (Rule) => Rule.required(),
    }),
    // Hero section is now handled through the pageLayout schema
    // defineField({
    //   name: 'heroSection',
    //   title: 'Hero Section',
    //   type: 'reference',
    //   to: [{ type: 'heroSection' }],
    // }),
    defineField({
      name: 'globalContent',
      title: 'Global Content Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'dynamicContent' }],
        },
      ],
      description: 'Select and order the global content sections to display on this page',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      isPublished: 'isPublished',
    },
    prepare(selection) {
      const { title, subtitle, isPublished } = selection
      return {
        title: title || 'Page Content',
        subtitle: subtitle ? `/${subtitle} • ${isPublished ? 'Published' : 'Draft'}` : 'No slug',
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'title',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Published',
      name: 'published',
      by: [{ field: 'isPublished', direction: 'desc' }],
    },
  ],
})
