require('dotenv').config();

const port = process.env.PORT || 5478;

// import

const express = require('express');
const router = require('./app/router');
const bodyParser =require('body-parser');
const session = require('express-session');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.json());

const expireDate = 1000 * 60 * 60 * 2;
app.use(session({
    resave : true,
    saveUninitialized : true,
    secret: 'c5613C06f85d2b50',
    cookie : {
        maxAge: expireDate,
        sameSite : true,
        token : '',
    }
}));

const expressSwagger = require('express-swagger-generator')(app);
let options = require('./swagger-config.json');
options.basedir = __dirname;

expressSwagger(options);

app.use('/v1', router);

app.listen(port, () => { console.log(`Listening on http://localhost:${port}`) });
