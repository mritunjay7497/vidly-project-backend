const express = require('express');
const router = express.Router();


// Route to get the home page
router.get('/',(req,res) => {
    res.status(200).send('Welcome to Vidly movie house..!!');
});

module.exports = router;