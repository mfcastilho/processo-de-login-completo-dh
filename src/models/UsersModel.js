const path = require("path");
const fs = require("fs");
const database = require("../database/database.json");
const pathDatabase = path.resolve("src", "database", "database.json");

const {v4:makeId} = require("uuid");


const UsersModel = {
  findAll:()=>{
    return database.users;
  },

  findUserById:(userId)=>{
    const users = database.users;

    const userFound = users.find(user => user.id == userId);

    return userFound;
  },
  findUserByEmail:(userEmail)=>{
    const users = database.users;

    const userFound = users.find(user => user.email== userEmail);

    return userFound;
  },
  findUserByFields:(field, value)=>{
    const users = database.users;

    const userFound = users.find(user => user[field]== value);

    return userFound;
  },
  generateId:()=>{

    const users = database.users;

    let lastUser =users.pop();

    if(lastUser){
      return lastUser.id + 1;
    }

    return 1;

  },
  create:(userData)=>{

    
    let newUser = {
      id: makeId(),
      ...userData
    }

    database.users.push(newUser);
    const dbJSON = JSON.stringify(database);
    fs.writeFileSync(pathDatabase, dbJSON);

    return newUser;
  }
}


module.exports = UsersModel;