'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('Users', 
              { id: { type: Sequelize.INTEGER,
                      allowNull: false,
                      primaryKey: true,
                      autoIncrement: true,
                      unique: true },
                username: { type: Sequelize.STRING,
                            unique: true},
                password: { type: Sequelize.STRING},
                salt: { type: Sequelize.STRING },
                isAdmin: { type: Sequelize.BOOLEAN,
                           defaultValue: false },
                createdAt: { type: Sequelize.DATE,
                             allowNull: false },
                updatedAt: { type: Sequelize.DATE,
                             allowNull: false }
              },
              { sync: {force:true}
              }
      );
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('Users');
  }
};