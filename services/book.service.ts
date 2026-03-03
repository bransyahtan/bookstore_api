import { Op } from "sequelize";
import { IBook } from "../interfaces";
import { Book } from "../models";

export class BooksService {
  static async getAll(filters: any) {
    const where: any = {};
    if (filters.authorId) where.authorId = filters.authorId;
    if (filters.q) where.title = { [Op.like]: `%${filters.q}%` };
    if (filters.minPrice)
      where.price = { ...where.price, [Op.gte]: Number(filters.minPrice) };
    if (filters.maxPrice)
      where.price = { ...where.price, [Op.lte]: Number(filters.maxPrice) };
    return await Book.findAll({ where });
  }

  static async getById(id: number) {
    return await Book.findByPk(id);
  }
  static async create(data: Omit<IBook, "id" | "createdAt">) {
    return await Book.create(data);
  }
  static async update(id: number, data: Partial<IBook>) {
    const book = await Book.findByPk(id);
    if (!book) return null;
    return await book.update(data);
  }
  static async delete(id: number) {
    const book = await Book.findByPk(id);
    if (!book) return null;
    await book.destroy();
    return true;
  }
}
