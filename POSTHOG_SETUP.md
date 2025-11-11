# PostHog Analytics Setup Guide

PostHog has been successfully integrated into your project! Follow these steps to complete the setup for the **Zynva** project.

## 🔑 Get Your PostHog API Key

1. Go to your PostHog project: [https://us.posthog.com/project/208876/settings/project](https://us.posthog.com/project/208876/settings/project)
2. Navigate to **Settings** → **Project API Key**
3. Copy your **Project API Key**

## ⚙️ Configure Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```bash
# PostHog Configuration for Zynva Project
# Project URL: https://us.posthog.com/project/208876

NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com
```

Replace `phc_your_actual_key_here` with the API key you copied from PostHog.

**Note**: The `.env.local` file is already in `.gitignore`, so your API key will not be committed to version control.

## 📊 What's Being Tracked

The following events are automatically tracked:

### Page Views
- Automatic page view tracking on every route change
- Includes full URL with query parameters

### Button Clicks
- **Hero CTA**: `button_clicked` with properties `{ button_name: 'hero_cta', section: 'hero' }`
- **Header CTA**: `button_clicked` with properties `{ button_name: 'header_cta', location: 'header' }`
- **Footer CTA**: `button_clicked` with properties `{ button_name: 'footer_cta', location: 'footer_hero' }`
- **Mobile Menu CTA**: `button_clicked` with properties `{ button_name: 'mobile_header_cta', location: 'mobile_menu' }`
- **App Store Button**: `button_clicked` with properties `{ button_name: 'app_store', location: 'footer' }`
- **Google Play Button**: `button_clicked` with properties `{ button_name: 'google_play', location: 'footer' }`
- **Social Media Buttons**: `button_clicked` with properties `{ button_name: 'social_twitter|social_x|social_linkedin', location: 'footer' }`
- **Privacy Policy**: `button_clicked` with properties `{ button_name: 'privacy_policy', location: 'footer' }`
- **Terms of Service**: `button_clicked` with properties `{ button_name: 'terms_of_service', location: 'footer' }`

### Navigation Links
- **Features Nav**: `link_clicked` with properties `{ link_name: 'Features Nav', url: '#features', location: 'header|mobile_menu' }`
- **Integrations Nav**: `link_clicked` with properties `{ link_name: 'Integrations Nav', url: '#integrations', location: 'header|mobile_menu' }`
- **FAQs Nav**: `link_clicked` with properties `{ link_name: 'FAQs Nav', url: '#faqs', location: 'header|mobile_menu' }`

## 🎯 Custom Event Tracking

You can track custom events in any component using the `usePostHog` hook:

```typescript
import { usePostHog } from '@/hooks/usePostHog';

function MyComponent() {
  const { trackEvent, trackButtonClick } = usePostHog();

  return (
    <button onClick={() => trackButtonClick('my_button', { custom_prop: 'value' })}>
      Click Me
    </button>
  );
}
```

### Available Tracking Methods

```typescript
const { 
  trackEvent,        // Track any custom event
  trackButtonClick,  // Track button clicks
  trackLinkClick,    // Track link clicks
  trackFormSubmit,   // Track form submissions
  identifyUser,      // Identify a user
  posthog            // Access PostHog instance directly
} = usePostHog();
```

## 🔄 Testing

1. Start your development server: `npm run dev`
2. Open the browser console
3. You should see "PostHog loaded" in the console (in development mode)
4. Click any tracked button or navigate to different pages
5. Check your PostHog dashboard to see events coming in

## 📚 Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog React SDK](https://posthog.com/docs/libraries/react)
- [Your PostHog Project - Zynva](https://us.posthog.com/project/208876)

## 🚀 Next Steps

1. Create `.env.local` file in the project root
2. Add your PostHog API key from project 208876 to `.env.local`
3. Restart your development server: `npm run dev`
4. Test the tracking by clicking buttons and navigating
5. View events in your [PostHog dashboard](https://us.posthog.com/project/208876)
6. Customize tracking as needed for your specific use cases

## 📊 Current Tracking Implementation

Your Zynva site is already tracking the following events:

### Automatic Tracking
- **Page Views**: Every route change is automatically tracked
- **Page Leaves**: Automatically captures when users leave pages

### Button Clicks Tracked
- Hero Section CTA
- Header CTA (desktop & mobile)
- Footer CTA
- App Store & Google Play buttons
- Social media links (Twitter/X, LinkedIn)
- Privacy Policy & Terms of Service links

### Navigation Tracking
- Features, Integrations, and FAQs navigation links
- Tracks both desktop header and mobile menu clicks

All events are tracked with contextual properties to help you understand user behavior across different sections of your site.

## 🔒 Privacy & Compliance

PostHog is configured with:
- `person_profiles: 'identified_only'` - Only tracks identified users' profiles
- `capture_pageleave: true` - Tracks when users leave pages
- Development mode logging for easier debugging

Make sure to:
- Add a privacy policy explaining your analytics usage
- Comply with GDPR/CCPA by providing opt-out options if required
- Review PostHog's privacy features: https://posthog.com/docs/privacy

