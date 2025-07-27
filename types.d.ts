interface User {
  password: string;
  email: string;
  fullName: string;
  universityId: number;
  universityCard: string;
  role: "USER" | "ADMIN";
  createdAt?: Date | null;
  id: string;
}

interface BOOK {
    id: string;
    title: string;
    author: string;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies?: number;
    description?: string;
    coverColor: string;
    coverUrl: string;
    videoUrl: string;
    summary: string;
    createdAt?: Date | null ;
    status?: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}