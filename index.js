const mongoose = require('mongoose');
const Models = require('./models.js');
const express = require('express');
    morgan = require('morgan');
    fs = require('fs');
    path = require('path');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const uuid = require('uuid');
const { title } = require('process');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://127.0.0.1/myflixDB', {useNewUrlParser: true, useUnifiedTopology: true});

//create write stream
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

let users = [
    {
        id: 1,
        Username: 'Katelyn',
        Email: 'kat123@gmail.com',
        Password: 'akakat2',
        Birthday: '02/03/1998',
        favoriteMovies: []
    },
    {
        id: 2,
        Username: 'Dominic',
        Email: 'dominic@gmail.com',
        Password: 'topGun9',
        Birthday: '10/15/2001',
        favoriteMovies: ['Top Gun']
    },
    {
        id: 3,
        Username: 'Alex',
        Email: 'alex72@gmail.com',
        Password: 'movies<3',
        Birthday: '06/12/2005',
        favoriteMovies: ['Pitch Perfect']
    },
];

let movies = [
    {
        Title: 'The Fast and the Furious',
        Genre: {
            Name: 'Action',
            Description: 'High-octance films that can include violent fight-scenes, suspenseful chases, and special effects.'
        },
        Description: 'Los Angeles police officer Brian O\'Connor is sent undercover to a take down a whole other world of illegal street racing but finds himself questioning where his loyalties lie.',
        Cast: 'Vin Diesel, Paul Walker, Michelle Rodriguez, Jordana Brewster, etc.',
        Director: {
            Name: 'Rob Cohen',
            Born: 'March 12, 1949',
            Died: '',
            Biography: 'Is an American director and producer of film and television.'
        }
    },
    {
        Title: 'The Italian Job',
        Genre: {
            Name: 'Action',
            Description: 'High-octance films that can include violent fight-scenes, suspenseful chases, and special effects.'
        },
        Description: 'A crew of thieves, led by Charlie Crocker, plan an elaborate revenge heist against a former ally after being left for dead in Venice, Italy.',
        Cast: 'Donald Sutherland, Mark Wahlberg, Edward Norton, Charlize Theron, Jason Statham, Seth Green, Yasiin Bey',
        Director: {
            Name: 'F. Gary Gray',
            Born: 'July 17, 1969',
            Died: '',
            Biography: 'Is an American film director, film producer, and music video director.',
        }
    },
    {
        Title: 'Ocean\'s Eleven',
        Genre: {
            Name: 'Crime',
            Description: 'Films that are largely centered around the execution and/or the solving of a crime.'
        },
        Description: 'Recently released from prison, Danny Ocean and his accomplices plan to rob three of the biggest casinos in Los Vegas.',
        Cast: 'George Clooney, Brad Pitt, Julia Roberts, Matt Damon, Cecelia Ann Birt, Bernie Mac',
        Director: {
            Name: 'Steven Soderbergh',
            Born: 'January 14, 1963',
            Died: '',
            Biography: 'Is an American film director, producer, screenwriter, cinematographer, and editor.',
        }
    },
    {
       Title: 'The Heat',
       Genre: {
            Name: 'Comedy',
            Description: 'Films that are centered around a comedic premise and are meant to be light, humurous, and entertaining.'
       },
       Description: 'An uptight special agent for the FBI is forced to work with impatient, bad-tempered Boston cop in order to take down a ruthless drug lord.',
       Cast: 'Melissa McCarthy, Sandra Bullock, Marlon Wayans, Thomas F. WIlson, Ben Falcone',
       Director: {
            Name: 'Paul Feig',
            Born: 'September 17, 1962',
            Died: '',
            Biography: 'Is an American film director, producer, screenwriter, actor, and comedian.',
        }
    },
    {
        Title: 'Pitch Perfect',
        Genre: {
            Name: 'Comedy',
            Description: 'Films that are centered around a comedic premise and are meant to be light, humurous, and entertaining.'
        },
        Description: 'Freshman at Barden University, Beca is pursuaded to join her school\'s all-girls a cappella group, The Bardon Bellas, in order to go head to head against their male rivals in the International Championship of Collegiate A Cappella.',
        Cast: 'Anna Kendrick, Brittany Snow, Rebel Wilson, Anna Camp, Skylar Astin, Ben Platt',
        Director: {
            Name: 'Jason Moore',
            Born: 'October 22, 1970',
            Died: '',
            Biography: 'Is an American film, theatre, and television director.',
        }
    },
    {
        Title: 'The Avengers',
        Genre: {
            Name: 'Action',
            Description: 'High-octance films that can include violent fight-scenes, suspenseful chases, and special effects.'
        },
        Description: 'A group of superheroes must come together in order to stop Loki, Thor\'s brother, when he gains access to an energy cube with unlimited power called the Tesseract.',
        Cast: 'Robert Downey Jr., Chris Evans, Scarlett Johansson, Jeremy Renner, Mark Ruffalo, Chris Hemsworth',
        Director: {
            Name: 'Joss Whedon',
            Born: 'June 23 1964',
            Died: '',
            Biography: 'Is an American director, producer, screenwriter, and comic book writer.',
        }
    },
    {
        Title: 'Top Gun',
        Genre: {
            Name: 'Action',
            Description: 'High-octance films that can include violent fight-scenes, suspenseful chases, and special effects.'
        },
        Description: 'Impulsive US Navy Lieutenant Pete Mitchell, call sign Maverick, competes with others at the US Navy\'s elite Fighter School in order to be the best in class and break through the constraints of his father\'s bad reputation.',
        Cast: 'Tom Cruise, Tim Robbins, Kelly McGillis, Val Kilmer, Anthony Edwards, Tom Skerrit, Michael Ironside',
        Director: {
            Name: 'Tony Scott',
            Born: 'June 21, 1944',
            Died: 'August 19, 2012',
            Biography: 'Was an English film director and producer.',
        }
    },
    {
        Title: '2 Guns',
        Genre: {
            Name: 'Action',
            Description: 'High-octance films that can include violent fight-scenes, suspenseful chases, and special effects.'
        },
        Description: 'An undercover DEA agent and an undercover Naval Intelligence officer have been tasked with investigating the same Mexican drug lord, only neither knows the other is undercover.',
        Cast: 'Denzel Washington, Mark Wahlberg, Paula Patton, Bill Paxton, Edward James Olmos, Robert John Burke',
        Director: {
            Name: 'Baltasar Kormakur',
            Born: 'February 27, 1966',
            Died: '',
            Biography: 'Is an Icelandic film producer, film and theater director, and actor.',
        }
    },
    {
        Title: 'Silence of the Lambs',
        Genre: {
            Name: 'Thriller',
            Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
        },
        Description: 'An FBI trainee is assigned to catch serial killer \'Buffalo Bill\' but must acquire the help of a cannibal killer in order to do so.',
        Cast: 'Jodie Foster, Anthony Hopkins, Lawrence A. Bonney, Kasi Lemmons, Scott Glenn, Anthony Heald, Frankie Faison',
        Director: {
            Name: 'Jonathan Demme',
            Born: 'February 22, 1944',
            Died: 'April 26, 2017',
            Biography: 'Was an American director, writer, and producer.',
        }
    },
    {
        Title: 'Top Gun: Maverick',
        Genre: {
            Name: 'Action',
            Description: 'High-octance films that can include violent fight-scenes, suspenseful chases, and special effects.'
        },
        Description: 'Still pushing the limits after thirty years of service, US Navy Captain Pete Mitchell, call sign Maverick, finally goes too far and, as punishment, is forced to confront his past while leading Top Gun\'s elite graduates on a high-stakes mission.',
        Cast: 'Jodie Foster, Anthony Hopkins, Lawrence A. Bonney, Kasi Lemmons, Scott Glenn, Anthony Heald, Frankie Faison',
        Director: {
            Name: 'Joseph Kosinski',
            Born: 'May 3, 1974',
            Died: '',
            Biography: 'Is an American film director.',
        }
    },
    {
        Title: 'Avengers: Age of Ultron',
        Genre: {
            Name: 'Action',
            Description: 'High-octance films that can include violent fight-scenes, suspenseful chases, and special effects.'
        },
        Description: 'After Tony Stark and Bruce Banner restart a dormant program meant for peacekeeping, sentient robot, Ultron, arises from the depths of that program with the sole task of wiping out all of humanity. It\'s up to the Avengers, and their uneasy alliances, to put a stop to Ultron.',
        Cast: 'Robert Downey Jr., Chris Evans, Scarlett Johansson, Jeremy Renner, Mark Ruffalo, Chris Hemsworth',
        Director: {
            Name: 'Joss Whedon',
            Born: 'June 23 1964',
            Died: '',
            Biography: 'Is an American director, producer, screenwriter, and comic book writer.',
        }
    },
    {
        Title: 'The Fate of the Furious',
        Genre: {
            Name: 'Action',
            Description: 'High-octance films that can include violent fight-scenes, suspenseful chases, and special effects.'
        },
        Description: 'When a mysterious women going by the sudaname Cipher lures Dominic Teretto into betraying his family, those closest to him must face the ultimate test in order to bring him back before it\'s too late.',
        Cast: 'Vin Diesel, Jason Statham, Dwayne Johnson, Michelle Rodriguez, Tyrese Gibson, Ludacris, Charlize Theron',
        Director: {
            Name: 'F. Gary Gray',
            Born: 'July 17, 1969',
            Died: '',
            Biography: 'Is an American film director, film producer, and music video director.',
        }
    },
];

