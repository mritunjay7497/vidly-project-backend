const express = require('express');
const Joi = require('joi');
const userAuth = require('../models/login');

const loginRoute = express.Router();

// Route to authenticate the user

loginRoute.post('/',(req,res) => {
    const { error } = validateCreds(req.body);

    if(error){
        return res.status(400).send("Bad request !!");
    };

    const validCreds = userAuth(req.body.email,req.body.password)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});


function validateCreds(creds){
    const schema = {
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().required().min(8).max(255)
    };
    return Joi.validate(creds,schema);
};

module.exports = loginRoute;