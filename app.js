const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
//let ap = require('./routes/appointment.js');
let us = require('./routes/user.js');
let cors = require('cors');


// asignacion del puerto 3000 para el servidor
const PORT = process.env.PORT || 3000;
app.use(express.json());

//CORS
app.use(cors());


//app.use('/appointment', ap.routes);
app.use('/user', us.routes);
app.get('/', (req, res) => res.send('Welcome'));

app.listen(PORT, () => console.log(`Server running ${PORT}`));

['unhandledRejection', 'uncaughtException'].forEach(event => process.on(event, (err) => {
    console.error(`unhandled error: ${err.stack || err}`);
}));