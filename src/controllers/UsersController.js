const UsersModel = require("../models/UsersModel");
const { validationResult } = require("express-validator");


const UsersController = {
  showProfilePage:(req, res)=>{

    res.render("userProfile.ejs");
  },
  showRegisterPage:(req, res)=>{

    return res.render("userRegisterForm.ejs");

  },
  processRegister:(req, res)=>{
    const resultValidations = validationResult(req);

    if(resultValidations.errors.length > 0){
      return res.render("userRegisterForm.ejs", {errors:resultValidations.mapped(), old:req.body})
    }

    return res.send("Informações enviadas com sucesso!");
  },
  showLoginPage:(req, res)=>{

    return res.render("userLoginForm.ejs");
  },
  processLogin:(req, res)=>{
    const resultValidations = validationResult(req);

    if(resultValidations.errors.length > 0){
      return res.render("userLoginForm.ejs", {errors:resultValidations.mapped(), old:req.body})
    }

    return res.send("Usuário Registrado com sucesso!");
  },
  logout:(req, res)=>{
    
  }
}

module.exports = UsersController;