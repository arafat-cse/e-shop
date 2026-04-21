const items = [
  {
    title: "Fast delivery",
    description: "Nationwide shipping with checkout-ready order summaries."
  },
  {
    title: "Search and filter",
    description: "Find products quickly by category or keyword."
  },
  {
    title: "Persistent cart",
    description: "Cart state is saved in localStorage across sessions."
  },
  {
    title: "Responsive UI",
    description: "Optimized for mobile, tablet, and desktop screens."
  }
];

export function FeatureStrip() {
  return (
    <section className="container py-6 md:py-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-soft"
          >
            <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
