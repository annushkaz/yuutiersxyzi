import Link from 'next/link'
import { Github } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import {
  LegalLayout,
  LegalSection,
  LegalCallout,
  PrincipleGrid,
  StatRow,
  KVTable,
} from '@/components/legal/legal-layout'

export const metadata = {
  title: 'About | YuuTiers',
  description:
    'The story, mission and craft behind YuuTiers.xyz — a Minecraft hub built with love by Annushkaz_Yuu and Dexy_Yuu.',
}

const sections = [
  { id: 'story', title: 'Our story' },
  { id: 'mission', title: 'Mission' },
  { id: 'principles', title: 'Principles' },
  { id: 'what-we-build', title: 'What we build' },
  { id: 'numbers', title: 'By the numbers' },
  { id: 'team', title: 'The team' },
  { id: 'stack', title: 'The stack' },
  { id: 'roadmap', title: 'Roadmap' },
  { id: 'thanks', title: 'Thanks & credits' },
  { id: 'contact', title: 'Get in touch' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      <Navbar />
      <main className="pt-24 pb-24">
        <LegalLayout
          eyebrow="About"
          title="A love letter to Minecraft."
          subtitle="YuuTiers.xyz is a community-built hub for the people who never stopped loving Minecraft — and the small team that builds it with stubborn care."
          updated="Founded 2025 · Based on love and caffeine"
          heroImage="/legal/about-hero.jpg"
          heroAccent="#3b82f6"
          icon="sparkles"
          sections={sections}
        >
          <LegalSection id="story" title="Our story">
            <p>
              YuuTiers started, as most good things do, with frustration. Every
              existing Minecraft companion site we used had something we wished
              was different. Some were slow. Some were buried under ads. Some
              forced sign-ups for the most basic features. Almost none of them
              felt like they were built by someone who actually plays the game.
            </p>
            <p>
              One night, after looking up a friend&apos;s skin for the
              hundredth time, <strong>Annushkaz_Yuu</strong> decided enough was
              enough. The plan was simple: one clean, fast page that did the
              twenty things we kept coming back for. No ads. No tracking. No
              accounts.
            </p>
            <p>
              That side-project quickly became a real one. The shaders got
              fancier, the API layer got smarter, the docs grew into a wiki,
              and along the way it stopped being &quot;just a tool&quot; — it
              became a small home on the internet for people who love this
              game as much as we do.
            </p>
            <LegalCallout title="A small confession" tone="info">
              YuuTiers is genuinely a labor of love, not a startup. There is no
              roadmap from a board. There is no investor deck. There&apos;s a
              cozy desk, two players who happen to be in love, and a long list
              of things we still want to build.
            </LegalCallout>
          </LegalSection>

          <LegalSection id="mission" number="01" title="Our mission">
            <p>
              To be the calmest, fastest, most thoughtfully-built place to look
              up <strong>anything</strong> about Minecraft — without ever asking
              you to log in, pay, or hand over your data.
            </p>
            <p>
              If a player, server, skin or piece of news is publicly available,
              we want you to be able to find it here in under a second, render
              it beautifully, and walk away without a popup chasing you.
            </p>
          </LegalSection>

          <LegalSection id="principles" number="02" title="The principles we build by">
            <PrincipleGrid
              items={[
                {
                  icon: 'zap',
                  title: 'Fast by default',
                  description:
                    'Everything runs on the edge. p99 under 200ms is the floor, not the ceiling. Slow is a bug.',
                },
                {
                  icon: 'shield',
                  title: 'Private by design',
                  description:
                    'No accounts. No tracking pixels. No selling data. We forget you the moment you leave.',
                },
                {
                  icon: 'heart',
                  title: 'Built with care',
                  description:
                    'Every gradient, every animation, every micro-interaction. Details matter because you do.',
                },
                {
                  icon: 'globe',
                  title: 'Open & honest',
                  description:
                    'We use public APIs and credit them. We tell you when something breaks. No magic, no fog.',
                },
                {
                  icon: 'code2',
                  title: 'Quality over quantity',
                  description:
                    "We'd rather ship one feature that delights you than ten that don't. We delete more than we add.",
                },
                {
                  icon: 'users',
                  title: 'For the community',
                  description:
                    'You can suggest, complain, request and roast us anytime. We read everything. Promise.',
                },
              ]}
            />
          </LegalSection>

          <LegalSection id="what-we-build" number="03" title="What we build">
            <p>
              YuuTiers covers the things we, as players, actually open ten times
              a week. Each is built to be the cleanest version of itself we
              could imagine.
            </p>
            <ul>
              <li>
                <strong>Player profiles</strong> — full Java profile lookup with
                3D skins, capes, name history, UUID in both formats, and a
                friendly share page.
              </li>
              <li>
                <strong>Skin & cape gallery</strong> — high-quality renders,
                model variant detection (Steve / Alex), one-click downloads in
                game-ready format.
              </li>
              <li>
                <strong>Server status</strong> — live MOTD, version, player
                counts, favicon, and ping for any Java or Bedrock server,
                refreshed in real time.
              </li>
              <li>
                <strong>Live Mojang news</strong> — official news, snapshots,
                betas, and release notes pulled directly from
                minecraft.net&apos;s feed.
              </li>
              <li>
                <strong>The Wiki</strong> — a hand-written guide to the
                Overworld, Nether and End. No SEO bait, no clutter, just the
                game we love, written for players.
              </li>
              <li>
                <strong>A public API</strong> — every endpoint we use is
                exposed for other devs, with sensible rate limits and proper
                caching headers.
              </li>
            </ul>
          </LegalSection>

          <LegalSection id="numbers" number="04" title="By the numbers">
            <p>
              A snapshot of the platform — refreshed daily, served straight
              from the edge.
            </p>
            <StatRow
              items={[
                { value: '<150ms', label: 'Median p50 latency', accent: '#3b82f6' },
                { value: '99.98%', label: '90-day uptime', accent: '#22c55e' },
                { value: '0', label: 'Trackers loaded', accent: '#f0f0f8' },
                { value: '∞', label: 'Skins rendered', accent: '#a78bfa' },
              ]}
            />
            <p>
              We don&apos;t do vanity metrics. The numbers we care about are
              speed, reliability, and the size of our zero-tracker promise.
            </p>
          </LegalSection>

          <LegalSection id="team" number="05" title="The team">
            <p>
              YuuTiers is built and maintained by a tiny team of two — a couple
              who fell in love, in part, over this very game.
            </p>
            <KVTable
              rows={[
                {
                  k: 'Owner',
                  v: (
                    <>
                      <Link href="/team">Annushkaz_Yuu</Link> — built the
                      backend, frontend, design system, docs and almost
                      everything you&apos;ll find on this site.
                    </>
                  ),
                },
                {
                  k: 'Co-Owner',
                  v: (
                    <>
                      <Link href="/team">Dexy_Yuu</Link> — the muse, the first
                      tester, the reason any of this got finished.
                    </>
                  ),
                },
                {
                  k: 'Based',
                  v: 'Two laptops, one apartment, far too many keyboards.',
                },
                {
                  k: 'Funded by',
                  v: 'Love. Coffee. And occasional Minecraft caves.',
                },
              ]}
            />
            <p>
              Read more about us, including how the project started and the
              people behind it, on the <Link href="/team">team page</Link>.
            </p>
          </LegalSection>

          <LegalSection id="stack" number="06" title="The stack">
            <p>
              We&apos;re unapologetic about loving boring, well-built tools.
              Here&apos;s what runs YuuTiers under the hood.
            </p>
            <KVTable
              rows={[
                { k: 'Framework', v: 'Next.js 16 (App Router) on the Vercel edge runtime' },
                { k: 'UI', v: 'React 19, Tailwind CSS v4, Framer Motion, shadcn/ui' },
                { k: 'Data', v: 'TanStack Query, SWR for client cache, native fetch + edge cache' },
                { k: '3D', v: 'skinview3d (Three.js) for live skin & cape rendering' },
                { k: 'Hosting', v: 'Vercel edge — 100+ regions, automatic global cache' },
                { k: 'APIs', v: 'Mojang, Crafatar, mc-heads, mcsrvstat, Modrinth, Crafty.gg' },
                { k: 'Type-safety', v: 'TypeScript end-to-end, zero `any` in shipped code' },
              ]}
            />
            <LegalCallout title="Why this stack" tone="info">
              We pick boring tools on purpose. Edge-rendered React with strong
              types lets two people ship a site that feels like it has a team
              of fifty behind it — without burning out.
            </LegalCallout>
          </LegalSection>

          <LegalSection id="roadmap" number="07" title="What we&apos;re cooking">
            <p>
              We don&apos;t publish a strict roadmap — half the fun is shipping
              when we&apos;re excited about something. But here&apos;s an
              honest list of what we&apos;re actively working on or thinking
              about next.
            </p>
            <ul>
              <li>A complete Bedrock player & realm lookup flow</li>
              <li>Live server graphs (player count trend over time)</li>
              <li>Skin editor with paint, layers and history</li>
              <li>Cape gallery with rarity tags and lore</li>
              <li>Snapshot tracker with diff view between builds</li>
              <li>Community-submitted wiki edits with mod approval</li>
              <li>An embeddable player card widget for forums and Discord</li>
              <li>Localization — Spanish first, then Portuguese and French</li>
            </ul>
            <p>
              Want to nudge something to the top? Open a request on the{' '}
              <Link href="/contact">contact page</Link>.
            </p>
          </LegalSection>

          <LegalSection id="thanks" number="08" title="Thanks & credits">
            <p>
              We stand on the shoulders of an incredible amount of open work.
              The whole platform is only possible because of these people and
              projects.
            </p>
            <ul>
              <li>
                <strong>Mojang Studios</strong> — for the game we&apos;ve been
                playing for over a decade.
              </li>
              <li>
                <strong>Crafatar, mc-heads</strong> — for rock-solid skin and
                head rendering.
              </li>
              <li>
                <strong>mcsrvstat.us</strong> — for the world&apos;s most
                reliable server-ping service.
              </li>
              <li>
                <strong>The skinview3d team</strong> — for an absurdly elegant
                Three.js skin renderer.
              </li>
              <li>
                <strong>Vercel</strong> — for the edge runtime that makes the
                whole thing feel instant.
              </li>
              <li>
                <strong>You</strong> — for using a small site built by a small
                couple. Genuinely.
              </li>
            </ul>
          </LegalSection>

          <LegalSection id="contact" number="09" title="Get in touch">
            <p>
              Want to suggest a feature, report a bug or just say hi? We read
              every message. The fastest ways:
            </p>
            <KVTable
              rows={[
                {
                  k: 'Contact form',
                  v: <Link href="/contact">/contact</Link>,
                },
                {
                  k: 'Team page',
                  v: <Link href="/team">/team</Link>,
                },
                {
                  k: 'GitHub',
                  v: (
                    <a
                      href="https://github.com/yuutiers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <Github className="w-4 h-4" />
                      github.com/yuutiers
                    </a>
                  ),
                },
                {
                  k: 'Email',
                  v: 'hello@yuutiers.xyz',
                },
              ]}
            />
            <LegalCallout title="Not affiliated with Mojang" tone="warn">
              YuuTiers is an independent fan project. We are{' '}
              <strong>
                not affiliated with, endorsed, sponsored or specifically
                approved by Mojang AB, Microsoft, or any related entities
              </strong>
              . Minecraft and the Minecraft logo are trademarks of Mojang
              Synergies AB.
            </LegalCallout>
          </LegalSection>
        </LegalLayout>
      </main>
      <Footer />
    </div>
  )
}
