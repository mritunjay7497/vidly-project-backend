// Endpoint to do CRUD operation on customers

const express = require('express');
const Joi = require('joi');
const { addCustomer,getCustomers,updateCustomer,deleteCustomer } = require('../models/customer');
const authorize = require('../middleware/login');
const admin = require('../middleware/admin');

const customerRoute = express.Router();



// Route to get all the customer list
customerRoute.get('/',authorize,admin,(req,res) => {
    const customerList = getCustomers()
        .then((customers) => res.send(customers))
        .catch((err) => console.log(err));
});

// Route to get a particular customer
//  TODO



// Route to add a new customer
customerRoute.post('/',authorize,admin,(req,res) => {
    const { error } = validateCustomer(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    };

    // add a new customer to database upon post request
    const customer = addCustomer(req.body.name,req.body.age,req.body.phone,req.body.isGold)
        .then((person) => res.send(person))
        .catch((err) => console.log(err));
});




// Route to update an existing customer
customerRoute.put('/:name',authorize,admin,(req,res) => {
    const { error } = validateCustomer(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
    };

    // update an existing customer upon put request
    const customer = updateCustomer(req.params.name,req.body.name,req.body.age,req.body.phone,req.body.isGold)
        .then((person) => res.send(person))
        .catch((err) => console.log(err));

});

// Route to delete an existing customer
customerRoute.delete('/:name',authorize,admin,(req,res) => {
    // delete a customer whose name is supplied
    const customer = deleteCustomer(req.params.name)
        .then((person) => res.send("customer record deleted ..."))
        .catch((err) => console.log(err));
});




// Validate Customer
function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
        age: Joi.number().required(),
        isGold: Joi.boolean().required()
    };
    return Joi.validate(customer,schema);
};

module.exports = customerRoute;