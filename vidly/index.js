const express = require('express');
const app = express();
const Joi = require('joi');
const logger=require('./logger.js');
const authentication=require('./authentication.js');

app.use(logger);
app.use(authentication);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.post('/api/url',(req,res)=>{
    res.send(req.body.name);
})
const genres = [{
        genre_id: 1,
        genre_name: 'action'
    },
    {
        genre_id: 2,
        genre_name: 'sci-fi'
    },
    {
        genre_id: 3,
        genre_name: 'horrer'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/all_genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    // res.send(genres[req.params.id-1]);
    const genre = genres.find(c => c.genre_id === parseInt(req.params.id));
    if (!genre) res.status(404).send('The genre wih the given id is not found');
    res.send(genre);
});

app.delete('/api/genre_delete/:id', (req, res) => {
    const genre = genres.find(obj => obj.genre_id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the give ID was not found.');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genres);
});

app.get('/api/available_genres', (req, res) => {
    let temp_genre = [];
    for (let i = 0; i < genres.length; i++) {
        if (genres[i]) {
            temp_genre.push(genres[i]);
        }
    }
    res.send(temp_genre);
});

app.post('/api/new_genre', (req, res) => {
    if (validateGenre(req.body)) res.send(validateGenre(req.body));
    else {
        const genre = {
            genre_id: genres.length + 1,
            genre_name: req.body.genre_name
        }
        genres.push(genre);
        res.send(genre);
    }
});

app.put('/api/update_genres/:id', (req, res) => {
    const genre = genres.find(obj => obj.genre_id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the give ID was not found.');

    if (validateGenre(req.body)) return res.send(validateGenre(req.body));
    genre.genre_name = req.body.genre_name;
    res.send(genre);

});

function validateGenre(req_data) {
    const schema = {
        genre_name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req_data, schema);
    if (result.error) return (result.error.details[0].message);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at ${port}.`));