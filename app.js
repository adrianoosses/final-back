require('dotenv').config()
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
//const http = require('http').Server(app);
//const io = require('socket.io')(http);
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server:server});

//let ap = require('./routes/appointment.js');
let us = require('./routes/user.js');
let product = require('./routes/product.js');
let chat = require('./routes/chat.js');
let image = require('./routes/image.js');
let userScore = require('./routes/userScore.js');
let offer = require('./routes/offer.js');
let productFavorite = require('./routes/productFavorite.js');

let cors = require('cors');

wss.on('connection', function connection(ws){
    console.log("A new client connected");
    ws.send("HOLAAA cliente");

    ws.on('message', function incoming(message){
        console.log("Received:", message);
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        })
    })
});

// asignacion del puerto 3000 para el servidor
const PORT = process.env.PORT || 3001;
app.use(express.json());

//CORS
app.use(cors());

//app.use('/appointment', ap.routes);
app.use('/user', us.routes);
app.use('/offer', offer.routes);
app.use('/product', product.routes);
app.use('/chat', chat.routes);
app.use('/image', image.routes);
app.use('/userscore', userScore.routes);
app.use('/productfavorite', productFavorite.routes);

app.get('/', (req, res) => res.send("Hello word"));

//app.listen(PORT, () => console.log(`Server running ${PORT}`));
server.listen(PORT, () => console.log(`Server running ${PORT}`));

['unhandledRejection', 'uncaughtException'].forEach(event => process.on(event, (err) => {
    console.error(`unhandled error: ${err.stack || err}`);
}));