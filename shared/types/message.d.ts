import { IUser } from './user';

export interface IMessage {
  _id: string;
  sender: IUser | string;   // Populated or just ID
  receiver: IUser | string; // Populated or just ID
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}