// CREATE (POST) new user
app.post('/users', (req, res) => {
    Users.findOne({Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users.create({
                    Username: req.body.Username,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    Birthday: req.body.Birthday,
                })
                    .then((user) => {
                        res.status(201).json(user);
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// UPDATE (PUT) username
app.put('/users/:Username', passport.authenticate('jwt', { session: false}), async (req, res) => {
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate({Username: req.params.Username},
        {
            $set: {
                Username: req.body.Username,
                Email: req.body.Email,
                Password: req.body.Password,
                Birthday: req.body.Birthday,
            },
        },
            {new: true},
    )
            .then((updatedUser) => {
                res.json(updatedUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send('Error: ' + err)
            })
});

// CREATE (POST) favoriteMovie
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Users.findOneAndUpdate({Username: req.params.Username},
        {
            $push: { FavoriteMovies: req.params.MovieID}
        },
        {new: true}
    )
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// DELETE favoriteMovie
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Users.findOneAndUpdate({Username: req.params.Username},
        {$pull: {FavoriteMovies: req.params.MovieID} },
        { new: true},
        )
        .then((updatedUser) => {
            if(!updatedUser) {
                return res.status(404).send('Error: ' + err);
            } else {
                res.json(updatedUser)
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + err)
        })
});

// DELETE user
app.delete('/users/:Username', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Users.findOneAndRemove({Username: req.params.Username})
        .then((user) => {
            if(!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ (GET) all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ (GET) one movie
app.get('/movies/:Title', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Movies.findOne({Title: req.params.Title})
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ (GET) user
app.get('/users', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ (GET) movie by genre
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Movies.find({ 'Genre.Name': req.params.genreName })
        .then((movies) => {
            const genres = movies.map(movie => movie.Genre);
            res.json(genres);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ (GET) director
app.get('/movies/director/:directorName', passport.authenticate('jwt', { session: false}), async (req, res) => {
    await Movies.find({ 'Director.Name': req.params.directorName })
        .then((movies) => {
            const directors = movies.map(movie => movie.Director);
            res.json(directors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
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