import { useState, useEffect, useMemo } from "react";
import { Book, BookStatus, getBooks, saveBooks } from "@/lib/books";
import { StatsBar } from "@/components/library/StatsBar";
import { BookCard } from "@/components/library/BookCard";
import { BookForm } from "@/components/library/BookForm";
import { Plus, Search, BookX } from "lucide-react";

const filters: (BookStatus | "All")[] = ["All", "Read", "Reading", "Want to Read"];

export default function Index() {
  const [books, setBooks] = useState<Book[]>(getBooks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<BookStatus | "All">("All");
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => { saveBooks(books); }, [books]);

  const filtered = useMemo(() => {
    let result = books;
    if (filter !== "All") result = result.filter((b) => b.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    return result;
  }, [books, filter, search]);

  const handleSave = (book: Book) => {
    setBooks((prev) => {
      const idx = prev.findIndex((b) => b.id === book.id);
      if (idx >= 0) { const copy = [...prev]; copy[idx] = book; return copy; }
      return [...prev, book];
    });
    setShowForm(false);
    setEditingBook(null);
  };

  const handleEdit = (book: Book) => { setEditingBook(book); setShowForm(true); };
  const handleDelete = (id: string) => setBooks((prev) => prev.filter((b) => b.id !== id));
  const handleCancel = () => { setShowForm(false); setEditingBook(null); };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">📚 nkcam20 Library Book Tracker</h1>
          <button onClick={() => { setEditingBook(null); setShowForm(true); }} className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity text-sm">
            <Plus className="w-4 h-4" /> Add Book
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <StatsBar books={books} />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or author..." className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground border border-input"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <BookX className="w-16 h-16 mb-3 opacity-40" />
            <p className="text-lg font-medium">No books found</p>
            <p className="text-sm">Add a book or adjust your search/filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {showForm && <BookForm editingBook={editingBook} onSave={handleSave} onCancel={handleCancel} />}
    </div>
  );
}
