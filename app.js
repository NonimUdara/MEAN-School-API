const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database'+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error'+err);
});

const students = require('./routes/studentroute');
const teachers = require('./routes/teacherroute');
const maths = require('./routes/mathsroute');
const bio = require('./routes/bioroute');
const arts = require('./routes/artroute');
const commerce = require('./routes/commerceroute');
const technology = require('./routes/technologyroute');
const resources = require('./routes/resourceroute');
const contactus = require('./routes/contactusroute');

// CORS Middleware
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());

//app.use(passport.session());
require('./config/passport')(passport);

app.use('/students', students);
app.use('/teachers', teachers);
app.use('/maths', maths);
app.use('/bio', bio);
app.use('/arts', arts);
app.use('/commerce', commerce);
app.use('/technology', technology);
app.use('/resources', resources);
app.use('/contactus', contactus);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.use(function(err, req, res, next){
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

//Emits the broadcast messages
io.on('connection', (socket)=>{
    console.log("Some user is connected");
    socket.on('message', (msg) => {
        console.log("MSG:",msg);
        socket.broadcast.emit('message-broadcast', msg);
       });
})

// Start Server
http.listen(3000, ()=>{
    console.log("Listening On : 3000");
})


