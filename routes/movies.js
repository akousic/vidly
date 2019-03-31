const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const joi = require('joi');
const {Movie, validate } = require('../models/movie')
const {Genre} = require('../models/genre');


  mongoose.connect('mongodb://kousic:kousic1@ds026018.mlab.com:26018/vidly-kousic')
 .then(() => console.log('Connected to vidly database successfully..'))
 .catch((err) => console.log(err.message));


//mongoose.connect('mongodb://localhost:27017/vidly').then(()=> console.log('Connected to vidly database..'))
//.catch((err)=>{console.log(`Error Occurred: ${err.message}`)});


router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found for the desired ID')
    else return res.send(movie);
    }
    else{
        res.send('Invalid Movie ID provided');
    }
    
});

router.post('/', async (req, res) => {

    const { error } = validate(req.body);    
    if (error) return res.status(400).send(error.details[0].message);
    else {
        try{
            if(mongoose.Types.ObjectId.isValid(req.body.genreId)){
                const genre = await Genre.findById(req.body.genreId); //THIS IS VERY IMPORTANT.
                console.log(genre);
                if(!genre) return res.status(400).send('No genre found with given genre ID');
        
                let movie = new Movie({
                    title: req.body.title,
                    genre:{
                        _id: genre._id,
                        name: genre.name
                    },
                    numberInStock: req.body.numberInStock,
                    dailyRentalRate: req.body.dailyRentalRate
                
                });
                console.log(movie);
                movie = await movie.save();
                res.send(movie);
            }
            else{
                res.status(400).send('Invalid genre ID');
            }
        }

        catch(err){
            console.log(err);
            res.send(err);
        }
       
      
    }
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        if(mongoose.Types.ObjectId.isValid(req.body.genreId)){
            const genre = await Genre.findById(req.body.genreId);
        }
        else{
            res.send('Genre ID is invalid');
        }
        
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre:{
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
            
        }, {
            new: true
        });
        if (!movie) return res.status(404).send('Movie not found for the desired ID');
        else {
    
            res.send(genre);
        }
    }
    else{
        res.send('Movie ID provided is invalid')
    }

    


});

router.delete('/:id', async (req, res) => {

    const genre = await Genre.findOneAndDelete(req.params.id, (err, result) => {
        res.send(result + ' has been deleted')
    })
    if (!genre) return res.status(404).send('Genre not found for the desired ID');
    else {

        res.send(genre);
    }

})

module.exports = router;