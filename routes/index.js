var express = require('express');
var router = express.Router();
var multer  = require('multer');

var photos_dir = process.env.PHOTOS_DIR || './media/';

var photoController = require('../controllers/photo_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');

router.param('photoId',photoController.load); // autoload :photoId
router.param("userId", userController.load);

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/photos', photoController.list);

router.get('/photos/new', photoController.new);

router.get('/photos/:photoId(\\d+)', photoController.show);

router.post('/photos', multer({inMemory: true}), photoController.create);

router.delete('/photos/:photoId(\\d+)', photoController.destroy);
// definición de rutas de sesión
router.get('/session',sessionController.new);
router.post('/session',sessionController.create);
router.delete('/session',sessionController.destroy);
//gestion de usuarios
router.get('/users',                  userController.index);
router.get('/users/:userId(\\d+)',    userController.show);
router.get('/users/new',                  userController.new);
router.post('/users',                  userController.create);
router.get('/users/:userId(\\d+)/edit',userController.edit);
router.put('/users/:userId(\\d+)', userController.update);
router.delete('/users/:userId(\\d+)',userController.destroy);

module.exports = router;