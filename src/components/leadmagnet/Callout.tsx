interface CalloutProps {
  tone?: "info" | "warning";
  title?: string;
  intro?: string;
  items?: string[];
  note?: string;
}

export default function Callout({
  tone = "info",
  title,
  intro,
  items,
  note,
}: CalloutProps) {
  const isWarning = tone === "warning";

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border p-5 sm:p-7 ${
        isWarning
          ? "border-amber-200/70 bg-amber-50/60"
          : "border-lime-300/70 bg-lime-100"
      }`}
    >
      {isWarning ? (
        <span
          className="pill absolute right-5 top-5 border border-amber-300/70 bg-paper px-3 py-1.5 text-amber-700"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 3 2 21h20L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 10v5" strokeLinecap="round" />
            <circle cx="12" cy="18" r="0.7" fill="currentColor" stroke="none" />
          </svg>
          Внимание
        </span>
      ) : (
        <span
          className="pill absolute right-5 top-5 border border-lime-500/30 bg-paper/70 px-3 py-1.5 text-lime-700"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" strokeLinecap="round" />
            <circle cx="12" cy="16.3" r="0.7" fill="currentColor" stroke="none" />
          </svg>
          Совет
        </span>
      )}

      {title && (
        <h3
          className={`pr-20 font-display text-[17px] font-semibold leading-snug sm:pr-24 sm:text-lg ${
            isWarning ? "text-amber-900" : "text-moss-950"
          }`}
        >
          {title}
        </h3>
      )}

      {intro && (
        <p
          className={`mt-2 text-[15px] leading-relaxed sm:text-base ${
            isWarning ? "text-amber-900/85" : "text-moss-800/85"
          }`}
        >
          {intro}
        </p>
      )}

      {items && items.length > 0 && (
        <ul
          className={`mt-4 grid gap-2 text-[15px] leading-relaxed sm:grid-cols-2 sm:gap-x-6 sm:text-base ${
            isWarning ? "text-amber-900/85" : "text-moss-800/85"
          }`}
        >
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className={`mt-2 size-1.5 shrink-0 rounded-full ${
                  isWarning ? "bg-amber-500" : "bg-lime-600"
                }`}
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {note && (
        <p
          className={`mt-4 border-t pt-4 text-[13.5px] leading-relaxed sm:text-sm ${
            isWarning
              ? "border-amber-200/70 text-amber-900/75"
              : "border-lime-300/60 text-moss-800/70"
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
}
