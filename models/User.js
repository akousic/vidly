const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength:5,
        maxlength:255

    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024

    },
    isAdmin: {
        type: Boolean,
        required:true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User',userSchema);

function validateSchema (login){
  const schema = joi.object().keys({
      name: joi.string().min(3).max(30).required(),
      email: joi.string().required().email(),
      password: joi.string().min(6).max(255).required(),
      isAdmin:joi.boolean().required()
  });
  return joi.validate(login,schema);

}

exports.User = User;
exports.validate = validateSchema;