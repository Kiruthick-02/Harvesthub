import { IUser } from './user';

interface IVersion {
  terms: string;
  updatedAt: string;
}

export interface IContract {
  _id: string;
  farmer: IUser | string; // Populated or just ID
  buyer: IUser | string;  // Populated or just ID
  produce: string;
  quantity: number;
  price: number;
  terms: string;
  status: 'pending' | 'active' | 'completed' | 'disputed';
  digitalSignatureFarmer?: string;
  digitalSignatureBuyer?: string;
  versionHistory: IVersion[];
  paymentStatus: 'unpaid' | 'paid';
  createdAt: string;
  updatedAt: string;
}