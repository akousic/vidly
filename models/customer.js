const mongoose = require('mongoose');
const joi = require('joi');

const customerScehma = new mongoose.Schema({
    isGold: {
      type:  Boolean,
      default: false
    },
    name:{
        type: String,
        requried: true,
        minlength:5,
        maxlength: 50

    },
    phone: {
        type: String,
        required: true
    } 
});


const Customer = mongoose.model('Customer',customerScehma);

function validateCustomer(customer){
    console.log(customer);
    const joiSchema = joi.object().keys({
        name: joi.string().min(5).max(50).required(),
        isGold: joi.boolean(),
        phone: joi.string().min(10).required()       
    })
const result= joi.validate(customer,joiSchema)
console.log(result);
return(result);
    
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerScehma;