'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
var photos_url = process.env.PHOTOS_URL || "http://localhost:8000"
      return queryInterface.bulkInsert('Photos', [ 
         {name: 'Wood',url: photos_url + '/photos/photo1.jpg'},
         {name: 'Man',url: photos_url + '/photos/photo2.jpg'},
         {name: 'Desktop',url: photos_url + '/photos/photo3.jpg'},
         {name: 'Woman',url: photos_url + '/photos/photo4.jpg'},
          {name: 'People',url: photos_url + '/photos/photo5.jpg'},
        ]);
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Photos', null, {});
  }
};
