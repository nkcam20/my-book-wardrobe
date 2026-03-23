import { Book } from "@/lib/books";
import { BookOpen, BookCheck, Bookmark, Library } from "lucide-react";

interface StatsBarProps {
  books: Book[];
}

const stats = [
  { label: "Total Books", key: "total" as const, icon: Library, color: "text-primary" },
  { label: "Read", key: "Read" as const, icon: BookCheck, color: "text-status-read" },
  { label: "Reading", key: "Reading" as const, icon: BookOpen, color: "text-status-reading" },
  { label: "Want to Read", key: "Want to Read" as const, icon: Bookmark, color: "text-status-want" },
];

export function StatsBar({ books }: StatsBarProps) {
  const counts = {
    total: books.length,
    Read: books.filter((b) => b.status === "Read").length,
    Reading: books.filter((b) => b.status === "Reading").length,
    "Want to Read": books.filter((b) => b.status === "Want to Read").length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.key} className="bg-card rounded-lg p-4 shadow-sm flex items-center gap-3">
          <s.icon className={`w-8 h-8 ${s.color}`} />
          <div>
            <p className="text-2xl font-bold text-card-foreground">{counts[s.key]}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
