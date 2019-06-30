const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');
const {PORT, BASE_URL} = require('./config');
const routes = require('./routes');
const numberGuessController = require('./controllers/numberGuessController');


const app = express();


//app.use(express.static(__dirname));
app.listen(PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // configure default log output

console.log(`Server running at ${BASE_URL}`);


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.get('/', function (req, res) {
    const id = req.param("id");
    res.status(200).send(`
        Server is running! 
        <br><br> 
        To get the first word, go to: <a href="http://localhost:3456/word/0">http://localhost:3456/word/0</a>
        <br><br>
        The number to guess is: ${numberGuessController.getNumber()}
        <br>
        Make a guess: POST <a href="http://localhost:3456/numberguess">http://localhost:3456/numberguess</a>
        <br>
        Check if you guessed right: GET <a href="http://localhost:3456/numberguess">http://localhost:3456/numberguess</a>
        
    `);
});

app.use('/', routes);


