import { useReveal } from "@/hooks/use-reveal";

interface FeatureCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon, title, subtitle, description, delay = 0 }: FeatureCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rounded-2xl border border-border bg-card p-6 transition-all duration-700 ease-out hover:border-primary/40 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-2xl">
        <span aria-hidden="true">{icon}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="mt-1 text-sm font-medium text-primary-glow">{subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
