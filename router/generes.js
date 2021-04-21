const express = require('express');
const Joi = require('joi');

const router = express.Router();

const generes = [
    {'id':1,'name':'Action'},
    {'id':2,'name':'Comedy'},
    {'id':3,'name':'Horror'},
    {'id':4,'name':'Romance'},
    {'id':5,'name':'Thriller'},
    {'id':6,'name':'Sci-fi'},
];

// Route to Generes list
router.get('/',(req,res) => {
    res.status(200).send(generes);
});

// Route to get a particular generes
router.get('/:id',(req,res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if(!genere){
        res.status(404).send('Requested genere not found !!');
        return;
    };
    res.status(200).send(generes);
});

// Route to add a new genere
router.post('/',(req,res) => {
    const { error } = validateGenere(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };
    const genere ={
        id : generes.length + 1,
        name : req.body.name
    };
    generes.push(genere);
    res.send(generes);
});

router.put('/:id',(req,res) => {
    // Look up the genere, if not found return 404
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if(!genere){
        return res.status(404).send("No such generes found, try looking up again ...");
    };

    // Validate the name of genere entered by the user
    const { error } = validateGenere(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    };

    // Update the genere
    genere.name = req.body.name;

    // send the udated genere
    res.send(genere);
});

router.delete('/:id',(req,res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if(!genere){
        return res.status(404).send("No such generes found ...");
    };
    // Delete genere
    const index = generes.indexOf(genere);
    generes.splice(index,1);

    res.send(generes);
})

// Validate Genere
function validateGenere(genere){
    const schema = {
        name: Joi.string().min(5).required()
    };
    return Joi.validate(genere,schema);
};

module.exports = router;