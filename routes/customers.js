const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer } = require('../models/customer');
const { validate } = require('../models/customer');

// mongoose.connect('mongodb://kousic:kousic1@ds026018.mlab.com:26018/vidly-kousic').then(()=> console.log('Connected to vidly database..'))
// .catch((err)=>{console.log(`Error Occurred: ${err.message}`)});

mongoose.connect('mongodb://localhost:27017/vidly').then(()=> console.log('Connected to vidly database..'))
.catch((err)=>{console.log(`Error Occurred: ${err.message}`)});



router.get('/',async (req,res)=>{

    res.send(await Customer.find());

})

router.get('/:id',async (req,res)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const customer = await Customer.findById(req.params.id);
    if(!customer) res.send('The customer with given id is not found')
    else res.send(await Customer.findById(req.params.id));
    }
    else{
        res.send('invalid customer ID');

    }
    
})

router.post('/',async (req,res)=>{
    try{

        const { error }= validate(req.body);
       console.log(error);
       if(error) {
           res.status(400);
           res.send(error.details[0].message);
       }
       else{
        const customer =  new Customer({
            isGold:req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        });
        const result = await customer.save();
        res.send(result);

       }        
    }

    catch(err){
        console.log(err);
        res.send(err);
    }     
})

router.put('/:id', async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }, { new: true });
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);

    }
    else{
        res.send('invalid customer ID')

    }
    
  });

router.delete('/:id',async (req,res)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const customer = await Customer.findByIdAndDelete(req.params.id);
        console.log(customer);
        if (!customer) return res.status(404).send('customer not found for the desired ID');
        else {
            res.send(customer);
        }
    }
    else{
        res.send('invalid customer ID')
    }
})
module.exports = router;