const jwt = require('jsonwebtoken');
const secret = process.env.jwtSecret;

function authorize(req,res,next) {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).send('Access denied. No access token.');
    };

    try{
        const payload = jwt.verify(token,secret);
        req.user = payload;
        next();
    } catch (excp){
        res.status(400).send('Invalid token.');
    }
};

module.exports = authorize;