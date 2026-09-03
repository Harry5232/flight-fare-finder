import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

const title = "Dashboard — Flight Price Notifier";
const description = "Manage your Taipei flight fare alerts.";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            <span aria-hidden="true">✈️</span>
            Flight Price Notifier
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent"
            >
              Sign out / 登出
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Your alerts．你的降價通知</h1>
        <p className="mt-2 text-muted-foreground">
          You&apos;re signed in. Route subscriptions and target prices are coming soon.
        </p>

        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-4xl" aria-hidden="true">
            🔔
          </p>
          <p className="mt-4 font-medium">尚未設定任何航線通知</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Route + target price setup arrives in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
