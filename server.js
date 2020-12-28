const app = require('express')();
const http = require('http').createServer(app);
var cors = require('cors');
const io = require('socket.io')(http
    , {
        cors: {
            origin: "http://localhost:4200",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
    console.log(socket.id);
    console.log('a user connected');
  
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    //broadcating to all except sender
    socket.broadcast.emit("hello", "new user joined");

   //emitting events from server
    socket.emit("hello", "world");



    //listening events from client 
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
      });
});


http.listen(3000, () => {
    console.log('listening on :3000');
});