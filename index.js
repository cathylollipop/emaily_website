const express = require('express'); //require is CommonJS modules. import syntax is from es2015 modules that node doesn't support
const app = express(); // app is an Expree App to register this route handler with


// a route handler - get post put(update all the properties of something) delete patch(update one or two properties of something)
app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT); //instructs Express to tell NodeJS which port to listen to