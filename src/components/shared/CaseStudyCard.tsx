import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export interface CaseStudy {
  name: string;
  image?: string;
  background: string;
  problem: string;
  solution: string;
  result: string;
  country: string;
  program: string;
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index?: number;
}

export function CaseStudyCard({ study, index = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-card"
    >
      <div className="p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {study.country}
          </Badge>
          <Badge variant="secondary">{study.program}</Badge>
        </div>

        <h3 className="mb-4 font-heading text-xl font-bold text-foreground">{study.name}</h3>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Background</p>
            <p className="text-sm leading-relaxed text-foreground">{study.background}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Challenge</p>
            <p className="text-sm leading-relaxed text-foreground">{study.problem}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Our Solution</p>
            <p className="text-sm leading-relaxed text-foreground">{study.solution}</p>
          </div>
          <div className="flex items-start gap-2 rounded-2xl bg-primary/5 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-primary">Result</p>
              <p className="text-sm font-medium leading-relaxed text-foreground">{study.result}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
