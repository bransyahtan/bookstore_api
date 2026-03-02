export interface IUser {
  id?: number;
  email: string;
  password: string;
  fullName: string;
  role: 'admin' | 'customer';
  createdAt?: Date;
}