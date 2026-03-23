export type BookStatus = "Read" | "Reading" | "Want to Read";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
}

const STORAGE_KEY = "nanda-kumar-library-books";

const DEFAULT_BOOKS: Book[] = [
  { id: "b1", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", status: "Read" },
  { id: "b2", title: "1984", author: "George Orwell", genre: "Dystopian", status: "Read" },
  { id: "b3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", status: "Read" },
  { id: "b4", title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction", status: "Reading" },
  { id: "b5", title: "Atomic Habits", author: "James Clear", genre: "Self-Help", status: "Reading" },
  { id: "b6", title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", status: "Read" },
  { id: "b7", title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", status: "Want to Read" },
  { id: "b8", title: "Educated", author: "Tara Westover", genre: "Memoir", status: "Want to Read" },
  { id: "b9", title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", status: "Reading" },
  { id: "b10", title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", status: "Want to Read" },
];

export function getBooks(): Book[] {
  try {
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
