const FicheUser = require("../models/FicheUser");

exports.readAllFicheUserQuery = (select) => {
  return FicheUser.find({}).select(select);
}

exports.readOneFicheUserQuery = (id, select) => {
  return FicheUser.findById({ _id: id }).select(select).exec();
}

exports.findByIdAndDeleteQuery = (id) => {
  return FicheUser.findByIdAndDelete({_id: id}).exec();
}













