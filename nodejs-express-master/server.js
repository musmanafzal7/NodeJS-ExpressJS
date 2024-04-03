require('dotenv').config()
const express = require('express');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const { swaggerDocs } = require('./utils/swagger');
const port = process.env.PORT || 3002;
const isDevelopment = process.env.NODE_ENV !== 'production';
const routes = require('./routes');
const app = express();

// enables cors for swagger  docs enables explorer 
const cors_options = {
    explorer: true
}

app.use(cors(cors_options));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET,PUT,PATCH,POST,DELETE,OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// APP SETUP
app.use(morgan(isDevelopment ? 'dev' : 'combined'));


// Routing to the v1
app.use('/api/v1', routes);

app.get('/', (req, res, next) => {
    res.json({message: 'Welcome to the BoilerPlate NodeJs RestAPI'});
});

/* eslint-disable no-unused-vars */
if (app.get('env') === 'development' || app.get('env') === 'test') {
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500);
        res.json({
            success: false,
            errors: err.errors,
            meta: {
                code: err.statusCode,
                stack: err.stack,
                message: err.message,
            },
        });
    });
}

// Start the server
http.createServer(app).listen(port, async () => {
    console.log('Server listening on: ', port);
    swaggerDocs(app, port);
});
