const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


//IMPORTAR ROUTER

const userRouter = require('./api/router/user');
app.use('/user',userRouter);

app.use('/client', require('./api/router/client'))

app.use('/factura', require('./api/router/factura'))



module.exports = app;


