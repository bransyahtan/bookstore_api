import { IAuthor } from "../interfaces";
import { Author } from "../models";

export class AuthorsService {
  static async getAll() {
    return await Author.findAll();
  }
  static async getById(id: number) {
    return await Author.findByPk(id);
  }
  static async create(data: Omit<IAuthor, "id" | "createdAt">) {
    return await Author.create(data);
  }
  static async update(id: number, data: Partial<IAuthor>) {
    const author = await Author.findByPk(id);
    if (!author) return null;
    return await author.update(data);
  }
  static async delete(id: number) {
    const author = await Author.findByPk(id);
    if (!author) return null;
    await author.destroy();
    return true;
  }
}
