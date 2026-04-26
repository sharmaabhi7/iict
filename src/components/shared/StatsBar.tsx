import type { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-border bg-card py-8">
      <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 text-center md:justify-center">
            <s.icon className="h-8 w-8 shrink-0 text-primary" />
            <div>
              <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
