# PostHog Workflows & Automation Setup Guide

This guide explains how to set up PostHog workflows and automation for form submissions and other events in your Zynva application.

## 📋 Overview

PostHog workflows allow you to automate actions based on user events. With the enhanced tracking setup, you can now:

- **Track form submissions** with detailed metadata
- **Identify users** automatically when they submit forms
- **Trigger workflows** based on form events
- **Schedule follow-up actions** based on user behavior
- **Send notifications** to your team when forms are submitted

## 🎯 Events Available for Workflows

### Form Events

#### 1. `form_viewed`
Triggered when a user views a form.

**Properties:**
- `form_id`: HubSpot form ID
- `form_name`: 'hubspot_integration_request'
- `source`: Where the form was opened (e.g., 'integrations_section')
- `source1`: Specific trigger (e.g., 'request_integration_button')
- `form_type`: 'hubspot'

**Use Cases:**
- Track form engagement
- Identify drop-off points
- A/B test form placements

#### 2. `form_submit_attempted`
Triggered when a user attempts to submit a form (before validation).

**Properties:**
- `form_id`: HubSpot form ID
- `form_name`: 'hubspot_integration_request'
- `source`: Source of the form
- `source1`: Specific trigger
- `form_type`: 'hubspot'

**Use Cases:**
- Track form abandonment
- Identify validation issues
- Measure form completion rates

#### 3. `form_submitted`
Triggered when a form is successfully submitted.

**Properties:**
- `form_id`: HubSpot form ID
- `form_name`: 'hubspot_integration_request'
- `form_type`: 'hubspot'
- `source`: Source of the form
- `source1`: Specific trigger
- `has_email`: Boolean indicating if email was provided
- `has_name`: Boolean indicating if name was provided
- `has_phone`: Boolean indicating if phone was provided
- `field_count`: Number of fields filled
- `form_data`: Sanitized form data (excludes sensitive fields)

**Use Cases:**
- Trigger welcome emails
- Notify sales team
- Create CRM records
- Schedule follow-up tasks

#### 4. `form_submission_success`
Triggered after successful form submission (optimized for workflows).

**Properties:**
- `form_id`: HubSpot form ID
- `form_name`: 'hubspot_integration_request'
- `form_type`: 'hubspot'
- `source`: Source of the form
- `source1`: Specific trigger
- `user_email`: User's email (if provided)
- `user_name`: User's name (if provided)
- `submission_timestamp`: ISO timestamp of submission

**Use Cases:**
- **Primary event for workflows** - Use this for automation
- Send confirmation emails
- Create tasks in project management tools
- Update user segments
- Trigger sales workflows

#### 5. `form_modal_opened`
Triggered when the form modal is opened.

**Properties:**
- `form_id`: HubSpot form ID
- `form_name`: 'hubspot_integration_request'
- `source`: Source of the modal
- `source1`: Specific trigger
- `is_popup`: Boolean indicating if it's a popup

**Use Cases:**
- Track modal engagement
- Measure conversion funnel
- A/B test modal designs

#### 6. `form_modal_closed`
Triggered when the form modal is closed.

**Properties:**
- `form_id`: HubSpot form ID
- `form_name`: 'hubspot_integration_request'
- `source`: Source of the modal
- `source1`: Specific trigger
- `is_popup`: Boolean indicating if it's a popup

**Use Cases:**
- Track modal abandonment
- Measure engagement time
- Identify optimization opportunities

## 🔧 Setting Up PostHog Workflows

### Step 1: Access PostHog Workflows

1. Go to your PostHog project: [https://us.posthog.com/project/208876](https://us.posthog.com/project/208876)
2. Navigate to **Workflows** in the left sidebar
3. Click **New Workflow**

### Step 2: Create a Form Submission Workflow

#### Example: Notify Team on Form Submission

1. **Trigger**: Select `form_submission_success` event
2. **Condition** (optional): 
   - `form_name` equals `hubspot_integration_request`
   - `has_email` equals `true`
3. **Action**: Choose from:
   - **Send Email**: Notify your team
   - **Webhook**: Send data to your CRM/backend
   - **Slack/Discord**: Send notification to team channel
   - **Create Task**: Create task in project management tool

#### Example: Send Welcome Email

1. **Trigger**: `form_submission_success`
2. **Condition**: `has_email` equals `true`
3. **Action**: Send email via your email service (via webhook)

#### Example: Create CRM Record

1. **Trigger**: `form_submission_success`
2. **Condition**: `has_email` equals `true`
3. **Action**: Webhook to your CRM API
   - Use `user_email`, `user_name`, `source`, `submission_timestamp` from event properties

### Step 3: Schedule Follow-up Actions

PostHog workflows can schedule actions based on time delays:

1. **Trigger**: `form_submission_success`
2. **Delay**: Wait 24 hours
3. **Condition**: Check if user hasn't engaged
4. **Action**: Send follow-up email or notification

## 📊 User Identification & Properties

When a form is submitted with an email, the user is automatically identified in PostHog with:

- **User ID**: Email address
- **Properties**:
  - `email`: User's email
  - `name`: User's name (if provided)
  - `phone`: User's phone (if provided)
  - `form_source`: Source of the form
  - `form_source1`: Specific trigger
  - `last_seen`: Timestamp
  - `platform`: 'web'

### Using User Properties in Workflows

You can use user properties in workflow conditions:

- `user.email` contains `@example.com`
- `user.form_source` equals `integrations_section`
- `user.last_seen` is within last 7 days

## 🔗 Webhook Integration

### Example Webhook Payload

When setting up webhooks in PostHog workflows, you'll receive:

```json
{
  "event": "form_submission_success",
  "properties": {
    "form_id": "abc123",
    "form_name": "hubspot_integration_request",
    "form_type": "hubspot",
    "source": "integrations_section",
    "source1": "request_integration_button",
    "user_email": "user@example.com",
    "user_name": "John Doe",
    "submission_timestamp": "2025-01-15T10:30:00.000Z"
  },
  "person": {
    "email": "user@example.com",
    "properties": {
      "name": "John Doe",
      "phone": "+1234567890",
      "form_source": "integrations_section"
    }
  }
}
```

### Webhook to Your Backend

Set up a webhook endpoint in your backend to receive form submissions:

```javascript
// Example: Express.js endpoint
app.post('/webhooks/posthog-form-submission', (req, res) => {
  const { event, properties, person } = req.body;
  
  if (event === 'form_submission_success') {
    // Process form submission
    const { user_email, user_name, source } = properties;
    
    // Create lead in your system
    createLead({
      email: user_email,
      name: user_name,
      source: source,
      timestamp: properties.submission_timestamp
    });
    
    // Send notification
    notifyTeam({
      message: `New form submission from ${user_email}`,
      source: source
    });
  }
  
  res.status(200).json({ success: true });
});
```

## 🎨 Advanced Workflow Examples

### 1. Lead Qualification Workflow

**Trigger**: `form_submission_success`

**Steps**:
1. Check if `user_email` contains specific domain (e.g., `@hospital.com`)
2. If yes → Create high-priority lead in CRM
3. If no → Create standard lead
4. Send appropriate notification to sales team

### 2. Multi-Step Follow-up Sequence

**Trigger**: `form_submission_success`

**Steps**:
1. Immediately: Send confirmation email
2. After 1 hour: Check if user visited pricing page
3. After 24 hours: Send follow-up email with case studies
4. After 7 days: Send demo invitation

### 3. Source-Based Routing

**Trigger**: `form_submission_success`

**Steps**:
1. Check `source` property
2. If `source` equals `integrations_section` → Route to integrations team
3. If `source` equals `hero_section` → Route to sales team
4. Send notification to appropriate team

### 4. Abandonment Recovery

**Trigger**: `form_modal_opened`

**Steps**:
1. Wait 5 minutes
2. Check if `form_submission_success` occurred
3. If not → Send reminder email (if email captured)
4. Track as `form_abandoned` event

## 📈 Analytics & Insights

### Funnel Analysis

Create a funnel in PostHog to track:

1. `form_modal_opened`
2. `form_viewed`
3. `form_submit_attempted`
4. `form_submission_success`

This helps you identify where users drop off in the form submission process.

### Cohort Analysis

Create cohorts based on:
- Form submission date
- Source of form (`source` property)
- User properties (email domain, etc.)

### Conversion Tracking

Track conversion rates:
- Modal opens → Form views
- Form views → Form submissions
- Form submissions → Qualified leads

## 🔐 Privacy & Compliance

All form data tracking:
- Excludes sensitive fields (passwords, SSN, credit cards)
- Only tracks non-sensitive form fields
- Respects user privacy
- Complies with GDPR/CCPA requirements

## 🚀 Next Steps

1. **Set up your first workflow**:
   - Go to PostHog → Workflows
   - Create workflow for `form_submission_success`
   - Add notification action

2. **Connect to your CRM**:
   - Set up webhook endpoint
   - Map PostHog event properties to CRM fields
   - Test the integration

3. **Create follow-up sequences**:
   - Set up email sequences
   - Schedule follow-up actions
   - Track engagement

4. **Monitor and optimize**:
   - Review workflow performance
   - A/B test different workflows
   - Optimize conversion rates

## 📚 Resources

- [PostHog Workflows Documentation](https://posthog.com/docs/workflows)
- [PostHog Webhooks Guide](https://posthog.com/docs/webhooks)
- [PostHog User Properties](https://posthog.com/docs/user-properties)
- [Your PostHog Project](https://us.posthog.com/project/208876)

## 🆘 Support

For questions or issues:
1. Check PostHog documentation
2. Review workflow logs in PostHog
3. Check browser console for tracking errors
4. Verify environment variables are set correctly

