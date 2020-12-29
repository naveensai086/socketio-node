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
     // welcome current user
     socket.emit("new user", "Welcome to chat..");

    //broadcating to all except new user
    socket.broadcast.emit("new user", "new user joined");

    //broadcasting to all for disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit("new user", " user left the chat");
    });
   



    //listen for chatMessage
    socket.on('chatMessage', (msg) => {
        console.log('message: ' + msg);
        //sending to all connected clients
        io.emit("new user", msg);
    });


});


http.listen(3000, () => {
    console.log('listening on :3000');
});