const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");


//=== CONTROLLERS ===
const UsersController = require("../controllers/UsersController");
const loggedUserMiddleware = require("../middlewares/loggedUserMiddleware");
const notLoggedUserMiddleware = require("../middlewares/notLoggedUserMiddleware");

//=== MIDDLEWARES ===
const uploadFile = require("../middlewares/multerMiddlewares");
const validations = require("../middlewares/validationRegisterMiddleware");




//=== Formulário de registro ===
router.get("/user/register", loggedUserMiddleware,UsersController.showRegisterPage);

//Processar o registro
router.post("/user/register", uploadFile.single("avatar"), validations, UsersController.processRegister);


//=== Formulário de login ===
router.get("/user/login", loggedUserMiddleware, UsersController.showLoginPage);


//Processar o login
router.post("/user/login", validations, UsersController.processLogin);


//Perfil do usuário
router.get("/user/profile", notLoggedUserMiddleware, UsersController.showProfilePage);


//Logout
router.get("/user/logout/", notLoggedUserMiddleware, UsersController.logout);


module.exports = router;