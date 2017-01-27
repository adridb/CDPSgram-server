

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
           'Photos', 
           { id:        { type: Sequelize.INTEGER,  allowNull: false,
                          primaryKey: true,         autoIncrement: true,  
                          unique: true },
             name:  { type: Sequelize.STRING},
             url:    { type: Sequelize.STRING },
              createdAt: { type: Sequelize.DATE,     allowNull: false },
             updatedAt: { type: Sequelize.DATE,     allowNull: false }
           },
           { sync: {force: true}
           }
      );
  },
  down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Photos');
  }
};