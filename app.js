const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const generes = [
    {'id':1,'name':'Action'},
    {'id':2,'name':'Comedy'},
    {'id':3,'name':'Horror'},
    {'id':4,'name':'Romance'},
    {'id':5,'name':'Thriller'},
    {'id':6,'name':'Sci-fi'},
];

// Route to web-root dir
app.get('/',(req,res) => {
    res.status(200).send('Welcome to Vidly movie house..!!');
});

// Route to Generes list
app.get('/api/generes',(req,res) => {
    res.status(200).send(generes);
});

// Route to get a particular generes
app.get('/api/generes/:id',(req,res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if(!genere){
        res.status(404).send('Requested genere not found !!');
        return;
    };
    res.status(200).send(generes);
});

// Route to add a new genere
app.post('/api/generes',(req,res) => {
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

app.put('/api/generes/:id',(req,res) => {
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

app.delete('/api/generes/:id',(req,res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if(!genere){
        return res.status(404).send("No such generes found ...");
    };
    // Delete genere
    const index = generes.indexOf(genere);
    generes.splice(index,1);

    res.send(generes);
})


// Port
const port = process.env.PORT || 1111;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

// Validate Genere
function validateGenere(genere){
    const schema = {
        name: Joi.string().min(5).required()
    };
    return Joi.validate(genere,schema);
};