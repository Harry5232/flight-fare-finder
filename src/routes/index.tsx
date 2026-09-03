import { createFileRoute, Link } from "@tanstack/react-router";

import { FeatureCard } from "@/components/FeatureCard";

const title = "Flight Price Notifier — 機票降價通知";
const description =
  "設定台北出發的航線與目標價，機票降到目標價就寄 email 通知你。Set a route and a target price — we email you when the fare drops.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: "✈️",
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    description: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: "🔔",
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    description: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: "🚫",
    title: "隨時取消",
    subtitle: "Cancel anytime",
    description: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            <span aria-hidden="true">✈️</span>
            Flight Price Notifier
          </span>
          <Link
            to="/auth"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      <main>
        <section
          className="relative overflow-hidden px-5 py-24 sm:py-32"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="animate-fade-in-up inline-block rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              台北出發 · 熱門航線監控
            </span>
            <h1 className="animate-fade-in-up mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Flight Price Notifier
            </h1>
            <p className="animate-fade-in-up-delayed mt-6 text-xl font-medium sm:text-2xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="animate-fade-in-up-delayed mt-3 text-base text-muted-foreground">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="animate-fade-in-up-delayed-more mt-10">
              <Link
                to="/auth"
                className="glow-primary inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-glow"
              >
                Sign in / 登入
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={index * 100} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-5 py-8">
        <p className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          © 2026 Flight Price Notifier
        </p>
      </footer>
    </div>
  );
}
