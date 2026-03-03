"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("authors", [
      {
        id: 1,
        name: "J.K. Rowling",
        bio: "British author, best known for the Harry Potter series.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "George R.R. Martin",
        bio: "American novelist and short story writer in the fantasy, horror, and science fiction genres.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "J.R.R. Tolkien",
        bio: "English writer, poet, philologist, and academic, best known as the author of The Hobbit and The Lord of the Rings.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("authors", null, {});
  },
};
