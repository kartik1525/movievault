export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface UserProfile {
  _id: string;
  firebaseUid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  reducedMotion: boolean;
  favoriteGenres: number[];
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
