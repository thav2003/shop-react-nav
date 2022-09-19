import  express from 'express';
import cors from 'cors';
import router from './controller/controller.js';
import path from 'path';
import { createServer } from "http";
import { Server } from "socket.io";



import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
/*app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});*/


app.use('/shop', express.static(__dirname +'/assets'));
app.use('/shop', router)

const server = createServer(app);
const io =new Server(server)
//let msg = {message: 'Actual Message', sender: 'Name of sender'}
io.on('connection', (socket) => {
    console.log("Made socket connection", socket.id, );

    socket.on("chat message", msg => {

        console.log(msg);

        io.emit("chat message", msg);

    });

    socket.on("disconnect", () => {

        io.emit("user disconnected", socket.userId);

    });
});

const portapp =  4000;
const portsv =  4001;
server.listen(portsv, () => console.log('Socket io listening on port ' + portsv));
app.listen(portapp, () => console.log('Server listening on port ' + portapp));