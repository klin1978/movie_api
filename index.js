const express = require('express');
    morgan = require('morgan');
    fs = require('fs');
    path = require('path');

const app = express();

const bodyParser = require('body-parser');
const uuid = require('uuid');
const { title } = require('process');

app.use(bodyParser.json());

//create write stream
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

let users = [
    {
        id: 1,
        Username: 'Katelyn',
        favoriteMovies: []
    },
    {
        id: 2,
        Username: 'Dominic',
        favoriteMovies: ['Top Gun']
    },
    {
        id: 3,
        Username: 'Alex',
        favoriteMovies: ['Pitch Perfect']
    },
];

let movies = [
    {
        Title: 'The Fast and the Furious',
        Genre: {
            Name: 'Action',
            Description: ''
        },
        Description: 'Los Angeles police officer Brian O\'Connor is sent undercover to a take down a whole other world of illegal street racing but finds himself questioning where his loyalties lie.',
        Cast: 'Vin Diesel, Paul Walker, Michelle Rodriguez, Jordana Brewster, etc.',
        Director: {
            Name: 'Rob Cohen',
            Born: '',
            Biography: '',
        }
    },
    {
        Title: 'The Italian Job',
        Genre: {
            Name: 'Action',
            Description: ''
        },
        Description: '',
        Cast: 'Donald Sutherland, Mark Wahlberg, Edward Norton, Charlize Theron, Jason Statham, Seth Green, Yasiin Bey',
        Director: {
            Name: 'F. Gary Gray',
            Born: '',
            Biography: '',
        }
    },
    {
        Title: 'Ocean\'s Eleven',
        Genre: {
            Name: 'Crime',
            Description: ''
        },
        Description: '',
        Cast: 'George Clooney, Brad Pitt, Julia Roberts, Matt Damon, Cecelia Ann Birt, Bernie Mac',
        Director: {
            Name: 'Steven Soderbergh',
            Born: '',
            Biography: '',
        }
    },
    {
       Title: 'The Heat',
       Genre: {
            Name: 'Comedy',
            Description: ''
       },
       Description: '',
       Cast: 'Melissa McCarthy, Sandra Bullock, Marlon Wayans, Thomas F. WIlson, Ben Falcone',
       Director: {
            Name: 'Paul Feig',
            Born: '',
            Biography: '',
        }
    },
    {
        Title: 'Pitch Perfect',
        Genre: {
            Name: 'Comedy',
            Description: ''
        },
        Description: '',
        Cast: 'Anna Kendrick, Brittany Snow, Rebel Wilson, Anna Camp, Skylar Astin, Ben Platt',
        Director: {
            Name: 'Jason Moore',
            Born: '',
            Biography: '',
        }
    },
    {
        Title: 'The Avengers',
        Genre: {
            Name: 'Action',
            Description: ''
        },
        Description: '',
        Cast: 'Robert Downey Jr., Chris Evans, Scarlett Johansson, Jeremy Renner, Mark Ruffalo, Chris Hemsworth',
        Director: {
            Name: 'Joss Whedon',
            Born: '',
            Biography: '',
        }
    },
    {
        Title: 'Top Gun',
        Genre: {
            Name: 'Action',
            Description: ''
        },
        Description: '',
        Cast: 'Tom Cruise, Tim Robbins, Kelly McGillis, Val Kilmer, Anthony Edwards, Tom Skerrit, Michael Ironside',
        Director: {
            Name: 'Tony Scott',
            Born: '',
            Biography: '',
        }
    },
    {
        Title: '2 Guns',
        Genre: {
            Name: 'Action',
            Description: ''
        },
        Description: '',
        Cast: 'Denzel Washington, Mark Wahlberg, Paula Patton, Bill Paxton, Edward James Olmos, Robert John Burke',
        Director: {
            Name: 'Baltasar Kormakur',
            Born: '',
            Biography: '',
        }
    },
];

// CREATE (POST) new user
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.username) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
});

// UPDATE (PUT) username
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.username = updatedUser.username;
        res.status(200).json(user);
    } else {
        res.status(400).send('no user found')
    }
});

// CREATE (POST) favoriteMovie
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no user found')
    }
});

// DELETE favoriteMovie
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no user found')
    }
});

// DELETE user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no user found')
    }
});

// READ (GET) all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// READ (GET) one movie
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie found')
    }
});

// READ (GET) genre
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre found')
    }
});

// READ (GET) director
app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director found')
    }
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