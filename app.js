const express = require('express');
const route = require('./router/generes');
const home = require('./router/home');

const app = express();

app.use(express.json());

// Route to web-root dir
app.use('/',home);

// Routing middleware
app.use('/api/generes',route);

// Port
const port = process.env.PORT || 1111;
app.listen(port, () => console.log(`Listening on port ${port} ...`));