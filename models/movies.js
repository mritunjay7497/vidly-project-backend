// Endpoint to do CRUD operation on movies

const mongoose = require('mongoose');
const { genereSchema } = require('./generes')
const dotenv = require('dotenv');

// loads the local .env file into process.env
dotenv.config();

// connecting to the mongoDB
dburi = process.env.dbURI;

mongoose.connect(dburi,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("connected to the vidly-movie-backend database"))
    .catch((err) => console.log("ERROR\n",err.message));


// Initialise genere model based on genere schema
// const genereModel = new mongoose.model('Genere',genereSchema);


// Movie schema
const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        minlength: 5,
        maxlength: 50
    },
    numberInStock: {
        type: Number,
        required:true
    },
    dailyRentalRate: {
        type:Number,
        required:true,
        min: 0,
        max: 255
    },
    genere: {
        type: genereSchema,
        required: true,
        min:0,
        max:255
    }

});

// initialise movie model based on movie schema
const MovieModel = new mongoose.model('movie',MovieSchema);

// Add a movie function via a post request to
// http://localhost:1111/api/movie

async function addMovie(movieName,numbers,rate,genere) {
    const movie = new MovieModel({
        Name: movieName,
        numberInStock: numbers,
        dailyRentalRate: rate,
        genere: {
            // _id: genere._id,
            name: genere.name
        }
    });
    return await movie.save();
};

module.exports = { addMovie };