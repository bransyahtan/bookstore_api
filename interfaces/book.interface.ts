export interface IBook {
  id?: number;
  title: string;
  authorId: number;
  isbn: string;
  price: number;
  stock: number;
  publishedDate?: Date;
  createdAt?: Date;
}