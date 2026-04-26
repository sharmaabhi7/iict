import { CheckCircle } from "lucide-react";

interface EligibilitySectionProps {
  criteria: string[];
}

export function EligibilitySection({ criteria }: EligibilitySectionProps) {
  return (
    <section className="bg-section-alt py-16 md:py-20">
      <div className="container">
        <h2 className="mb-10 text-center font-heading text-3xl font-bold text-foreground">
          Eligibility Criteria
        </h2>
        <div className="mx-auto max-w-2xl">
          <ul className="space-y-4">
            {criteria.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
