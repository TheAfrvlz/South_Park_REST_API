const express = require('express');
const morgan = require("morgan");
const app = express();

app.set('port', process.env.PORT || 3000);

//middleware
app.use(morgan('dev'));
app.set('json spaces',2)

//va a tratar datos de input de formularios
app.use(express.urlencoded({extended:false}));

//permite recibir formatos json
app.use(express.json());

app.use(require('./src/Routes/ServerRoutes'));
app.use('/API',require('./src/Routes/API'))
//start server

app.listen(app.get('port'));