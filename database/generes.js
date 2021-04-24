const mongoose = require('mongoose');
const dotenv = require('dotenv');

// loads the local .env file into process.env
dotenv.config();

// connecting to the mongoDB
dburi = process.env.dbURI;
// console.log(dburi);

mongoose.connect(dburi,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("connected to the vidly-movie-backend database"))
    .catch((err) => console.log("ERROR\n",err.message));


// Build schema for generes data documents
const genereSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: 5,
        maxlength: 30
    },
    isAdult: Boolean,
    enum: ['Action','Comedy','Horror','Romance','Thriller','Erotic','Drama']
});

// comoile a model from above schema and save the data to the database
const GenereModel = new mongoose.model('Genere',genereSchema);



// Instantiating the above model to make a document and save it to the
// database upon a POST request to http://localhost:1111/api/generes
async function addGenere(genereName){
    const genere = new GenereModel({
        name: genereName
    });
    // save the document formed by above model
    return await genere.save();
    // return genere;
};


// get the generes from the database upon a GET request to http://localhost:1111/api/generes
async function getGeneres(){
    const generes = await GenereModel
        .find()
        .sort({name:1})
        .select({name:1,id:1})
    return (generes);
};

// update the genere name once the old genere name is sent as a parameter via
// a PUT request to http://localhost:1111/api/generes/:oldName
async function updateGenere(oldName,newName){
    const genere = await GenereModel
        .findOneAndUpdate(
            {name: oldName},
            {name: newName},
            {new:true}
        )
        .select({name:1,id:1})


    // genere.name = newName;
    return await genere;
};

// Delete a genere name once the old genere name is send as a parameter via
// a DELETE request to http://localhost:1111/api/generes/:oldname

async function deleteGenere(oldName){
    const genere = await GenereModel
        .findOneAndDelete(
            {name:oldName}
        )
        .select({name:1,id:1})
};

module.exports = { addGenere,getGeneres,updateGenere,deleteGenere };