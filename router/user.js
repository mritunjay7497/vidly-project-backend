const express = require('express');
const _ = require('lodash');
const Joi = require('joi');
const addUser = require('../models/user')
const userRoute = express.Router();

// Route to register a new user

userRoute.post('/',(req,res) => {
    const { error } = validateUser(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    };

    // add a new user to database upon post request
    const user = addUser(req.body.name,req.body.email,req.body.password)
        .then((usr) => res.send(usr))
        .catch((err) => console.log(err))
});


function validateUser(user){
    const schema = {
        name: Joi.string().required().min(4).max(50),
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().required().min(8).max(255)
    };
    return Joi.validate(user,schema);
};

module.exports = userRoute;