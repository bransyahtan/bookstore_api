import { sequelize } from '../config/db.config';
import { User } from './user.model';
import { Author } from './author.model';
import { Book } from './book.model';

export { sequelize, User, Author, Book };