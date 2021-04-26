// Endpoint to do CRUD operation on generes

const express = require('express');
const Joi = require('joi');
const {addGenere,getGeneres,updateGenere,deleteGenere } = require('../database/generes');

const genereRoute = express.Router();

// Route to get all Generes list
genereRoute.get('/',(req,res) => {

    const genereList = getGeneres()
        .then(function(genere) {
            res.send(genere);
        })
        .catch((err) => console.log(err));

});


//  Route to get a particular generes
// TODO
// router.get('/:name',(req,res) => {
//     // const genere = generes.find(g => g.id === parseInt(req.params.id));
//     // if(!genere){
//     //     res.status(404).send('Requested genere not found !!');
//     //     return;
//     // };
//     const genere = getGeneres()
//     res.send(genere);
// });


// Route to add a new genere
genereRoute.post('/',(req,res) => {
    const { error } = validateGenere(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };

    // add a new genere to database upon post request
    const genere = addGenere(req.body.name)
        .then(() => res.send("Genere added successfully ..."))
        .catch((err) => console.log(err));
});


// Route to update a  genere
genereRoute.put('/:oldname',(req,res) => {

    // Validate the name of genere entered by the user
    const { error } = validateGenere(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    };

    // send the udated genere
    const updatedGenere = updateGenere(req.params.oldname,req.body.name)
        .then((genere) => res.send(genere))
        .catch((err) => console.log(err));

});


// Route to delete a genere
genereRoute.delete('/:name',(req,res) => {

    // Validate the name of genere entered by the user
    const { error } = validateGenere(req.body.name);
    if(error){
        return res.status(400).send(error.details[0].message);
    };

    // Delete a genere
    const deletedGenere = deleteGenere(req.params.name)
        .then(() => res.end())
        .catch((err) => console.log(err));

})


// Validate Genere
function validateGenere(genere){
    const schema = {
        name: Joi.string().min(5).required()
    };
    return Joi.validate(genere,schema);
};

// export this module
module.exports = genereRoute;