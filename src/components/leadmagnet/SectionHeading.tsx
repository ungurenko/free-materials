interface SectionHeadingProps {
  pill?: string;
  title: string;
  description?: string;
  id?: string;
}

export default function SectionHeading({ pill, title, description, id }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl" id={id}>
      {pill && (
        <p className="pill border border-line bg-paper px-3.5 py-2 text-ink-soft">
          <span className="size-1.5 rounded-full bg-lime-500" aria-hidden />
          {pill}
        </p>
      )}
      <h2 className="mt-5 font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.01em] text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
