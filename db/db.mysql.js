//importer le package pour utiliser les varaibles d'environnement
const dotenv = require("dotenv");
dotenv.config();

//importer mysql
const mysql = require("mysql");
console.log("process.env.reseau_social")
console.log(process.env.DB_NAME)

//les paramètres de connexion à la base de données
const mysqlconnection = mysql.createConnection({
  host: 'localhost',
  // database: `${process.env.DB_NAME}`,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password:  process.env.DB_PASSWORD
})

//la connexion à la base de données
mysqlconnection.connect((err)=>{
if(err){
  console.log(`error connecting: ${err}`);
} else{
  console.log("connecté à la base de donnée - reseau social");
  console.log(`connected as id ${mysqlconnection.threadId}`);
}
})

module.exports = mysqlconnection;