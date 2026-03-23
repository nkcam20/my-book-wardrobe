export type BookStatus = "Read" | "Reading" | "Want to Read";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
}

const STORAGE_KEY = "nanda-kumar-library-books";

export function getBooks(): Book[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBooks(books: Book[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
