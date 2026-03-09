import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Primal Agri',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="bg-[#00401A] text-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Primal Agri</Link>
        <span className="text-green-300 text-sm">Privacy Policy</span>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: March 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Primal Agri (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Primal Agri mobile application.
              This Privacy Policy explains how we collect, use, and protect your personal information
              when you use our app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Phone number</strong> — used for account creation and to allow buyers to contact you</li>
              <li><strong>Full name</strong> — displayed on your public profile</li>
              <li><strong>Location (province and district)</strong> — used to show relevant local listings</li>
              <li><strong>Photos</strong> — images you upload when posting a listing</li>
              <li><strong>Email address</strong> — if you sign in with Google</li>
              <li><strong>Listing data</strong> — titles, descriptions, prices, and category information for ads you post</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and manage your account</li>
              <li>To display your listings to other users</li>
              <li>To allow buyers to contact you via phone or WhatsApp</li>
              <li>To send push notifications about listings relevant to your location and interests</li>
              <li>To improve the app and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Information Sharing</h2>
            <p>
              We do <strong>not</strong> sell your personal information to third parties.
              Your phone number and name are visible to other app users when you post a listing,
              so that buyers can contact you directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Storage</h2>
            <p>
              Your data is stored securely on Supabase (PostgreSQL) servers. Photos are stored
              in Supabase Storage. All data is encrypted in transit using HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Permissions We Request</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Camera</strong> — to take photos for your listings</li>
              <li><strong>Photo library</strong> — to select photos from your phone for listings</li>
              <li><strong>Notifications</strong> — to alert you about new listings in your area or category</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Data Retention</h2>
            <p>
              Your account and listings are retained as long as your account is active.
              Listings automatically expire after 30 days and can be relisted.
              You may delete your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Children&apos;s Privacy</h2>
            <p>
              Primal Agri is not intended for users under the age of 18. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data
              by contacting us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:
            </p>
            <p className="mt-2">
              <a href="mailto:info@primalagri.com" className="text-[#00401A] font-semibold hover:underline">
                info@primalagri.com
              </a>
            </p>
          </section>

        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 px-6 py-6 text-center text-sm">
        <Link href="/" className="hover:text-white transition">← Back to Primal Agri</Link>
      </footer>
    </main>
  );
}
