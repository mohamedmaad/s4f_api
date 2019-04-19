const express = require("express");
const mongoose = require("mongoose");
const authRoute = express.Router();

let User = require('../models/users');

authRoute.post("/login", (req,res) => {
    // checker si l'user et password exist dans la base de donnees
    User.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {
        // si l'user avec le mot de passe exist 
        if(user) {
            // envoyer une response avec status et email
            res.json({status: "loged", data: req.body.email})
            // ca c'est pour nous
            console.log("V :", user.email, " : is loged in");
        }
        else {
            // sinon envoyer une response avec l'erreur
            res.json({status: "error", data: req.body.email})
            // et autre fois ca c'est pour nous
            console.log(`X : tentative de se connecter avec ${req.body.email} et ${req.body.password}`)
        }
    });
});

authRoute.post("/register", (req,res) => {
    console.log(req);

    // on fait une petite recherche pour savoir si l'email exsist
    // dans la collection users
    User.findOne({email: req.body.email}, (err, user) => {
        // si l'user est deja existant dans la collections users
        if(user) {
            // envoyer l'email et le status
            res.json({status: "exists", data: req.body.email});
            console.log(user.email, "Deja exsistant dans la base de donnees")
        }
        // si l'user n'est pas deja inscrit dans la collection users
        else {
            console.log(err)
            // preparer  les donnees qu'on a recuperer
            // de la request post
            let newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                password: req.body.password,
                civility: req.body.civility,
                birthday: req.body.birthday,
                adress: req.body.adress,
                type: "admin"
            });
            // on save les donnees ici
            newUser.save((err,user) => {
                if(err) {
                    // si il y a une erreur on envoie
                    // un objet json avec l'erreur
                    res.json({status: err});
                    // ca c'est pour nous ca XD !
                    return console.log(err)
                }
                if(user) {
                    // si on arriver ici ca veut dire qu'on a reussi a enregister le nouveau user
                    // donc comme d'hab >> on envoie une response : status - email enregistré
                    res.json({status: "saved", data: newUser.email})
                    console.log("user a ete bien enregistrer")
                }
            });
        }
    })
});

module.exports = authRoute;
