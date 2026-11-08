import {
  HeroFeature,
  InstagramGrid,
  ShortsRow,
  VideosGrid,
} from "@/components/media-browser";
import { ArrowIcon } from "@/components/icons";
import { getInstagramMedia } from "@/lib/instagram";
import { site } from "@/lib/site";
import { getYoutubeShorts, getYoutubeVideos } from "@/lib/youtube-server";
import { VisitorCount } from "@/components/visitor-count";
import Image from "next/image";

export default async function Home() {
  const [videos, shorts, instagram] = await Promise.all([
    getYoutubeVideos(),
    getYoutubeShorts(),
    getInstagramMedia(),
  ]);
  const featured = videos[0];

  return (
    <main id="top">
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <p className="text-xs tracking-[0.32em] text-gold uppercase">
            {site.handle} · {site.location}
          </p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.youtube.url}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background"
            >
              Watch on YouTube
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href="#collaborate"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm"
            >
              Collaborate with me
            </a>
          </div>
          <div className="mb-7 flex items-center gap-3">
            <Image
              src={site.profileImage}
              alt="RaghuveerCV"
              width={48}
              height={48}
              sizes="48px"
              priority
              className="h-12 w-12 rounded-full border border-line object-cover"
            />
            <div>
              <p className="text-xs tracking-[0.32em] text-gold uppercase">
                {site.handle} · {site.location}
              </p>
              <p className="mt-1 text-sm text-muted">
                <VisitorCount />
              </p>
            </div>
          </div>
          <p className="text-xs tracking-[0.32em] text-gold uppercase sr-only">
            {site.handle} · {site.location}
          </p>
        </div>
        <HeroFeature video={featured} />
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="bg-background px-6 py-7">
              <p className="text-xs tracking-[0.22em] text-muted uppercase">
                {stat.label}
              </p>
              <p className="mt-2 font-serif text-2xl">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Explore</p>
          <h2 className="mt-3 font-serif text-4xl">What I share with you</h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["PC builds", "Complete budgets, part selection, assembly, testing, and final performance."],
            ["Tech upgrades", "RAM, SSD, cooling, software, laptop care, and practical maintenance."],
            ["Computer vlogs", "Local stories from Ranchi, the workshop, and everyday family-friendly tech life."],
            ["Honest reviews", "Clear opinions, real-world use, strengths, limitations, and buying guidance."],
          ].map(([title, copy]) => (
            <article key={title} className="bg-background p-6">
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="videos" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold uppercase">YouTube</p>
            <h2 className="mt-3 font-serif text-4xl">Latest videos</h2>
          </div>
          <a href={site.youtube.url} className="hidden text-sm text-muted sm:inline">
            View channel
          </a>
        </div>
        <VideosGrid videos={videos} />
      </section>

      <section id="shorts" className="border-y border-line py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.28em] text-gold uppercase">Vertical</p>
              <h2 className="mt-3 font-serif text-4xl">Shorts</h2>
            </div>
            <a href={`${site.youtube.url}/shorts`} className="text-sm text-muted">
              All Shorts
            </a>
          </div>
          <ShortsRow shorts={shorts} />
        </div>
      </section>

      <section id="instagram" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold uppercase">Instagram</p>
            <h2 className="mt-3 font-serif text-4xl">Reels & posts</h2>
          </div>
          <a href={site.instagram.url} className="text-sm text-muted">
            {site.instagram.handle}
          </a>
        </div>
        <InstagramGrid items={instagram} />
      </section>

      <section id="collaborate" className="border-y border-line bg-[#100e0c] py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold uppercase">Work together</p>
            <h2 className="mt-3 font-serif text-4xl">Tech reviews & paid promotions</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              PC builds, laptop upgrades, gaming content, computer accessories, and brand collaborations presented with practical information and a friendly approach.
            </p>
          </div>
          <a
            href={`mailto:${site.email}?subject=RaghuveerCV%20Paid%20Promotion`}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm text-background"
          >
            Send a proposal
          </a>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">About</p>
          <h2 className="mt-3 font-serif text-4xl">{site.about.title}</h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-muted">
          {site.about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-foreground"
          >
            Collabs & wholesale
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Frequently asked</p>
          <h2 className="mt-3 font-serif text-4xl">A few quick answers</h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {[
            [
              "Can you help choose PC parts?",
              "Yes. A few details about your budget, games, software, and preferred location can help narrow down a balanced build.",
            ],
            [
              "Do you accept brand collaborations?",
              "Yes. PC products, accessories, laptops, software, and local tech services can be considered for sponsored reviews and promotions.",
            ],
            [
              "Which languages do you create content in?",
              "Most videos use Hindi and Hinglish so the information stays easy and natural for local and Hindi-speaking viewers.",
            ],
          ].map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="cursor-pointer list-none pr-8 font-serif text-xl marker:hidden">
                {question}
              </summary>
              <p className="mt-3 max-w-3xl leading-7 text-muted">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">What I create</p>
          <h2 className="mt-3 font-serif text-4xl">
            Tech made simple, memorable, and fun
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {[
            [
              "01",
              "PC Builds",
              "Practical gaming and budget computer builds, explained from parts selection to final setup.",
            ],
            [
              "02",
              "Laptop & PC Care",
              "Cleaning, upgrades, SSD and RAM improvements, troubleshooting, and maintenance guidance.",
            ],
            [
              "03",
              "Computer Vlogs",
              "Funny, family-friendly stories from the workshop, local CSC centre, and everyday tech life.",
            ],
          ].map(([number, title, copy]) => (
            <article key={number} className="bg-background p-7 sm:p-8">
              <p className="text-xs tracking-[0.22em] text-gold">{number}</p>
              <h3 className="mt-6 font-serif text-2xl">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Visitor Counter Section */}
      <section className="border-t border-line py-10">
        <div className="mx-auto max-w-6xl px-6">
          <VisitorCount />
        </div>
      </section>
    </main>
  );
}
