'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const mongoose = require('mongoose')

require('dotenv').load();

const app = express()

//Load model for DB connections
require('./server/models/user')
require('./server/models/book')

//Connect to MongoDB
mongoose.Promise = global.Promise;
const MONGO_URL = process.env.MONGO_URL ;
console.log('MONGO_URL is',MONGO_URL)
mongoose
  .connect(MONGO_URL, { useMongoClient: true })
  .then(() => {
    console.log(`Connected to mongoDB at ${MONGO_URL}`);
  })
  .catch((err) => {
    console.error(`Fail to connect to mongoDB at ${MONGO_URL}:\n${err}`);
    console.info('Please double check your mongoDB instance and try again');
    process.exit(1);
  });

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, 'client/build')))
app.use(bodyParser.urlencoded({ extended: false }));

// passport middleware
app.use(passport.initialize());

// load passport strategies
const localRegisterStrategy = require('./server/passport/local-register');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-register', localRegisterStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

//Listen to port
const PORT = process.env.PORT || 6000
app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}`)
})