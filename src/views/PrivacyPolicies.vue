<template>
  <div class="privacy-policy">
    <h1>Privacy Policy – Jeannot</h1>

    <p class="last-updated"><strong>Last updated: May 11, 2025</strong></p>

    <p>
      The mobile application <strong>Jeannot</strong> is developed by <strong><a href="https://gaiadet.com"
          target="_blank" rel="noopener">Gaiadet SAS</a></strong>.
      This privacy policy explains what data we collect, how we use it, and with whom it may be shared.
    </p>

    <hr>

    <section>
      <h2>1. Data Collected</h2>
      <p>The Jeannot app collects the following data:</p>

      <h3>Personal Data</h3>
      <ul>
        <li><strong>Email address</strong> – Used to create and manage user accounts and to communicate with users.</li>
        <li><strong>Garden location</strong> – Provided by the user to personalize the app experience.</li>
      </ul>

      <h3>Technical and Usage Data</h3>
      <ul>
        <li><strong>Device ID</strong></li>
        <li><strong>User UUID</strong> (a non-personal internal identifier)</li>
        <li><strong>App usage data</strong> (interactions, feature usage, in-app events)</li>
      </ul>
    </section>

    <hr>

    <section>
      <h2>2. Purpose of Data Collection</h2>
      <p>Data is collected to:</p>
      <ul>
        <li>Provide, maintain, and improve the app</li>
        <li>Personalize the user experience</li>
        <li>Analyze app usage and understand user behavior</li>
        <li>Detect, diagnose, and fix bugs or technical issues</li>
      </ul>
    </section>

    <hr>

    <section>
      <h2>3. Data Sharing</h2>
      <h3>Third-party Services</h3>

      <div class="service">
        <h4>🔹 Amplitude</h4>
        <p>Amplitude is a product analytics service used to track user behavior in the app. Data shared with Amplitude
          may include:</p>
        <ul>
          <li>User UUID</li>
          <li>Location (if available)</li>
          <li>IP address</li>
          <li>Device and platform information</li>
        </ul>
        <a href="https://amplitude.com/privacy" target="_blank" rel="noopener">Amplitude Privacy Policy</a>
      </div>

      <div class="service">
        <h4>🔹 Sentry</h4>
        <p>Sentry is an error monitoring tool used to report crashes and bugs. Information shared with Sentry may
          include:</p>
        <ul>
          <li>User UUID</li>
          <li>Device information</li>
          <li>Error logs</li>
        </ul>
        <a href="https://sentry.io/privacy/" target="_blank" rel="noopener">Sentry Privacy Policy</a>
      </div>

      <div class="service">
        <h4>🔹 Language Model Providers (e.g., OpenAI)</h4>
        <p>
          If you interact with features such as a <strong>chatbot</strong> or any conversational assistant within the
          app,
          certain inputs may be transmitted to third-party language model providers (e.g., <strong>OpenAI</strong>) in
          order to generate responses.
        </p>
        <p>The following data <strong>may be processed</strong>:</p>
        <ul>
          <li>Text content of your messages or questions</li>
          <li>Technical metadata (e.g., timestamp, device/platform)</li>
          <li>Geolocation or contextual information you provide during the conversation</li>
        </ul>
        <p>
          These providers <strong>may retain data</strong> to monitor misuse, improve their services, or comply with
          legal obligations,
          in accordance with their own privacy policies.
        </p>
        <div class="note">
          <p><strong>Note:</strong> We take steps to minimize the amount of personal information shared in this context.
            However, <strong>you should avoid submitting sensitive personal data</strong> when interacting with AI
            features.</p>
        </div>
        <a href="https://openai.com/privacy" target="_blank" rel="noopener">OpenAI Privacy Policy</a>
      </div>
    </section>

    <hr>

    <section>
      <h2>4. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your data against unauthorized access,
        alteration, disclosure, or destruction.
      </p>
    </section>

    <hr>

    <section>
      <h2>5. Data Retention</h2>
      <p>
        We retain data only as long as necessary to fulfill the purposes described in this policy or to comply with
        legal
        obligations.
      </p>
    </section>

    <hr>

    <section>
      <h2>6. User Rights</h2>
      <p>If you are a resident of the European Economic Area (EEA), you have the right to:</p>
      <ul>
        <li>Access your data</li>
        <li>Request correction or deletion</li>
        <li>Restrict or object to processing</li>
      </ul>
      <p>To exercise these rights or for any questions, please contact us at:</p>
      <p>📧 <strong>contact@jeannot.app</strong></p>
    </section>

    <hr>

    <section>
      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Significant changes will be communicated through the app. The "last
        updated" date at the top reflects the most recent changes.
      </p>
    </section>

    <hr>

    <section>
      <h2>8. Contact</h2>
      <p><strong>Data Controller:</strong></p>
      <p>Gaiadet SAS<br>
        contact@jeannot.app</p>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PrivacyPolicies'
}
</script>

<style scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
}

h3 {
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem;
}

h4 {
  font-size: 1.1rem;
  margin: 1.2rem 0 0.8rem;
}

.last-updated {
  color: #666;
  margin-bottom: 2rem;
}

hr {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #eee;
}

ul {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

li {
  margin-bottom: 0.5rem;
}

.service {
  margin: 2rem 0;
}

.note {
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
  padding: 1rem;
  margin: 1rem 0;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

strong {
  font-weight: 600;
}
</style>
