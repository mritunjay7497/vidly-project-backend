const mongoose = require('mongoose');
const dotenv = require('dotenv');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// loads the local .env file into process.env
dotenv.config();

// connecting to the mongoDB
const dburi = process.env.dbURI;
const secret = process.env.jwtSecret;


mongoose.connect(dburi,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("connected to the vidly-movie-backend database"))
    .catch((err) => console.log("ERROR\n",err.message));

// User schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength: 4,
        maxlength: 50,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password:{
        type:String,
        minlength: 8,
        required:true,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function(){
    const token  = jwt.sign({_id: this._id},secret);
    return token;
}

// User model based on above schema
const UserModel = new mongoose.model('user',userSchema);

// register a new user
async function addUser(userName,userEmail,userPassword){

    // Search for the email, if already registered
    const isRegistered = await UserModel
        .findOne({email: userEmail})

    // if no user is registered witht he given email, register this new user
    if(isRegistered){
        return "User already registered, try Login instead !!"
    };

    // hash the password send by the user before storing it in databse
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(userPassword,salt);

    const user = new UserModel({
        name: userName,
        email: userEmail,
        password: hashedPassword
    });
    await user.save();

    const token = user.generateAuthToken();

    const response = _.pick(user,['name','email']);

    return(
        {
            response,
            token
        }
    );
};


// get user profile
async function getUser(id){
    const user = await UserModel.findById(id).select('-password');
    return user;
};

module.exports = { addUser,getUser };
// module.exports = UserModel;