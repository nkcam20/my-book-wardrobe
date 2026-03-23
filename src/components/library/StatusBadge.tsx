import { BookStatus } from "@/lib/books";

const badgeStyles: Record<BookStatus, string> = {
  Read: "bg-status-read/15 text-status-read",
  Reading: "bg-status-reading/15 text-status-reading",
  "Want to Read": "bg-status-want/15 text-status-want",
};

export function StatusBadge({ status }: { status: BookStatus }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeStyles[status]}`}>
      {status}
    </span>
  );
}
