const express = require('express');
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');

const routes = express.Router();

//AuthController
routes.post('/auth', AuthController.auth);
// routes.post('/recovery', AuthController.recoverPass);
// routes.post('/recoverCode', AuthController.checkRecoverCode);
// routes.put('/updateForgotPass', AuthController.updateForgotPass);
// routes.get('/token', AuthController.getUserByToken)

routes.get('/users/store', UsersController.store);
routes.get('/users', UsersController.getAllUsers);


module.exports = routes;