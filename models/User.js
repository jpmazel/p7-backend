//importation  de crypto-js pour chiffrer le mail
const cryptojs = require("crypto-js");

//importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");

//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
const result = dotenv.config();

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  //méthode pour chiffrer et déchiffrer l'email
  emailChiffrement() {
    const emailCryptoJs = cryptojs
      .HmacSHA256(this.email, `${process.env.CRYPTOJS_EMAIL}`)
      .toString();
    return emailCryptoJs;
  }

  //méthode pour hasher le mot de passe
  hashPassword = async function () {
    try {
      const hashPassword = bcrypt.hash(this.password, 10);      
      return hashPassword;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = User;
