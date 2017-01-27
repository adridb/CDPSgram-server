'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      re
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