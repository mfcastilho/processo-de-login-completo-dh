const path = require("path");
const fs = require("fs");
const database = require("../database/database.json");


const UsersModel = {
  findAll:()=>{

    return database.users;
  }
}