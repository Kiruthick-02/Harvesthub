export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'farmer' | 'buyer' | 'admin';
  farmDetails?: string;
  transactionHistory?: string[]; // Array of Contract IDs
  createdAt: string;
  updatedAt: string;
}