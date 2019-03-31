const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const joi = require('joi');
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
mongoose.connect('mongodb://kousic:kousic1@ds026018.mlab.com:26018/vidly-kousic').then(() => console.log('Connected to vidly database successfully..'))
    .catch((err) => console.log(err.message));

//     mongoose.connect('mongodb://localhost:27017/vidly').then(()=> console.log('Connected to vidly database..'))
// .catch((err)=>{console.log(`Error Occurred: ${err.message}`)});


router.post('/', async (req, res) => {
   
    try{
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(400).send('Invalid email or password');
        
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        
        if(!validPassword) return res.status(400).send('Invlaid email or Password');

       const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
       res.send(token);
    }
    catch(err){

        res.send(err);

    }
});


function validate(req){
    const schema = {
            email: joi.string().min(5).max(255).required().email(),
            password: joi.string().min(5).max(255).required()

    };

    return joi.validate(req,schema);
}


module.exports = router;