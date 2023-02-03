const UsersModel = require("../models/UsersModel");
const { validationResult } = require("express-validator");
const bcryt = require("bcrypt");


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

    //procurando na base de dados se ja tem algum usuário com esse email cadastrado
    let userExists = UsersModel.findUserByFields("email", req.body.email);


    //Se o email (se o usuário existe) já se encontra cadastrado então envia-se msg de erro para a view
    if(userExists){
      res.render("userRegisterForm.ejs", {
        errors:{
          email:{
            msg:"Este email já está cadastrado,"
          }         
        },
        old:req.body
      });
    }

    let image = req.file.filename;

    let userToCreate = {
      ...req.body,
      password: bcryt.hashSync(req.body.password, 10),
      avatar:image
    }

    let userCreated = UsersModel.create(userToCreate);

    return res.redirect("/user/login");
  },
  showLoginPage:(req, res)=>{

    return res.render("userLoginForm.ejs");
  },
  processLogin:(req, res)=>{


    const userToLogin = UsersModel.findUserByFields("email", req.body.email);
    console.log(userToLogin);

    if(userToLogin){

      let checkPassword = bcryt.compareSync(req.body.password, userToLogin.password);
      if(checkPassword){
        return res.redirect("/user/profile");
      }

      return res.render("userLoginForm.ejs", {
        errors: {
          password:{
            msg: "Senha inválida"
          }
        }
      });
    }

    return res.render("userLoginForm.ejs", {
      errors: {
        email:{
          msg: "Este email não foi encontrado"
        }
      }
    });

    // const resultValidations = validationResult(req);

    // if(resultValidations.errors.length > 0){
    //   return res.render("userLoginForm.ejs", {errors:resultValidations.mapped(), old:req.body})
    // }



    return res.send("Usuário Registrado com sucesso!");
  },
  logout:(req, res)=>{
    
  }
}

module.exports = UsersController; 