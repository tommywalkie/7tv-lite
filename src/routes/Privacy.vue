<template>
  <div class="max-w-3xl mx-auto px-4 py-8 text-left">
    <ReturnHome />

    <h1 class="text-2xl font-bold mb-6 mt-4">Privacy Policy</h1>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Overview</h2>
      <p class="mb-4">
        This privacy policy explains how we handle your data when you use our service, that is currently hosted at
        <a href="https://7tv-lite.tommywalkie.com" target="_blank" rel="noopener noreferrer">
          7tv-lite.tommywalkie.com</a
        >.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Analytics</h2>
      <p class="mb-4">
        We use Umami, a privacy-focused analytics service hosted on our server, to collect anonymous usage data.
      </p>
      <h3 class="text-lg font-semibold mb-2">What we collect:</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>Page URL, hostname, and title</li>
        <li>Referrer URL</li>
        <li>Browser name and language</li>
        <li>Operating system</li>
        <li>Device type and screen dimensions</li>
        <li>Country, region, and city (derived from IP address, which is never stored)</li>
        <li>Session metrics (visits, pageviews, bounce rate, duration)</li>
        <li>UTM and query parameters</li>
      </ul>
      <h3 class="text-lg font-semibold mb-2">What we don't collect:</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>IP addresses (used temporarily for geolocation only, never stored)</li>
        <li>Cookies (Umami's tracker is cookie-free)</li>
        <li>Browser fingerprinting</li>
        <li>Search queries</li>
        <li>Personal information (names, emails, etc.)</li>
        <li>Cross-site tracking or persistent identifiers</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Third-Party Services</h2>
      <p class="mb-4">We use the following third-party services:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>
          <strong>7TV API:</strong> Used to fetch emotes. Please refer to
          <a href="https://7tv.app/legal/privacy" target="_blank" rel="noopener noreferrer">7TV's privacy policy</a> for
          their data handling practices.
        </li>
        <li>
          <strong>Umami:</strong> Privacy-focused analytics.
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Contact</h2>
      <p>
        For privacy-related questions, you can reach out via
        <a href="https://github.com/tommywalkie/7tv-lite/issues" target="_blank" rel="noopener noreferrer"
          >GitHub Issues</a
        >.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import ReturnHome from '../components/ReturnHome.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Privacy Policy - 7TV Lite',
})
</script>
