# PostHog Event Tracking Summary - Zynva

This document provides a comprehensive overview of all events being tracked in your Zynva application.

## Project Information

- **PostHog Project**: [https://us.posthog.com/project/208876](https://us.posthog.com/project/208876)
- **Setup Date**: January 2025

## Automatic Events

These events are tracked automatically without any code changes:

### Page Views
- **Event Name**: `$pageview`
- **When**: Every time a user navigates to a different route
- **Properties**: 
  - `$current_url`: The full URL including query parameters

### Page Leaves
- **Event Name**: Tracked automatically when users leave pages
- **When**: When a user navigates away from a page

## Manual Events

### Button Click Events

All button clicks in your application are tracked with the `button_clicked` event type and include contextual properties.

#### Hero Section
- **Event**: `button_clicked` with `button_name: 'hero_cta'`
- **Location**: `section: 'hero'`
- **Button Text**: Dynamic from CTA context

#### Header
- **Event**: `button_clicked` with `button_name: 'header_cta'`
- **Location**: `location: 'header'`
- **Button Text**: Dynamic from CTA context

#### Mobile Header
- **Event**: `button_clicked` with `button_name: 'mobile_header_cta'`
- **Location**: `location: 'mobile_menu'`
- **Button Text**: Dynamic from CTA context

#### Footer CTA
- **Event**: `button_clicked` with `button_name: 'footer_cta'`
- **Location**: `location: 'footer_hero'`
- **Button Text**: Dynamic from CTA context

#### App Store & Download Buttons
- **Google Play**: `button_clicked` with `button_name: 'google_play'`
- **App Store**: `button_clicked` with `button_name: 'app_store'`
- **Location**: `location: 'footer'`

#### Social Media Buttons
- **Twitter**: `button_clicked` with `button_name: 'social_twitter'`
- **X (Twitter)**: `button_clicked` with `button_name: 'social_x'`
- **LinkedIn**: `button_clicked` with `button_name: 'social_linkedin'`
- **Location**: `location: 'footer'`

#### Legal Links
- **Privacy Policy**: `button_clicked` with `button_name: 'privacy_policy'`
- **Terms of Service**: `button_clicked` with `button_name: 'terms_of_service'`
- **Location**: `location: 'footer'`

#### Feature Tabs
- **Event**: `button_clicked` with `button_name: 'feature_tab'`
- **Properties**: 
  - `feature_id`: The ID of the feature tab
  - `feature_title`: The title of the feature tab

#### Feature CTAs
- **Event**: `button_clicked` with `button_name: 'feature_cta'`
- **Properties**: 
  - `feature_id`: The ID of the feature
  - `feature_title`: The title of the feature

#### Integration Buttons
- **Walkthrough**: `button_clicked` with `button_name: 'integration_walkthrough'`
- **Request Integration**: `button_clicked` with `button_name: 'request_integration'`
- **Properties**: `section: 'integrations'`

#### EMR Integration
- **Event**: `button_clicked` with `button_name: 'emr_integration_walkthrough'`
- **Properties**: `section: 'emr_integration'`

#### Testimonial Section
- **Event**: `button_clicked` with `button_name: 'testimonial_walkthrough'`
- **Properties**: `section: 'testimonials'`

### Link Click Events

Navigation links are tracked with the `link_clicked` event type.

#### Header Navigation (Desktop)
- **Features**: `link_clicked` with `link_name: 'Features Nav'`
- **Integrations**: `link_clicked` with `link_name: 'Integrations Nav'`
- **FAQs**: `link_clicked` with `link_name: 'FAQs Nav'`
- **Properties**: 
  - `url`: The anchor URL (e.g., '#features')
  - `location: 'header'`

#### Mobile Menu Navigation
- **Features**: `link_clicked` with `link_name: 'Features Nav'`
- **Integrations**: `link_clicked` with `link_name: 'Integrations Nav'`
- **FAQs**: `link_clicked` with `link_name: 'FAQs Nav'`
- **Properties**: 
  - `url`: The anchor URL (e.g., '#features')
  - `location: 'mobile_menu'`

### Form Events

Form events are automatically tracked when users interact with HubSpot forms. These events are optimized for PostHog workflows and automation.

#### Form Modal Events

##### Form Modal Opened
- **Event**: `form_modal_opened`
- **When**: When the form modal is opened
- **Properties**:
  - `form_id`: HubSpot form ID
  - `form_name`: 'hubspot_integration_request'
  - `source`: Source of the modal (e.g., 'integrations_section')
  - `source1`: Specific trigger (e.g., 'request_integration_button')
  - `is_popup`: Boolean indicating if it's a popup

##### Form Modal Closed
- **Event**: `form_modal_closed`
- **When**: When the form modal is closed
- **Properties**:
  - `form_id`: HubSpot form ID
  - `form_name`: 'hubspot_integration_request'
  - `source`: Source of the modal
  - `source1`: Specific trigger
  - `is_popup`: Boolean indicating if it's a popup

#### Form Interaction Events

##### Form Viewed
- **Event**: `form_viewed`
- **When**: When a form is loaded and ready for interaction
- **Properties**:
  - `form_id`: HubSpot form ID
  - `form_name`: 'hubspot_integration_request'
  - `source`: Where the form was opened
  - `source1`: Specific trigger
  - `form_type`: 'hubspot'

##### Form Submit Attempted
- **Event**: `form_submit_attempted`
- **When**: When a user attempts to submit a form (before validation)
- **Properties**:
  - `form_id`: HubSpot form ID
  - `form_name`: 'hubspot_integration_request'
  - `source`: Source of the form
  - `source1`: Specific trigger
  - `form_type`: 'hubspot'

#### Form Submission Events

##### Form Submitted
- **Event**: `form_submitted`
- **When**: When a form is successfully submitted
- **Properties**:
  - `form_name`: 'hubspot_integration_request'
  - `form_id`: HubSpot form ID
  - `form_type`: 'hubspot'
  - `source`: Source of the form
  - `source1`: Specific trigger
  - `has_email`: Boolean indicating if email was provided
  - `has_name`: Boolean indicating if name was provided
  - `has_phone`: Boolean indicating if phone was provided
  - `field_count`: Number of fields filled
  - `form_data`: Sanitized form data (excludes sensitive fields)

##### Form Submission Success (Workflow-Optimized)
- **Event**: `form_submission_success`
- **When**: After successful form submission (optimized for workflows)
- **Properties**:
  - `form_id`: HubSpot form ID
  - `form_name`: 'hubspot_integration_request'
  - `form_type`: 'hubspot'
  - `source`: Source of the form
  - `source1`: Specific trigger
  - `user_email`: User's email (if provided)
  - `user_name`: User's name (if provided)
  - `submission_timestamp`: ISO timestamp of submission
- **Note**: This is the **primary event for PostHog workflows** - use this for automation

#### User Identification

When a form is submitted with an email, the user is automatically identified in PostHog with:
- **User ID**: Email address
- **User Properties**:
  - `email`: User's email
  - `name`: User's name (if provided)
  - `phone`: User's phone (if provided)
  - `form_source`: Source of the form
  - `form_source1`: Specific trigger
  - `last_seen`: Timestamp
  - `platform`: 'web'

## Event Categories

Your events can be categorized as follows:

### 1. User Engagement
- Page views
- Page leaves
- Navigation link clicks

### 2. Conversion Funnel
- All "Schedule a Walkthrough" buttons
- App Store downloads
- Feature exploration (tab clicks)
- Form submissions (`form_submission_success`)
- Form modal interactions

### 3. User Interest
- Feature tab selections
- Integration exploration
- FAQ category selections (when implemented)

### 4. Social & Downloads
- Social media clicks
- App Store clicks

### 5. Legal & Compliance
- Privacy policy clicks
- Terms of service clicks

## Analytics Insights You Can Get

With these events, you can answer questions like:

1. **Which CTA is most effective?**
   - Compare clicks on hero_cta, header_cta, footer_cta, and various section-specific CTAs

2. **Where do users click most?**
   - Analyze location property to see if users prefer header, hero, or footer CTAs

3. **Which features generate interest?**
   - Track which feature tabs users click most frequently

4. **How do users navigate?**
   - Compare desktop header navigation vs mobile menu usage

5. **What drives conversions?**
   - See which sections have the highest "Schedule a Walkthrough" click rates

6. **Form conversion rates?**
   - Track form views → submissions conversion
   - Identify form abandonment points
   - Measure source effectiveness

7. **User identification and workflows?**
   - Track identified users from form submissions
   - Set up automated workflows based on form events
   - Measure workflow effectiveness

## Next Steps

1. **Set up your PostHog API key**:
   - Create a `.env.local` file in your project root
   - Add `NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here`
   - Add `NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com`

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Test the tracking**:
   - Navigate through the site
   - Click buttons and links
   - Check the browser console for "PostHog loaded" message
   - View events in your [PostHog dashboard](https://us.posthog.com/project/208876)

4. **Create Custom Dashboards**:
   - Build funnels for conversion tracking
   - Create heatmaps to see user behavior
   - Set up alerts for important events

5. **A/B Testing**:
   - Use PostHog's feature flags to test different CTA copy
   - Test different button placements
   - Optimize conversion rates

## PostHog Features You Can Use

- **Session Recordings**: See exactly how users interact with your site
- **Feature Flags**: Test new features safely
- **Funnels**: Track conversion paths
- **Cohorts**: Segment users based on behavior
- **Insights**: Build custom analytics queries
- **Alerts**: Get notified of important events

For more information, see:
- Complete setup guide: `POSTHOG_SETUP.md`
- Workflows and automation: `POSTHOG_WORKFLOWS.md`

