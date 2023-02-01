const path = require("path");
const multer = require("multer");
/*podemos usar tanto o check quanto o body
  ambos vão fazer a mesma coisa*/
  const { check } = require("express-validator");


const validations = [
  check("name")
    .notEmpty().withMessage("O campo nome NÃO pode ser enviado vazio!").bail()
    .isString().withMessage("O campo nome NÃO aceita números!").bail()
    .trim(),

  check("email")
    .notEmpty().withMessage("O campo email NÃO pode ser enviado vazio!").bail()
    .trim().bail()
    .normalizeEmail().bail()
    .isEmail().withMessage("Digite um formato de email correto!"),

  check("password")
    .notEmpty().withMessage("O campo senha NÃO pode ser enviado vazio!").bail()
    .isLength({ min:6 }).withMessage("A senha precisa ter no mínimo 6 caracteres!").bail()
    .trim(),

  check("avatar").custom((value, {req})=>{
    let file = req.file;
    let acceptedExtentions = [".jpg", ".png", ".gif"];

    if(!file){
      throw new Error("Precisa escolher um arquivo");
    }else{
      let fileExtension = path.extname(file.originalname);
      if(!acceptedExtentions.includes(fileExtension)){
        throw new Error(`As extensões permitidas são ${acceptedExtentions.join(", ")}`);
      }
    }
    return true;
  })  
];


module.exports = validations;