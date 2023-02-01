const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");


//=== CONTROLLERS ===
const UsersController = require("../controllers/UsersController");



//=== MIDDLEWARES ===
const uploadFile = require("../middlewares/multerMiddlewares");
const validations = require("../middlewares/validationRegisterMiddleware");




//=== Formulário de registro ===
router.get("/user/register",UsersController.showRegisterPage);

//Processar o registro
router.post("/user/register", uploadFile.single("avatar"), validations, UsersController.processRegister);


//=== Formulário de login ===
router.get("/user/login", UsersController.showLoginPage);


//Processar o login
router.post("/user/login", validations, UsersController.processLogin);


//Perfil do usuário
router.get("/profile/", UsersController.showProfilePage);


//Logout
router.get("/logout/", UsersController.logout);


module.exports = router;