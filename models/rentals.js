const mongoose = require('mongoose');
const joi = require('joi');
const { Movie, movieSchema} = require('./movies');
const { Customer, customerSchema} = require('./customer');



const Rental = new mongoose.Schema({

    customer: {
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength: 5,
                maxlength: 15
            },
            isGold:{
                type: Boolean,
                required: true
            },
            phone:{
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movies:[{
        type: new mongoose.Schema({
            title:{
                type: String,
                require: true,
                trim: true,
                minlength: 1,
                maxlength:255
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    }],

    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
   
    rentalFee: {
        type: Number,
        min: 0
    }
});

function validateSchema(rental){
    const schema = joi.object().keys({
        customerId: joi.string().required(),
        movieId: joi.string().required()
    })

    return joi.validate(schema,rental);
}

exports.Rental = Rental;
exports.validate = validateSchema;