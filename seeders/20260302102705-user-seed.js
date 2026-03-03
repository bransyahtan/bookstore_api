"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash("admin123", 10);

    return queryInterface.bulkInsert("users", [
      {
        email: "admin@bookstore.com",
        password: passwordHash,
        fullName: "Admin User",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", { email: "admin@bookstore.com" });
  },
};
