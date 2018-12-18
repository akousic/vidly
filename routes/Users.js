const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const joi = require('joi');
const { User, validate } = require('../models/User');
const bcrypt = require('bcryptjs')

// mongoose.connect('mongodb://kousic:kousic1@ds026018.mlab.com:26018/vidly-kousic').then(() => console.log('Connected to vidly database successfully..'))
//     .catch((err) => console.log(err.message));

    mongoose.connect('mongodb://localhost:27017/vidly').then(()=> console.log('Connected to vidly database..'))
.catch((err)=>{console.log(`Error Occurred: ${err.message}`)});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try{
        let user = await User.findOne({ email: req.body.email });
        if(user) return res.status(400).send('User already registered.');
    
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password 
        });
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

    
        await user.save();
        res.send(_.pick(user,['_id','name','email']));

    }
    catch(err){

        res.send(err);

    }

   

});


module.exports = router;