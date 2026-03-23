import { Book } from "@/lib/books";
import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2, BookOpen } from "lucide-react";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const handleDelete = () => {
    if (window.confirm(`Delete "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center overflow-hidden">
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <BookOpen className="w-12 h-12 text-muted-foreground/40" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-card-foreground truncate">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        {book.genre && <p className="text-xs text-muted-foreground mt-1">Genre: {book.genre}</p>}
      </div>
      <div className="flex items-center justify-between">
        <StatusBadge status={book.status} />
        <div className="flex gap-1">
          <button onClick={() => onEdit(book)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors" aria-label="Edit">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={handleDelete} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" aria-label="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
