import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public fullName!: string;
  public role!: 'admin' | 'customer';
}

User.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  fullName: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin','customer'), allowNull: false }
}, { sequelize, tableName: 'users', timestamps: true });