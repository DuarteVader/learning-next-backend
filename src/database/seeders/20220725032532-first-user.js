const bcrypt = require("bcrypt");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          userType: "999",
          userEmail: "admin@admin.com.br",
          userPassword: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
          userName: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userType: "1",
          userEmail: "teste@teste.com",
          userPassword: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
          userName: "teste1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};