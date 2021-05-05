const express = require('express');
const Joi = require('joi');
const { addMovie } = require('../models/movies');
const { GenereModel } = require('../models/generes');
const authorize = require('../middleware/login');
const admin = require('../middleware/admin');

const movieRoute = express.Router();

// Route to add a movie
movieRoute.post( '/',authorize,admin,(req,res) => {
    // const { error } = validateMovie(req.body);

    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }; 

    // Add a new movie to database upon a post request
    // get the genere by id
    const genere = GenereModel.findById(req.body.genereId);

    // if genere not found, return error
    if(!genere){
        return res.status(404).send("Invalid genere !!");
    };
    // const movie = addMovie(req.body.name,req.body.number,req.body.rate,genere)
    //     .then((mov) => res.send(mov))
    //     .catch((err) => console.log(err));
});


// validate movie
// function validateMovie(movie){
//     const schema = {
//         title: Joi.string().min(5).max(500).required(),
//         number: Joi.number().min(0).required(),
//         rate: Joi.number().min(0).required(),
//         genereId: Joi.string().required()
//     };
//     return Joi.validate(movie,schema)
// };

module.exports = movieRoute;