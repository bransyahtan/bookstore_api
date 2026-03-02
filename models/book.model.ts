import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';
import { Author } from './author.model';

export class Book extends Model {
  public id!: number;
  public title!: string;
  public authorId!: number;
  public isbn!: string;
  public price!: number;
  public stock!: number;
  public publishedDate?: Date;
}

Book.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  authorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  isbn: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  publishedDate: { type: DataTypes.DATE, allowNull: true }
}, { sequelize, tableName: 'books', timestamps: true });

Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });
Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });