interface FeeRow {
  country: string;
  tuition: string;
  living: string;
  total: string;
}

interface FeesTableProps {
  title?: string;
  subtitle?: string;
  rows: FeeRow[];
}

export function FeesTable({ title, subtitle, rows }: FeesTableProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        {title && (
          <h2 className="mb-2 text-center font-heading text-3xl font-bold text-foreground">{title}</h2>
        )}
        {subtitle && (
          <p className="mb-10 text-center text-muted-foreground">{subtitle}</p>
        )}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-heading font-semibold text-foreground">Country</th>
                <th className="px-6 py-4 font-heading font-semibold text-foreground">Tuition / Year</th>
                <th className="px-6 py-4 font-heading font-semibold text-foreground">Living Cost / Year</th>
                <th className="px-6 py-4 font-heading font-semibold text-foreground">Total / Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.country} className="transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium text-foreground">{row.country}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.tuition}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.living}</td>
                  <td className="px-6 py-4 font-semibold text-primary">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
