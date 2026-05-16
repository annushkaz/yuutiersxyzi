import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import {
  LegalLayout,
  LegalSection,
  LegalCallout,
  KVTable,
  StatRow,
} from '@/components/legal/legal-layout'

export const metadata = {
  title: 'Privacy Policy | YuuTiers',
  description:
    'How YuuTiers handles your data — spoiler: we barely touch any. A privacy policy written for humans.',
}

const sections = [
  { id: 'tldr', title: 'TL;DR' },
  { id: 'philosophy', title: 'Our philosophy' },
  { id: 'what-we-collect', title: 'What we collect' },
  { id: 'what-we-dont', title: "What we don't collect" },
  { id: 'how-we-use', title: 'How we use data' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'logs', title: 'Server logs' },
  { id: 'third-parties', title: 'Third-party services' },
  { id: 'analytics', title: 'Analytics' },
  { id: 'storage', title: 'Storage & security' },
  { id: 'retention', title: 'Retention' },
  { id: 'rights', title: 'Your rights' },
  { id: 'children', title: "Children's privacy" },
  { id: 'international', title: 'International users' },
  { id: 'changes', title: 'Changes to this policy' },
  { id: 'contact', title: 'Contact' },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-24 pb-24">
        <LegalLayout
          eyebrow="Legal · Privacy"
          title="Privacy Policy"
          subtitle="The most boring privacy policy on the internet — because there is almost nothing to say. We barely touch your data, and we never sell it."
          updated="Last updated · May 15, 2026"
          heroImage="/legal/privacy-hero.jpg"
          heroAccent="#22c55e"
          icon="lock"
          sections={sections}
        >
          <LegalSection id="tldr" title="TL;DR">
            <StatRow
              items={[
                { value: '0', label: 'Accounts required', accent: '#22c55e' },
                { value: '0', label: 'Trackers loaded', accent: '#22c55e' },
                { value: '0', label: 'Sold data points', accent: '#22c55e' },
                { value: '1', label: 'Cookie (theme)', accent: '#3b82f6' },
              ]}
            />
            <LegalCallout title="The short version" tone="success">
              <p>
                We don&apos;t require an account. We don&apos;t run trackers.
                We don&apos;t sell anything. We don&apos;t fingerprint you.
              </p>
              <p>
                What you search for is sent live to public Minecraft APIs and
                then forgotten. The only thing we remember about you is your
                theme preference, stored locally in your browser.
              </p>
            </LegalCallout>
          </LegalSection>

          <LegalSection id="philosophy" number="01" title="Our philosophy">
            <p>
              YuuTiers was designed from day one to be useful{' '}
              <strong>without surveillance</strong>. The web has too many
              services that treat your behaviour as the product. We didn&apos;t
              want to build another one.
            </p>
            <p>
              Our rule is simple: collect the absolute minimum required for
              the Service to work, keep it for the absolute minimum time, and
              <strong> never share or sell</strong> what we do briefly touch.
            </p>
          </LegalSection>

          <LegalSection id="what-we-collect" number="02" title="What we collect">
            <p>
              Because there are no accounts, no profiles, and no logins, the
              data we briefly process is intentionally tiny:
            </p>
            <KVTable
              rows={[
                {
                  k: 'Search queries',
                  v: 'Usernames, UUIDs and server IPs you type into search are forwarded to the relevant public Minecraft API in real time, then discarded. We do not log them on our servers.',
                },
                {
                  k: 'Device info',
                  v: 'Standard HTTP request metadata (user-agent, language, viewport) used by the runtime to render the page correctly. Not stored.',
                },
                {
                  k: 'IP address',
                  v: 'Briefly observed by our edge network for routing and abuse prevention. Rotated and discarded automatically.',
                },
                {
                  k: 'Theme preference',
                  v: 'Stored locally in your browser (localStorage). Never sent to us.',
                },
              ]}
            />
          </LegalSection>

          <LegalSection id="what-we-dont" number="03" title="What we never collect">
            <p>
              For the avoidance of any doubt, YuuTiers does{' '}
              <strong>not</strong> collect, store or have the ability to look
              up any of the following:
            </p>
            <ul>
              <li>Your real name, email, address or phone number</li>
              <li>Your Minecraft password, login session or 2FA codes</li>
              <li>Your payment information, billing address or card data</li>
              <li>A persistent identifier or browser fingerprint</li>
              <li>Cross-site browsing behaviour or advertising signals</li>
              <li>Microphone, camera, location or device sensor data</li>
              <li>Friends lists or social graphs from any platform</li>
            </ul>
            <LegalCallout title="No accounts means no leaks" tone="info">
              The single best privacy guarantee a website can give you is{' '}
              <strong>not having a database of users in the first place</strong>.
              That&apos;s our entire model.
            </LegalCallout>
          </LegalSection>

          <LegalSection id="how-we-use" number="04" title="How we use the data we briefly touch">
            <p>The minimal data we touch is used exclusively to:</p>
            <ul>
              <li>Render the page you requested and serve cached assets</li>
              <li>Forward your search to the relevant public Minecraft API</li>
              <li>Detect and stop abusive traffic patterns (bots, scrapers)</li>
              <li>Aggregate anonymous, page-level traffic counts</li>
            </ul>
            <p>
              We never use it for advertising, profiling, training models, or
              any kind of personalised data brokering.
            </p>
          </LegalSection>

          <LegalSection id="cookies" number="05" title="Cookies">
            <p>
              We don&apos;t use tracking, advertising or third-party cookies of
              any kind. We use exactly one piece of client-side storage:
            </p>
            <KVTable
              rows={[
                {
                  k: 'yuu-theme',
                  v: 'localStorage. Remembers whether you prefer dark or light. Never sent over the network.',
                },
              ]}
            />
            <p>
              No banner, no consent dance, no &quot;legitimate interest&quot;
              nonsense — because there is nothing of yours to consent over.
            </p>
          </LegalSection>

          <LegalSection id="logs" number="06" title="Server logs">
            <p>
              Like every web service on earth, our edge provider (Vercel) may
              briefly write standard request logs containing the timestamp,
              method, path, response code and source IP of each request. These
              logs are:
            </p>
            <ul>
              <li>Used only for debugging, performance monitoring and abuse prevention</li>
              <li>Rotated automatically by our infrastructure provider</li>
              <li>Never linked to a personal identity</li>
              <li>Never shared with third parties for marketing purposes</li>
            </ul>
          </LegalSection>

          <LegalSection id="third-parties" number="07" title="Third-party services">
            <p>
              When you use YuuTiers, your browser (or our edge proxy) may
              communicate with the following public APIs to fetch the data you
              requested:
            </p>
            <KVTable
              rows={[
                {
                  k: 'Mojang / Microsoft',
                  v: 'Player profiles, skins, capes, name history, official news.',
                },
                { k: 'Crafatar / mc-heads.net', v: 'Avatar, head and body renders from a UUID.' },
                { k: 'mcsrvstat.us', v: 'Live Minecraft server status and MOTD.' },
                { k: 'Modrinth', v: 'Mod and resource pack metadata for the wiki.' },
                { k: 'Crafty.gg', v: 'Extended name history when Mojang gates the data.' },
              ]}
            />
            <p>
              Each of these services has its own privacy policy and may log
              request metadata on their end. If that&apos;s a concern, we
              recommend reviewing their respective policies. We have no
              control over their data handling.
            </p>
          </LegalSection>

          <LegalSection id="analytics" number="08" title="Analytics">
            <p>
              We use <strong>privacy-friendly, aggregate analytics</strong> to
              count things like &quot;how many people viewed the home page
              today&quot;. The analytics provider we use:
            </p>
            <ul>
              <li>Does not place a tracking cookie</li>
              <li>Does not collect personal data or cross-site behaviour</li>
              <li>Does not fingerprint your device</li>
              <li>Does not sell or share data with third parties</li>
            </ul>
            <p>
              The result is a single anonymous counter per page. If even that
              bothers you, a tracker-blocking extension will eliminate it
              entirely without breaking the site.
            </p>
          </LegalSection>

          <LegalSection id="storage" number="09" title="Storage & security">
            <p>
              Because we don&apos;t collect personal data, we don&apos;t store
              personal data. The little we touch in flight is protected by:
            </p>
            <ul>
              <li>End-to-end TLS 1.3 encryption between you, us, and upstream APIs</li>
              <li>HSTS, strict CSP, X-Frame-Options and other modern security headers</li>
              <li>Edge-only request handling — there is no traditional database to breach</li>
              <li>Regular dependency audits and automated security updates</li>
            </ul>
            <LegalCallout title="Responsible disclosure" tone="info">
              If you believe you&apos;ve found a security issue affecting
              YuuTiers, please email{' '}
              <strong>security@yuutiers.xyz</strong> instead of opening a public
              issue. We&apos;ll acknowledge within 72 hours.
            </LegalCallout>
          </LegalSection>

          <LegalSection id="retention" number="10" title="Data retention">
            <p>
              Since we hold practically no personal data, retention is short by
              default:
            </p>
            <KVTable
              rows={[
                { k: 'Search queries', v: 'Not stored — forwarded and forgotten.' },
                { k: 'IP-level abuse signals', v: 'Up to 30 days, then purged.' },
                { k: 'Aggregate analytics', v: 'Indefinite, but anonymous and non-identifying.' },
                { k: 'Contact-form submissions', v: 'Stored only as long as needed to respond, then deleted.' },
              ]}
            />
          </LegalSection>

          <LegalSection id="rights" number="11" title="Your rights">
            <p>
              Even though we hold essentially nothing about you, you still
              have rights under privacy laws such as the GDPR (EU/EEA), UK GDPR
              and CCPA (California). These include:
            </p>
            <ul>
              <li><strong>Access</strong> — request a copy of any data we hold about you</li>
              <li><strong>Rectification</strong> — request that we correct inaccurate data</li>
              <li><strong>Erasure</strong> — request deletion of any data we hold</li>
              <li><strong>Objection</strong> — object to processing on legitimate-interest grounds</li>
              <li><strong>Portability</strong> — request your data in a machine-readable format</li>
              <li><strong>Complaint</strong> — lodge a complaint with your local data protection authority</li>
            </ul>
            <p>
              To exercise any of these rights, email{' '}
              <strong>privacy@yuutiers.xyz</strong>. We&apos;ll respond within
              30 days. In most cases our reply will be a polite confirmation
              that we have nothing on you, but the right exists regardless.
            </p>
          </LegalSection>

          <LegalSection id="children" number="12" title="Children's privacy">
            <p>
              YuuTiers is suitable for a general audience and contains no adult
              content. We do not knowingly collect personal information from
              children under the age of digital consent in their jurisdiction
              (13 in most countries, 16 in the EEA / UK).
            </p>
            <p>
              If you are a parent or guardian and believe a child has somehow
              submitted personal data to us via the contact form, please email{' '}
              <strong>privacy@yuutiers.xyz</strong> and we will promptly delete
              it.
            </p>
          </LegalSection>

          <LegalSection id="international" number="13" title="International users">
            <p>
              YuuTiers is operated from the European Union and served globally
              via Vercel&apos;s edge network. By using the Service from outside
              the EU, you understand that any technical metadata your browser
              transmits may be processed in regions other than your own,
              including the United States.
            </p>
            <p>
              All such processing is limited to the minimal request metadata
              described above and is governed by this policy regardless of the
              region in which it occurs.
            </p>
          </LegalSection>

          <LegalSection id="changes" number="14" title="Changes to this policy">
            <p>
              We may update this Privacy Policy as the Service evolves. The
              &quot;Last updated&quot; date at the top will always reflect the
              most recent revision. Material changes will be highlighted on the
              home page or via a banner at the top of this page for a
              reasonable period.
            </p>
            <p>
              We will never weaken the protections described here without
              giving you clear, prominent notice and a reasonable chance to
              object.
            </p>
          </LegalSection>

          <LegalSection id="contact" number="15" title="Contact us">
            <p>
              Privacy questions, requests, or just curiosity — please reach
              out. We&apos;re a small team and we genuinely read everything.
            </p>
            <KVTable
              rows={[
                { k: 'Privacy queries', v: 'privacy@yuutiers.xyz' },
                { k: 'Security disclosures', v: 'security@yuutiers.xyz' },
                {
                  k: 'Contact form',
                  v: <Link href="/contact">/contact</Link>,
                },
                {
                  k: 'Team page',
                  v: <Link href="/team">/team</Link>,
                },
              ]}
            />
            <LegalCallout title="Thanks for caring about your data" tone="success">
              The fact that you read a privacy policy at all puts you in a
              tiny, lovely minority. Welcome.
            </LegalCallout>
          </LegalSection>
        </LegalLayout>
      </main>
      <Footer />
    </div>
  )
}
