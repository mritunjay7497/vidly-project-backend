const express = require('express');
const Joi = require('joi');
const {addGenere,getGeneres,updateGenere,deleteGenere } = require('../database/generes');

const router = express.Router();

// Route to get all Generes list
router.get('/',(req,res) => {

    const genereList = getGeneres()
        .then(function(genere) {
            res.send(genere);
        })
        .catch((err) => console.log(err));

});


// Route to get a particular generes
router.get('/:id',(req,res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if(!genere){
        res.status(404).send('Requested genere not found !!');
        return;
    };
    res.status(200).send(genere);
});


// Route to add a new genere
router.post('/',(req,res) => {
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


// Route to add a new genere
router.put('/:oldname',(req,res) => {

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
router.delete('/:name',(req,res) => {

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
module.exports = router;