const mongoose = require('mongoose');
const joi = require('joi');

const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        unique: true,
        required: true

    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024

    }
});

const User = mongoose.model('User',loginSchema);

function validateSchema (login){
  const schema = joi.object().keys({
      name: joi.string().min(3).max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(1024).required()
  });
  return joi.validate(login,schema);

}

exports.User = User;
exports.validate = validateSchema;