require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes/routes');
const { url } = require('./configs/database.config');
const { port } = require('./configs/server.config');
const expressValidator = require('express-validator');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

mongoose.Promise = global.Promise;
/**
 * Connecting to the database *
 */
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now ', err);
    process.exit();
  });

/**
 * Express Validator Middleware
 */
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      const namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);
/***
 * all the routes
 */
app.use('/', route);

/**
 * listening to port below
 */
app.listen(port, () => console.log(`Example app listening on ${port} port!`));
