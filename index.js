const express = require('express');
const morgan = require('morgan');
    fs = require('fs');
    path = require('path');

const app = express();

//create write stream
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

let users = [
    {
        Username: "Katelyn",
        Password: "moviesRule2",
        Email: "katelyn2@gmail.com",
        Birthday: "08/22/1999",
    },
    {
        Username: "Dominic",
        Password: "drDom123",
        Email: "dominic123@gmail.com",
        Birthday: "03/05/2002", 
    },
    {
        Username: "Alex",
        Password: "!2345",
        Email: "alex5@gmail.com",
        Birthday: "12/02/2001", 
    },
];

let movies = [
    {
        Title: 'The Fast and the Furious',
        Genre: 'Action/Thriller',
        Description: 'Los Angeles police officer Brian O\'Connor is sent undercover to a take down a whole other world of illegal street racing but finds himself questioning where his loyalties lie.',
        Cast: 'Vin Diesel, Paul Walker, Michelle Rodriguez, Jordana Brewster, etc.',
        Director: 'Rob Cohen',
    },
    {
        Title: 'The Italian Job',
        Genre: 'Action/Thriller',
        Description: '',
        Cast: 'Donald Sutherland, Mark Wahlberg, Edward Norton, Charlize Theron, Jason Statham, Seth Green, Yasiin Bey',
        Director: 'F. Gary Gray',
    },
    {
        Title: 'Ocean\'s Eleven',
        Genre: 'Crime/Thriller',
        Description: '',
        Cast: 'George Clooney, Brad Pitt, Julia Roberts, Matt Damon, Cecelia Ann Birt, Bernie Mac',
        Director: 'Steven Soderbergh',
    },
    {
       Title: 'The Heat',
       Genre: 'Comedy/Action',
       Description: '',
       Cast: 'Melissa McCarthy, Sandra Bullock, Marlon Wayans, Thomas F. WIlson, Ben Falcone',
       Director: 'Paul Feig', 
    },
    {
        Title: 'Pitch Perfect',
        Genre: 'Comedy/Music',
        Description: '',
        Cast: 'Anna Kendrick, Brittany Snow, Rebel Wilson, Anna Camp, Skylar Astin, Ben Platt',
        Director: 'Jason Moore',
    },
    {
        Title: 'The Avengers',
        Genre: 'Sci-Fi/Action',
        Description: '',
        Cast: 'Robert Downey Jr., Chris Evans, Scarlett Johansson, Jeremy Renner, Mark Ruffalo, Chris Hemsworth',
        Director: 'Joss Whedon',
    },
    {
        Title: 'Top Gun',
        Genre: 'Action/Drama',
        Description: '',
        Cast: 'Tom Cruise, Tim Robbins, Kelly McGillis, Val Kilmer, Anthony Edwards, Tom Skerrit, Michael Ironside',
        Director: 'Tony Scott',
    },
    {
        Title: '2 Guns',
        Genre: 'Action/Thriller',
        Description: '',
        Cast: 'Denzel Washington, Mark Wahlberg, Paula Patton, Bill Paxton, Edward James Olmos, Robert John Burke',
        Director: 'Baltasar Kormakur',
    },
];

// GET route at endpoint "/movies" returning JSON object with data about movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

// create GET route at endpoint "/" that returns default text
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

// express.static to serve "documentation.html" file
app.use(express.static('public'));

// error-handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Oops, something went wrong!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});