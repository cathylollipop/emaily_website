const express = require('express'); //require is CommonJS modules. import syntax is from es2015 modules that node doesn't support
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); // app is an Expree App to register this route handler with

// app.get is a route handler - get post put(update all the properties of something) delete patch(update one or two properties of something)
// app.get('/', (req, res) => {
//     res.send({ bye: 'buddy' });
// });

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // the cookie will take 30 days to expire
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); //instructs Express to tell NodeJS which port to listen to