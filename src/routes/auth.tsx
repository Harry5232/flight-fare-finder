import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { supabase } from "@/integrations/supabase/client";

const title = "Sign in — Flight Price Notifier";
const description = "Sign in to manage your fare alerts on Flight Price Notifier.";

export const Route = createFileRoute("/auth")({
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
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) setError(signInError.message);
      else navigate({ to: "/dashboard", replace: true });
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (signUpError) setError(signUpError.message);
      else if (data.session) navigate({ to: "/dashboard", replace: true });
      else setMessage("Check your email to confirm your account．請至信箱完成驗證。");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center px-5 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span aria-hidden="true">✈️</span>
            Flight Price Notifier
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="animate-fade-in-up w-full max-w-md rounded-2xl border border-border bg-card p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Welcome back．登入" : "Create account．註冊"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your fare alerts.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {message ? <p className="text-sm text-primary-glow">{message}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-glow disabled:opacity-60"
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign in / 登入" : "Create account / 註冊"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setMessage(null);
            }}
            className="mt-6 w-full text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {mode === "signin" ? "No account yet? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
}
