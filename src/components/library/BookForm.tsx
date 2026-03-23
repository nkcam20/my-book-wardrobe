import { useState, useEffect } from "react";
import { Book, BookStatus, generateId } from "@/lib/books";
import { X } from "lucide-react";

interface BookFormProps {
  editingBook: Book | null;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

const statuses: BookStatus[] = ["Read", "Reading", "Want to Read"];

export function BookForm({ editingBook, onSave, onCancel }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<BookStatus>("Want to Read");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setGenre(editingBook.genre);
      setStatus(editingBook.status);
    } else {
      setTitle(""); setAuthor(""); setGenre(""); setStatus("Want to Read");
    }
  }, [editingBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onSave({
      id: editingBook?.id || generateId(),
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      status,
    });
  };

  return (
    <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button type="button" onClick={onCancel} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-card-foreground mb-4">{editingBook ? "Edit Book" : "Add New Book"}</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-card-foreground">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-card-foreground">Author *</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-card-foreground">Genre</label>
            <input value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-card-foreground">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as BookStatus)} className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="w-full mt-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
          {editingBook ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
}
