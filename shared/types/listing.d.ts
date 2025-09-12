import { IUser } from './user';

export interface IListing {
  _id: string;
  seller: IUser | string; // Populated or just ID
  title: string;
  description: string;
  price: number;
  category: 'produce' | 'equipment';
  media: string[]; // Array of image/video URLs
  isSold: boolean;
  createdAt: string;
  updatedAt:string;
}