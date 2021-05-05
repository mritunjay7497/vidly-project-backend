module.exports = function (req,res,next){
    // if not admin send 403 response
    if(!req.user.isAdmin){
        return res.status(403).send("Forbidden, access denied .");
    };

    // if admin, transfer control to route handler
    next();

};