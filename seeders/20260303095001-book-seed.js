"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("books", [
      {
        title: "Harry Potter and the Philosopher's Stone",
        authorId: 1,
        isbn: "9780747532699",
        price: 50000.0,
        stock: 50,
        publishedDate: new Date("1997-06-26"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "A Game of Thrones",
        authorId: 2,
        isbn: "9780553103540",
        price: 90000.0,
        stock: 30,
        publishedDate: new Date("1996-08-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Hobbit",
        authorId: 3,
        isbn: "9780618260300",
        price: 60000.0,
        stock: 40,
        publishedDate: new Date("1937-09-21"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("books", null, {});
  },
};
