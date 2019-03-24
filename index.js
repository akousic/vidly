const error = require('./middleware/error');
const config = require('config');
const express = require('express');
const app = new express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies =  require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/Users');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
    console.error('FATAl ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);


const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log(`Server started on ${PORT}`);
})
