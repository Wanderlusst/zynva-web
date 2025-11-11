# Sanity Schema Documentation

This document outlines the comprehensive Sanity schema structure for the RoHealth project with i18n support.

## Schema Structure

### Global Content Schemas

#### 1. Testimonial (`testimonial`)
- **Purpose**: Store customer testimonials
- **Fields**:
  - `name`: Customer name
  - `role`: Customer role/position
  - `company`: Company name
  - `content`: Testimonial text
  - `avatar`: Customer photo
  - `rating`: Star rating (1-5)
  - `featured`: Boolean for featured testimonials

#### 2. Integration (`integration`)
- **Purpose**: Store integration information
- **Fields**:
  - `name`: Integration name
  - `description`: Integration description
  - `logo`: Integration logo
  - `category`: Integration category (EMR, Billing, Scheduling, etc.)
  - `status`: Availability status (Available, Coming Soon, Beta)
  - `features`: Array of key features
  - `documentationUrl`: Link to documentation

#### 3. Flexibility (`flexibility`)
- **Purpose**: Store flexibility features
- **Fields**:
  - `title`: Feature title
  - `description`: Feature description
  - `icon`: Feature icon
  - `features`: Array of key features with descriptions
  - `order`: Display order

#### 4. EMR Feature (`emrFeature`)
- **Purpose**: Store EMR-specific features
- **Fields**:
  - `title`: Feature title
  - `description`: Feature description
  - `icon`: Feature icon
  - `category`: EMR category (Patient Management, Clinical Notes, etc.)
  - `benefits`: Array of key benefits
  - `order`: Display order

#### 5. Feature Category (`featureCategory`)
- **Purpose**: Categorize features
- **Fields**:
  - `name`: Category name
  - `description`: Category description
  - `icon`: Category icon
  - `color`: Color theme
  - `order`: Display order

#### 6. Feature (`feature`)
- **Purpose**: Store individual features
- **Fields**:
  - `title`: Feature title
  - `description`: Feature description
  - `category`: Reference to feature category
  - `icon`: Feature icon
  - `benefits`: Array of key benefits
  - `isHighlighted`: Boolean for highlighted features
  - `order`: Display order

### Miscellaneous Schemas

#### 7. FAQ (`faq`)
- **Purpose**: Store frequently asked questions
- **Fields**:
  - `question`: FAQ question
  - `answer`: FAQ answer (rich text)
  - `category`: FAQ category (General, Pricing, Features, etc.)
  - `order`: Display order
  - `isPublished`: Publication status

### Layout Schemas

#### 8. Header (`header`)
- **Purpose**: Store header configuration
- **Fields**:
  - `logo`: Header logo
  - `logoText`: Logo text
  - `navigation`: Navigation menu items
  - `ctaButton`: Call-to-action button

#### 9. Footer (`footer`)
- **Purpose**: Store footer configuration
- **Fields**:
  - `logo`: Footer logo
  - `logoText`: Logo text
  - `description`: Footer description
  - `columns`: Footer link columns
  - `socialLinks`: Social media links
  - `copyright`: Copyright text
  - `legalLinks`: Legal links (Privacy Policy, Terms, etc.)

### Page Content Schema

#### 10. Page Content (`pageContent`)
- **Purpose**: Main page content with all sections
- **Fields**:
  - `title`: Page title
  - `slug`: URL slug
  - `metaDescription`: SEO meta description
  - `header`: Reference to header
  - `footer`: Reference to footer
  - `heroSection`: Hero section content
  - `contentSections`: Array of content sections (testimonials, integrations, features, FAQ, etc.)
  - `isPublished`: Publication status

### i18n Support

All schemas support internationalization with:
- **Languages**: English (US) and English (GB)
- **Plugin**: `@sanity/document-internationalization`
- **Translation**: Each document can have multiple language versions

## Usage with SSG

### Query Functions

The `src/lib/sanity-queries.ts` file provides pre-built query functions for SSG:

```typescript
// Get all page content
const pages = await getAllPageContent()

// Get specific page by slug
const page = await getPageBySlug('home')

// Get testimonials
const testimonials = await getAllTestimonials()

// Get integrations by category
const emrIntegrations = await getIntegrationsByCategory('emr')

// Get features by category
const features = await getFeaturesByCategory('categoryId')

// Get FAQs
const faqs = await getAllFAQs()
```

### Example Usage in Next.js

```typescript
// pages/index.tsx
import { getStaticProps } from 'next'
import { getAllPageContent } from '../lib/sanity-queries'

export async function getStaticProps() {
  const pages = await getAllPageContent()
  
  return {
    props: {
      pages,
    },
    revalidate: 60, // ISR with 60-second revalidation
  }
}
```

## Content Management

### Creating Content

1. **Header & Footer**: Create single instances that will be referenced by all pages
2. **Global Content**: Create reusable content items (testimonials, integrations, features)
3. **Page Content**: Create pages that reference global content and layout components
4. **Translations**: Use the i18n plugin to create translations for each language

### Content Organization

- **Testimonials**: Create multiple testimonials, mark some as featured
- **Integrations**: Organize by category and status
- **Features**: Group by categories for better organization
- **FAQs**: Categorize by topic for better user experience

### Best Practices

1. **Consistent Ordering**: Use the `order` field for consistent display order
2. **Featured Content**: Use boolean flags for highlighting important content
3. **Rich Text**: Use rich text fields for complex content like FAQ answers
4. **Image Optimization**: Use Sanity's image optimization features
5. **SEO**: Fill in meta descriptions and use proper slugs

## Development

### Running Sanity Studio

```bash
npm run sanity
```

### Building for Production

```bash
npm run sanity:build
```

### Deploying

```bash
npm run sanity:deploy
```

## Environment Variables

Make sure to set these environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```
