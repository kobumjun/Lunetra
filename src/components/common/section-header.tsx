export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">{description}</p>
    </div>
  );
}
