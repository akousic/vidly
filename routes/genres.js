const auth = require('../middleware/auth');
const admin =  require('../middleware/admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const joi = require('joi');
const { Genre, validate } = require('../models/genre')
const { User } = require('../models/User');

 mongoose.connect('mongodb://kousic:kousic1@ds026018.mlab.com:26018/vidly-kousic').then(() => console.log('Connected to vidly database successfully..'))
    .catch((err) => console.log(err.message));

    
//mongoose.connect('mongodb://localhost:27017/vidly').then(()=> console.log('Connected to vidly database..'))
//.catch((err)=>{console.log(`Error Occurred: ${err.message}`)});

router.get('/', async (req, res, next) => {
    try{
        const genres = await Genre.find();
        res.send(genres);
    }

    catch(ex){
        next(ex);
    }
    
});

router.get('/:id', async (req, res) => {

    try{
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('Genre not found for the desired ID')
        else return res.send(genre);
    }
    catch(error) {
res.send(error);
    }
   
});

router.post('/', auth, async (req, res) => {

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

router.delete('/:id', [auth,admin], async (req, res) => {
    
   
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
    });
    

module.exports = router;