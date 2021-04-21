const express = require('express');
const route = require('./router/generes');
const app = express();

app.use(express.json());


// Route to web-root dir
app.get('/',(req,res) => {
    res.status(200).send('Welcome to Vidly movie house..!!');
});

// Routing middleware
app.use('/api/generes',route)

// Port
const port = process.env.PORT || 1111;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

