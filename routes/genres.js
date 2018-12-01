const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const joi = require('joi');
const { Genre, validate } = require('../models/genre')

mongoose.connect('mongodb://kousic:kousic1@ds026018.mlab.com:26018/vidly-kousic').then(() => console.log('Connected to vidly database successfully..'))
    .catch((err) => console.log(err.message));

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Genre not found for the desired ID')
    else return res.send(genre);
});

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {

        const genre = new Genre({
            name: req.body.name
        });
        const result = await genre.save();
        console.log(result);
        if (result != undefined) res.send('genre inserted successfully')
        else res.send('genre inserion failed')
    }
});

router.put('/:id', async (req, res) => {

    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const genre = await Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, {
            new: true
        });
        if (!genre) return res.status(404).send('Genre not found for the desired ID');
        const {
            error
        } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        else {
    
            res.send(genre);
        }

    }
    else{
        res.send('Invalid Genre ID')
    }
    


});

router.delete('/:id', async (req, res) => {

    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) return res.status(404).send('Genre not found for the desired ID');
        else {
    
            res.send(genre);
        }
    }
    else{
        res.send('Invalid Genre ID')
    }
   

    })
    

module.exports = router;