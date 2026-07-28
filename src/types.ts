export interface Post {
  id?: string;
  category: string;
  title: string;
  content: string;
  author: string;
  department?: string;
  createdAt?: any;
  likes: number;
  commentsCount: number;
  imageUrl?: string;
  isPopular?: boolean;
}

export interface CommentItem {
  id?: string;
  postId: string;
  author: string;
  content: string;
  createdAt?: any;
}

export interface SymptomRegistration {
  id?: string;
  patientName: string;
  phone: string;
  symptomText: string;
  department: string;
  hospitalName: string;
  preferredDate: string;
  preferredTime: string;
  status: '접수완료' | '진료대기' | '진료완료';
  createdAt?: any;
  queueNumber?: number;
}

export interface Hospital {
  id: string;
  name: string;
  rating: number;
  statusText: string;
  badge?: string;
  description: string;
  address: string;
  closeTime: string;
  departments: string[];
  imageUrl: string;
  features: string[];
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  isPopular?: boolean;
  doctorCount?: number;
}
