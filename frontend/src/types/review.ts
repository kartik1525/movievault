export interface Review {
  _id: string;
  userId: string;
  movieId: number;
  movieTitle: string;
  moviePosterPath: string | null;
  rating: number;
  content: string;
  spoiler: boolean;
  authorName: string;
  authorPhotoURL: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewFormData {
  movieId: number;
  movieTitle: string;
  moviePosterPath: string | null;
  rating: number;
  content: string;
  spoiler: boolean;
}
