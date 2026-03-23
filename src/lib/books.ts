export type BookStatus = "Read" | "Reading" | "Want to Read";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
  cover?: string;
}

const STORAGE_KEY = "nanda-kumar-library-books";
const VERSION_KEY = "nanda-kumar-library-version";
const CURRENT_VERSION = "2";
const DEFAULT_BOOKS: Book[] = [
  { id: "b1", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", status: "Read", cover: "https://covers.openlibrary.org/b/isbn/9780061120084-M.jpg" },
  { id: "b2", title: "1984", author: "George Orwell", genre: "Dystopian", status: "Read", cover: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg" },
  { id: "b3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", status: "Read", cover: "https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg" },
  { id: "b4", title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction", status: "Reading", cover: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg" },
  { id: "b5", title: "Atomic Habits", author: "James Clear", genre: "Self-Help", status: "Reading", cover: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg" },
  { id: "b6", title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", status: "Read", cover: "https://covers.openlibrary.org/b/isbn/9780062315007-M.jpg" },
  { id: "b7", title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", status: "Want to Read", cover: "https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg" },
  { id: "b8", title: "Educated", author: "Tara Westover", genre: "Memoir", status: "Want to Read", cover: "https://covers.openlibrary.org/b/isbn/9780399590504-M.jpg" },
  { id: "b9", title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", status: "Reading", cover: "https://covers.openlibrary.org/b/isbn/9780857197689-M.jpg" },
  { id: "b10", title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", status: "Want to Read", cover: "https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg" },
];

export function getBooks(): Book[] {
  try {
    const ver = localStorage.getItem(VERSION_KEY);
    if (ver !== CURRENT_VERSION) {
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      saveBooks(DEFAULT_BOOKS);
      return DEFAULT_BOOKS;
    }
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
    saveBooks(DEFAULT_BOOKS);
    return DEFAULT_BOOKS;
  } catch {
    return DEFAULT_BOOKS;
  }
}

export function saveBooks(books: Book[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
