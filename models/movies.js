const mongoose = require('mongoose');
const joi = require('joi');
const { genreSchema } = require('./genres');



const Movie = new mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:255
    },
    genre: {
       type: genreSchema,
       required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min:0,
        max: 255
    }
}));

function validateMovie(movie) {
    
    console.log(movie);
    const schema = joi.object().keys({
        title: joi.string().min(5).max(50).required(),
        genreId: joi.string().required(),
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()    
    })
    console.log('test');
    return joi.validate (movie, schema);
}


exports.Movie = Movie; 
exports.validate = validateMovie;