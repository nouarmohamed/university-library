interface User {
  password: string;
  email: string;
  fullName: string;
  universityId: number;
  universityCard: string;
}

interface BOOK {
    id: number;
    title: string;
    author: string;
    genre: string;
    rating: number;
    total_copies: number;
    available_copies: number;
    description: string;
    color: string;
    cover: string;
    video: string;
    summary: string;
}