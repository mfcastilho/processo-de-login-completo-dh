
//=== IMPORTAÇÕES ===
const express = require("express");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes/homeRoutes");
const session = require("express-session");
const cookies = require("cookie-parser");


const loggedUserDataMiddleware = require("./middlewares/loggedUserDataMiddleware");

//=== VARIÁVEIS ===
const app = express();
const port = 8000;


//Template Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));



//=== MIDDLEWARES ===
app.use(session({
  secret:"senhamuitosecreta",
  resave:false,
  saveUninitialized:false
}));

app.use(cookies());

app.use(loggedUserDataMiddleware)

app.use(express.json());
app.use(express.static(path.resolve("src", "public")));

/*Para podermos enxergar e ler corretamente 
as informações enviadas de um formulário
devemos usar o middleware express.urlencoded*/
app.use(express.urlencoded({ extended:false }));


//=== ROTAS ===
app.use(userRoutes);
app.use(homeRoutes);


//=== CONFIGURAÇÃO DO SERVIDOR ===
app.listen(port, ()=>{
  console.log(`O servidor está rodando na porta:${port}`);
});