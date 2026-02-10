
export enum Screen {
  SPLASH = 'SPLASH',
  HOME = 'HOME',
  MARKETPLACE = 'MARKETPLACE',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  LOGISTICS = 'LOGISTICS',
  VETERINAR = 'VETERINAR',
  ACADEMY = 'ACADEMY',
  PROFILE = 'PROFILE',
  ADD_LISTING = 'ADD_LISTING',
  REGISTRATION = 'REGISTRATION',
  LOGIN = 'LOGIN',
  ADMIN = 'ADMIN',
  AI = 'AI'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  region: string;
  role: 'Dehqon' | 'Haydovchi' | 'Veterinar' | 'Admin';
  isLoggedIn: boolean;
}

export interface Product {
  id: string;
  userId: string;
  title: string;
  price: string;
  location: string;
  image: string;
  description: string;
  category: string;
  breed?: string;
  weight?: string;
  age?: string;
  isVaccinated?: boolean;
  isHealthy?: boolean;
  videoUrl?: string;
  likes: number;
}

export interface LogisticsOrder {
  id: string;
  userId: string;
  from: string;
  to: string;
  cargoType: string;
  phone: string;
  status: 'Kutilmoqda' | 'Tasdiqlandi' | 'Yetkazildi';
  date: string;
}

export interface Vet {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image: string;
}

export interface LogisticsProvider {
  id: string;
  vehicleType: string;
  fromRegion: string;
  toRegion: string;
  price: string;
  phone: string;
  image: string;
}

export interface AcademyLesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  isPdf?: boolean;
}
