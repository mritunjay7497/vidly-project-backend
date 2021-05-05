// Endpoint to do CRUD operation on customers

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// loads the local .env file into process.env
dotenv.config();

// connecting to the mongoDB
dburi = process.env.dbURI;

mongoose.connect(dburi,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("connected to the vidly-movie-backend database"))
    .catch((err) => console.log("ERROR\n",err.message));

// Customer schema
const customerSchema = new mongoose.Schema({
    name:{
        required: true,
        minlength: 5,
        maxlength: 20,
        type: String,
        trim: true
    },
    age:{
        required: true,
        type: Number
    },
    phone:{
        required: true,
        type: String
    },
    isGold:{
        required: true,
        type: Boolean
    }
});

// get the customer model from above schema
const Customer = new mongoose.model('customer',customerSchema);

// Instantiating the above model to make a document and save it to the
// database upon a POST request to http://localhost:1111/api/customers
async function addCustomer(name,age,phone,isGold){
    const customer = new Customer({
        name: name,
        age: age,
        phone: phone,
        isGold: isGold
    });
    // save the document formed by above model
    return await customer.save();
};

// get the customer from the database upon a GET request to http://localhost:1111/api/customers
async function getCustomers(){
    const customers = await Customer
        .find()
        .sort({name:1})
    return customers;
};


// update the customer name once the old customer name is sent as a parameter via
// a PUT request to http://localhost:1111/api/customers/:oldName
async function updateCustomer(oldName,newName,newPhone,isGold,newAge){
    let query = { name:oldName };

    const customer = await Customer
        .findOneAndUpdate(
            query,
            { 
                name: newName,
                age:  newAge,
                phone:  newPhone,
                isGold: isGold
            },
            {new:true}
        )
        .select({name:1,age:1,phone:1,isGold:1,id:1});

    return await customer;
};

// Delete a customer name once the old customer name is send as a parameter via
// a DELETE request to http://localhost:1111/api/customers/:oldname

async function deleteCustomer(oldName){
    const customer = await Customer
        .findOneAndDelete(
            {name:oldName}
        )
        .select({name:1,id:1})
    
    if(!customer){
        return "No such customer found with the given information ..."
    };
    
};

module.exports = { addCustomer,getCustomers,updateCustomer,deleteCustomer }