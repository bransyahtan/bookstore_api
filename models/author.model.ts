import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

export class Author extends Model {
  public id!: number;
  public name!: string;
  public bio?: string;
}

Author.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT, allowNull: true }
}, { sequelize, tableName: 'authors', timestamps: true });