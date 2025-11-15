// instrumentation.ts
// This file runs on the server side only
// For client-side PostHog initialization, see PostHogProvider.tsx

export async function register() {
  // Server-side instrumentation code can go here
  // Note: PostHog client-side initialization happens in PostHogProvider.tsx
  // because instrumentation.ts runs on the server, not in the browser
}

