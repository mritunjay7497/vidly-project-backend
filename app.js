const express = require('express');
const genereRoutes = require('./router/generes');
const customerRoutes = require('./router/customer');
const movieRoutes = require('./router/movie');
const login = require('./router/login');
const signup = require('./router/user');
const home = require('./router/home');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Route to home page
app.use('/',home);

// Routing middleware for generes
app.use('/api/generes',genereRoutes);

// Routing middleware for customers
app.use('/api/customers',customerRoutes);

// Routing middleware for movies
app.use('/api/movies',movieRoutes);

// Routing middleware for login
app.use('/api/login',login);

// Routing middleware for sign-up
app.use('/api/users',signup);

// Port
const port = process.env.PORT || 1111;
app.listen(port, () => console.log(`Listening on port ${port} ...`));