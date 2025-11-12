import { defineField, defineType } from 'sanity'

export const dynamicContent = defineType({
  name: 'dynamicContent',
  title: 'Global Content',
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
      title: 'Content Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Feature Cards', value: 'feature-cards' },
          { title: 'EMR Cards', value: 'emr-cards' },
          { title: 'Flexibility Cards', value: 'flexibility-cards' },
          { title: 'Integration Section', value: 'integration-section' },
          { title: 'Testimonial Section', value: 'testimonial-section' },
          { title: 'Logo Cloud Carousel', value: 'logo-cloud-carousel' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'contentType',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline (Normal)',
      type: 'string',
      description: 'Simple text headline',
    }),
    defineField({
      name: 'headlineRich',
      title: 'Headline (Rich Text)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [{ title: 'URL', name: 'href', type: 'url' }],
              },
            ],
          },
        },
      ],
      description: 'Rich text headline with formatting options',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    
    // Feature Cards Fields
    defineField({
      name: 'featureCards',
      title: 'Feature Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureCard',
          title: 'Feature Card',
          fields: [
            {
              name: 'headline',
              title: 'Headline (Normal)',
              type: 'string',
              description: 'Simple text headline',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'headlineRich',
              title: 'Headline (Rich Text)',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [{ title: 'URL', name: 'href', type: 'url' }],
                      },
                    ],
                  },
                },
              ],
              description: 'Rich text headline with formatting (if provided, will be used instead of normal headline)',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subheading',
              title: 'Subheading',
              type: 'string',
            },
            {
              name: 'featureImage',
              title: 'Feature Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
              ],
            },
            {
              name: 'benefits',
              title: 'Key Benefits',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: {
              title: 'headline',
              subtitle: 'description',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title || 'Feature Card',
                subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No description',
              }
            },
          },
        },
      ],
      hidden: ({ document, parent }) => {
        // Handle both draft and published states, and internationalization plugin
        const contentType = document?.contentType || parent?.contentType
        return contentType !== 'feature-cards'
      },
    }),

    // EMR Cards Fields
    defineField({
      name: 'emrCards',
      title: 'EMR Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'emrCard',
          title: 'EMR Card',
          fields: [
            {
              name: 'title',
              title: 'EMR System Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'Simple text heading',
            },
            {
              name: 'headingRich',
              title: 'Heading (Rich Text)',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                  },
                },
              ],
              description: 'Rich text heading with formatting',
            },
            {
              name: 'headline',
              title: 'Headline',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'logo',
              title: 'EMR Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      hidden: ({ document, parent }) => {
        // Handle both draft and published states, and internationalization plugin
        const contentType = document?.contentType || parent?.contentType
        return contentType !== 'emr-cards'
      },
    }),

    // Flexibility Cards Fields
    defineField({
      name: 'flexibilityCards',
      title: 'Flexibility Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'flexibilityCard',
          title: 'Flexibility Card',
          fields: [
            {
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'headline',
              title: 'Headline',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subheading',
              title: 'Subheading',
              type: 'string',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'flexibilityType',
              title: 'Flexibility Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Scalability', value: 'scalability' },
                  { title: 'Customization', value: 'customization' },
                  { title: 'Integration', value: 'integration' },
                  { title: 'Workflow', value: 'workflow' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'flexibilityType',
            },
          },
        },
      ],
      hidden: ({ document, parent }) => {
        // Handle both draft and published states, and internationalization plugin
        const contentType = document?.contentType || parent?.contentType
        return contentType !== 'flexibility-cards'
      },
    }),

    // Integration Section Fields
    defineField({
      name: 'integrationSection',
      title: 'Integration Section',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'therapyEMRs',
          title: 'Therapy EMRs',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'therapyEMRIntegration',
              title: 'Therapy EMR Integration',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Integration Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'headline',
                  title: 'Headline',
                  type: 'string',
                }),
                defineField({
                  name: 'logo',
                  title: 'Logo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    }),
                  ],
                }),
                defineField({
                  name: 'url',
                  title: 'Link',
                  type: 'string',
                  description: 'Link to the integration website or page (URL or relative path)',
                }),
                defineField({
                  name: 'color',
                  title: 'Background Color',
                  type: 'string',
                  description: 'CSS color class (e.g., bg-[#35b454])',
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'headline',
                  media: 'logo',
                },
              },
            },
          ],
        }),
        defineField({
          name: 'phoneCommunication',
          title: 'Phone & Communication',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'phoneCommunicationIntegration',
              title: 'Phone & Communication Integration',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Integration Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'headline',
                  title: 'Headline',
                  type: 'string',
                }),
                defineField({
                  name: 'logo',
                  title: 'Logo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    }),
                  ],
                }),
                defineField({
                  name: 'url',
                  title: 'Link',
                  type: 'string',
                  description: 'Link to the integration website or page (URL or relative path)',
                }),
                defineField({
                  name: 'color',
                  title: 'Background Color',
                  type: 'string',
                  description: 'CSS color class (e.g., bg-[#35b454])',
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'headline',
                  media: 'logo',
                },
              },
            },
          ],
        }),
      ],
      hidden: ({ document, parent }) => {
        // Handle both draft and published states, and internationalization plugin
        const contentType = document?.contentType || parent?.contentType
        return contentType !== 'integration-section'
      },
    }),

    // Testimonial Section Fields
    defineField({
      name: 'testimonialSection',
      title: 'Testimonial Section',
      type: 'object',
      fields: [
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'testimonial',
              title: 'Testimonial',
              fields: [
                {
                  name: 'authorName',
                  title: 'Author Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'authorBio',
                  title: 'Author Bio',
                  type: 'string',
                },
                {
                  name: 'testimonialDescription',
                  title: 'Testimonial Description',
                  type: 'text',
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'avatar',
                  title: 'Avatar',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'rating',
                  title: 'Rating',
                  type: 'number',
                  validation: (Rule) => Rule.min(1).max(5),
                },
                {
                  name: 'linkedinUrl',
                  title: 'LinkedIn URL',
                  type: 'url',
                  validation: (Rule) => Rule.uri({
                    allowRelative: false,
                    scheme: ['http', 'https']
                  }),
                },
                {
                  name: 'tags',
                  title: 'Tags',
                  type: 'array',
                  of: [{ type: 'string' }],
                  description: 'Small chips shown at the bottom of the card',
                },
                
              ],
              preview: {
                select: {
                  title: 'authorName',
                  subtitle: 'testimonialDescription',
                },
                prepare(selection) {
                  const { title, subtitle } = selection
                  return {
                    title: title || 'Testimonial',
                    subtitle: subtitle ? subtitle.substring(0, 50) + '...' : '',
                  }
                },
              },
            },
          ],
        },
      ],
      hidden: ({ document, parent }) => {
        // Handle both draft and published states, and internationalization plugin
        const contentType = document?.contentType || parent?.contentType
        return contentType !== 'testimonial-section'
      },
    }),

    // Logo Cloud Carousel Fields
    defineField({
      name: 'logoCloudCarousel',
      title: 'Logo Cloud Carousel',
      type: 'object',
      fields: [
        {
          name: 'logos',
          title: 'Logos',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'logo',
              title: 'Logo',
              fields: [
                {
                  name: 'name',
                  title: 'Company Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'logo',
                  title: 'Logo Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'url',
                  title: 'Company URL',
                  type: 'string',
                },
              ],
              preview: {
                select: {
                  title: 'name',
                },
                prepare(selection) {
                  const { title } = selection
                  return {
                    title: title || 'Logo',
                  }
                },
              },
            },
          ],
        },
        {
          name: 'carouselSettings',
          title: 'Carousel Settings',
          type: 'object',
          fields: [
            {
              name: 'autoplay',
              title: 'Autoplay',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'speed',
              title: 'Speed (seconds)',
              type: 'number',
              initialValue: 3,
            },
            {
              name: 'pauseOnHover',
              title: 'Pause on Hover',
              type: 'boolean',
              initialValue: true,
            },
          ],
        },
      ],
      hidden: ({ document, parent }) => {
        // Handle both draft and published states, and internationalization plugin
        const contentType = document?.contentType || parent?.contentType
        return contentType !== 'logo-cloud-carousel'
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contentType',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Global Content',
        subtitle: subtitle || 'No type selected',
      }
    },
  },
  orderings: [
    {
      title: 'Content Type',
      name: 'contentType',
      by: [{ field: 'contentType', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'title',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
