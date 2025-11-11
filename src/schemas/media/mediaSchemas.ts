import { type SchemaTypeDefinition } from 'sanity'

export const mediaSchemas: SchemaTypeDefinition[] = [
  {
    name: 'mediaAsset',
    title: 'Media Asset',
    type: 'document',
    fields: [
      {
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
      },
      {
        name: 'asset',
        title: 'Asset',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        description: 'Order for displaying the asset',
        validation: (Rule) => Rule.required().min(0),
      },
    ],
    preview: {
      select: {
        media: 'asset',
        order: 'order',
      },
      prepare(selection) {
        const { media, order } = selection
        return {
          title: `Asset ${order || 'No order'}`,
          subtitle: `Order: ${order || 'Not set'}`,
          media: media,
        }
      },
    },
  },
  {
    name: 'simpleImage',
    title: 'Simple Image',
    type: 'object',
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
        description: 'Order for displaying the image',
        validation: (Rule) => Rule.required().min(0),
      },
    ],
    preview: {
      select: {
        media: 'image',
        order: 'order',
      },
      prepare(selection) {
        const { media, order } = selection
        return {
          title: `Image ${order || 'No order'}`,
          subtitle: `Order: ${order || 'Not set'}`,
          media: media,
        }
      },
    },
  },
]
