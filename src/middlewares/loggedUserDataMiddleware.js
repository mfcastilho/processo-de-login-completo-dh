

const loggedUserDataMiddleware = (req, res, next)=>{

  //locals é uma variável global do sistema, ou seja, tudo o que está
  //definido dentro dessa variável, como propriedade e seus valores,
  // pode ser acessada de qualquer parte sistema


  //estamos pegando a variável locals e inseri8ndo nela uma propriedade
  //chamada isLogged e passando o valor false
  res.locals.isLogged = false;


  //Se o usuário estiver logado, iremos passar para a propriedade
  //isLogged da variável locals o valor true
  if(req.session.userLogged){
    res.locals.isLogged = true;
  }

  next();

}


module.exports = loggedUserDataMiddleware;