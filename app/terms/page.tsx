import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import {
  LegalLayout,
  LegalSection,
  LegalCallout,
  KVTable,
} from '@/components/legal/legal-layout'

export const metadata = {
  title: 'Terms of Service | YuuTiers',
  description:
    'The plain-English terms governing your use of YuuTiers.xyz — short, fair, and written by humans.',
}

const sections = [
  { id: 'tldr', title: 'TL;DR' },
  { id: 'acceptance', title: 'Acceptance' },
  { id: 'service', title: 'The Service' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'permitted-use', title: 'Permitted use' },
  { id: 'prohibited-use', title: 'Prohibited use' },
  { id: 'api-access', title: 'API access' },
  { id: 'content', title: 'Third-party content' },
  { id: 'ip', title: 'Intellectual property' },
  { id: 'trademarks', title: 'Trademarks & Mojang' },
  { id: 'availability', title: 'Availability' },
  { id: 'warranties', title: 'Disclaimers' },
  { id: 'liability', title: 'Limitation of liability' },
  { id: 'indemnity', title: 'Indemnity' },
  { id: 'termination', title: 'Termination' },
  { id: 'changes', title: 'Changes to terms' },
  { id: 'law', title: 'Governing law' },
  { id: 'contact', title: 'Contact' },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-24 pb-24">
        <LegalLayout
          eyebrow="Legal · Terms"
          title="Terms of Service"
          subtitle="The plain rules of the road for using YuuTiers.xyz. We've kept the legal where it has to be, and explained the rest like humans."
          updated="Last updated · May 15, 2026"
          heroImage="/legal/terms-hero.jpg"
          heroAccent="#a78bfa"
          icon="scale"
          sections={sections}
        >
          <LegalSection id="tldr" title="TL;DR">
            <LegalCallout title="The whole thing in 6 lines" tone="info">
              <p>
                <strong>Use YuuTiers like a decent human</strong> — don&apos;t
                spam it, don&apos;t scrape it into oblivion, and don&apos;t
                claim to be us.
              </p>
              <p>
                We provide the Service <strong>as-is</strong>, we&apos;re{' '}
                <strong>not affiliated with Mojang or Microsoft</strong>, and
                we&apos;re not responsible for what third-party APIs (Mojang,
                Crafatar, mcsrvstat) say or do.
              </p>
            </LegalCallout>
          </LegalSection>

          <LegalSection id="acceptance" number="01" title="Acceptance of these Terms">
            <p>
              By accessing or using <strong>YuuTiers.xyz</strong> (the
              &quot;Service&quot;), you confirm that you have read, understood,
              and agreed to be bound by these Terms of Service (the
              &quot;Terms&quot;). If you do not agree with any part of these
              Terms, your only remedy is to stop using the Service.
            </p>
            <p>
              These Terms form a legal agreement between you (&quot;you&quot;,
              &quot;the user&quot;) and the operators of YuuTiers (collectively
              &quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
            </p>
          </LegalSection>

          <LegalSection id="service" number="02" title="Description of the Service">
            <p>
              YuuTiers is a free, community-built web platform that aggregates
              and presents publicly available information about the video game
              Minecraft. The Service includes, without limitation:
            </p>
            <ul>
              <li>Player profile lookups, skin and cape rendering, and name history</li>
              <li>Server status, MOTD parsing, and ping checks</li>
              <li>Live news, snapshots, and release notes from official Mojang sources</li>
              <li>A documentation wiki covering the Overworld, Nether, and End dimensions</li>
              <li>A public, rate-limited HTTP API mirroring the above features</li>
            </ul>
            <p>
              The Service does not host the Minecraft game, Minecraft accounts,
              servers, or paid downloadable content of any kind.
            </p>
          </LegalSection>

          <LegalSection id="eligibility" number="03" title="Eligibility">
            <p>
              YuuTiers is intended for a general audience. By using the Service
              you represent that:
            </p>
            <ul>
              <li>You are at least the age of digital consent in your jurisdiction (13 in most countries, 16 in the EEA / UK)</li>
              <li>You have the legal capacity to enter into a binding agreement</li>
              <li>You are not barred from receiving the Service under applicable law</li>
            </ul>
          </LegalSection>

          <LegalSection id="permitted-use" number="04" title="Permitted use">
            <p>You may use the Service to:</p>
            <ul>
              <li>Look up your own and others&apos; public Minecraft profiles</li>
              <li>Download skins and capes for personal use, in compliance with Mojang&apos;s rules</li>
              <li>Check the live status of public Minecraft servers</li>
              <li>Read and share our documentation and articles</li>
              <li>Integrate our public API into personal, educational, or non-commercial projects, subject to the rate limits</li>
            </ul>
          </LegalSection>

          <LegalSection id="prohibited-use" number="05" title="Prohibited use">
            <p>You agree <strong>not</strong> to:</p>
            <ul>
              <li>Use the Service for any unlawful, fraudulent or malicious purpose</li>
              <li>Attempt to gain unauthorized access to the Service, its servers, or related systems</li>
              <li>Probe, scan, or test the vulnerability of the Service without our express written permission</li>
              <li>Interfere with, disrupt, or impose an unreasonable load on the Service or its infrastructure</li>
              <li>Scrape, harvest or extract data in a manner that violates the rate limits or other safeguards</li>
              <li>Use bots, scripts or automated agents to circumvent caching, rate limits or anti-abuse measures</li>
              <li>Reverse engineer, decompile or disassemble any part of the Service</li>
              <li>Resell, sublicense or commercially exploit the Service or its content without permission</li>
              <li>Impersonate any person or entity, including YuuTiers staff or other community members</li>
              <li>Use the Service to harass, dox, defame or otherwise harm any individual</li>
            </ul>
            <LegalCallout title="Abuse means a ban" tone="warn">
              Repeated or severe violations may result in an IP-level block,
              API key revocation, or — in extreme cases — a referral to law
              enforcement. We&apos;d rather not, so please don&apos;t make us.
            </LegalCallout>
          </LegalSection>

          <LegalSection id="api-access" number="06" title="API access">
            <p>
              Our public API is offered <strong>at our discretion</strong>,
              free of charge, with reasonable rate limits documented in the{' '}
              <Link href="/docs/api">developer docs</Link>. By using the API you
              agree to:
            </p>
            <ul>
              <li>Respect the published rate limits and back off on 429 responses</li>
              <li>Send a descriptive <code>User-Agent</code> identifying your app and contact info</li>
              <li>Cache responses where possible and avoid hammering endpoints in tight loops</li>
              <li>Not use the API to power a service that competes directly with YuuTiers</li>
            </ul>
            <p>
              We reserve the right to revoke API access at any time, with or
              without notice, especially in response to abuse.
            </p>
          </LegalSection>

          <LegalSection id="content" number="07" title="Third-party content">
            <p>
              The data YuuTiers displays is fetched in real time from public
              third-party sources, including but not limited to:
            </p>
            <ul>
              <li>Mojang / Microsoft public APIs</li>
              <li>Crafatar and mc-heads.net</li>
              <li>mcsrvstat.us</li>
              <li>Modrinth</li>
              <li>Crafty.gg</li>
            </ul>
            <p>
              We do not control, endorse, or guarantee the accuracy,
              completeness, legality or availability of any third-party
              content. Your use of third-party content is at your own risk and
              subject to the terms of the respective providers.
            </p>
          </LegalSection>

          <LegalSection id="ip" number="08" title="Intellectual property">
            <p>
              The YuuTiers brand, design system, original code, illustrations,
              writing and curated wiki content are © {new Date().getFullYear()} the
              YuuTiers team, all rights reserved.
            </p>
            <p>
              You may not copy, redistribute or create derivative works of our
              original content without prior written permission, except as
              expressly allowed by these Terms or by law (e.g. fair use).
            </p>
            <p>
              User-submitted content (such as suggestions sent via the contact
              form) is licensed to us on a worldwide, royalty-free,
              non-exclusive basis to use, modify and incorporate into the
              Service.
            </p>
          </LegalSection>

          <LegalSection id="trademarks" number="09" title="Trademarks & Mojang">
            <LegalCallout title="Important disclaimer" tone="warn">
              YuuTiers is an <strong>independent fan-made project</strong>. We
              are <strong>not affiliated with, endorsed, sponsored, or
              specifically approved by Mojang AB, Microsoft Corporation</strong>,
              or any of their subsidiaries or partners.
            </LegalCallout>
            <KVTable
              rows={[
                {
                  k: 'Minecraft',
                  v: 'Trademark of Mojang Synergies AB.',
                },
                {
                  k: 'Minecraft logo',
                  v: 'Trademark of Mojang Synergies AB.',
                },
                {
                  k: 'In-game art',
                  v: 'Property of Mojang AB / Microsoft Corporation.',
                },
                {
                  k: 'YuuTiers brand',
                  v: 'Trademark and design of the YuuTiers team.',
                },
              ]}
            />
            <p>
              All other trademarks, service marks, product names and logos are
              the property of their respective owners.
            </p>
          </LegalSection>

          <LegalSection id="availability" number="10" title="Availability & changes">
            <p>
              We aim for high availability but{' '}
              <strong>do not guarantee uninterrupted service</strong>. The
              Service may be unavailable due to maintenance, third-party
              outages, network conditions, or events beyond our control.
            </p>
            <p>
              We reserve the right to add, modify, suspend or discontinue any
              feature of the Service at any time, with or without notice. We
              are not liable for any inconvenience or loss caused by such
              changes.
            </p>
          </LegalSection>

          <LegalSection id="warranties" number="11" title="Disclaimer of warranties">
            <p className="uppercase tracking-wide text-[12px] text-[#5a5a76] font-semibold">
              The following is intentionally written in legal-speak.
            </p>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
              EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              NON-INFRINGEMENT, OR ACCURACY. WE DO NOT WARRANT THAT THE SERVICE
              WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR
              OTHER HARMFUL COMPONENTS.
            </p>
          </LegalSection>

          <LegalSection id="liability" number="12" title="Limitation of liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL
              YUUTIERS OR ITS OPERATORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF
              PROFITS, REVENUE, DATA, USE, GOODWILL OR OTHER INTANGIBLE LOSSES,
              ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF
              THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF
              SUCH DAMAGES.
            </p>
            <p>
              In jurisdictions that do not allow the exclusion of certain
              warranties or limitations on liability, our liability is limited
              to the maximum extent permitted by law.
            </p>
          </LegalSection>

          <LegalSection id="indemnity" number="13" title="Indemnity">
            <p>
              You agree to indemnify and hold harmless YuuTiers, its operators,
              and contributors from and against any claims, liabilities,
              damages, losses and expenses (including reasonable legal fees)
              arising out of or in any way connected with:
            </p>
            <ul>
              <li>Your access to or use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of a third party</li>
            </ul>
          </LegalSection>

          <LegalSection id="termination" number="14" title="Termination">
            <p>
              We may suspend or terminate your access to the Service at any
              time, with or without cause, with or without notice, especially
              in cases of abuse, fraud or violation of these Terms. Sections
              that by their nature should survive termination (IP, disclaimers,
              limitation of liability, indemnity, governing law) will survive.
            </p>
          </LegalSection>

          <LegalSection id="changes" number="15" title="Changes to these Terms">
            <p>
              We may revise these Terms from time to time. The most current
              version will always be posted at this URL, with the &quot;Last
              updated&quot; date at the top reflecting the latest revision.
              Material changes will be highlighted on the home page or in a
              banner on this page for a reasonable period.
            </p>
            <p>
              Your continued use of the Service after changes become effective
              constitutes acceptance of the revised Terms.
            </p>
          </LegalSection>

          <LegalSection id="law" number="16" title="Governing law & disputes">
            <p>
              These Terms are governed by and construed in accordance with the
              laws applicable to the operators&apos; place of residence,
              without regard to conflict-of-law principles. Any dispute arising
              out of or relating to these Terms or the Service that cannot be
              resolved informally shall be resolved by the competent courts of
              that jurisdiction.
            </p>
            <p>
              Before initiating any formal proceeding, you agree to first
              contact us in good faith via the channels listed below and give
              us 30 days to attempt to resolve the issue amicably.
            </p>
          </LegalSection>

          <LegalSection id="contact" number="17" title="Contact us">
            <p>
              Questions, comments or formal notices regarding these Terms can
              be sent to:
            </p>
            <KVTable
              rows={[
                {
                  k: 'Contact form',
                  v: <Link href="/contact">/contact</Link>,
                },
                { k: 'Email', v: 'legal@yuutiers.xyz' },
                { k: 'Team page', v: <Link href="/team">/team</Link> },
              ]}
            />
            <LegalCallout title="Thanks for reading" tone="success">
              We genuinely appreciate that you got this far. Most people
              don&apos;t. Have fun on YuuTiers — and tell a friend.
            </LegalCallout>
          </LegalSection>
        </LegalLayout>
      </main>
      <Footer />
    </div>
  )
}
