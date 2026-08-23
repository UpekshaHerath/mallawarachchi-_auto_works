import type { Bi } from "@/lib/content";

/**
 * Renders both languages into the HTML; CSS on <html data-lang> shows one.
 * Keeps every text node server-rendered — switching language costs no JS
 * beyond flipping one attribute, and both languages are indexable.
 */
export function T({ t, as: Tag = "span" }: { t: Bi; as?: "span" | "div" | "p" }) {
  return (
    <>
      <Tag className="en" lang="en">
        {t.en}
      </Tag>
      <Tag className="si" lang="si">
        {t.si}
      </Tag>
    </>
  );
}

/** Same idea for attribute values that cannot hold two nodes (alt, aria-label). */
export const both = (t: Bi) => `${t.en} / ${t.si}`;
