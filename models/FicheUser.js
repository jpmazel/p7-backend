class FicheUser {
  constructor(userId, nom, prenom, age, job, bio, photoProfilUrl){
    this.userId = userId;
    this.nom = nom;
    this.prenom = prenom,
    this.age = age;
    this.job = job;
    this.bio = bio;
    this.photoProfilUrl = photoProfilUrl;
  }
}

module.exports = FicheUser;