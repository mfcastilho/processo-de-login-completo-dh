const UsersModel = require("../models/UsersModel");
const { validationResult } = require("express-validator");
const bcryt = require("bcrypt");


let users = UsersModel.findAll();


const UsersController = {
  showProfilePage:(req, res)=>{

    //chamando o cookie de nome userEmail que foi criado
    //dentro do método processLogin
    console.log(req.cookies.userEmail)

    res.render("userProfile.ejs", {userLogged: req.session.userLogged});
  },
  showRegisterPage:(req, res)=>{

    // res.cookie("teste", "olá gente", {maxAge:10000});
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
    // console.log(req.cookies.teste);
    return res.render("userLoginForm.ejs");
  },
  processLogin:(req, res)=>{

    
    

  let userToLogin = UsersModel.findUserByFields("email", req.body.email);
    // console.log(userToLogin);
    console.log(req.session);
    console.log(userToLogin);

   
    console.log(users);

    // const password = userToLogin.password;

    // if(!res.locals.isLogged){
      
  
    //   const user = users.find(user=>user.id == userToLogin.id);

    //   userToLogin.password = user.password;

    //   console.log(user);
    // }
    

    if(userToLogin){

      let checkPassword = bcryt.compareSync(req.body.password, userToLogin.password);
      
      if(checkPassword){

        delete userToLogin.password;
        //inserindo uma nova propriedade a session chamada de userLogged,
        //que recebe as informações do usuário 
        req.session.userLogged = userToLogin;
        

        //Se o checkbox da vista userLoginForm.ejs foi selecionado,
        //quer dizer que iremos criar um novo cookie, passando as 
        //seguintes informações:o nome do cookie:"userEmail"
        //o valor: req.body.email
        //e a duração: 30 minutos
        if(req.body.remember_user){
          res.cookie("userEmail", req.body.email, {maxAge: (1000 * 60) * 30});
        }

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

    return res.send("Usuário Registrado com sucesso!");
  },
  logout:(req, res)=>{
    res.clearCookie("userEmail");
    req.session.destroy();

    return res.redirect("/");
  }
}

module.exports = UsersController; 