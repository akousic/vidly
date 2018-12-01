const express = require('express');
const app = new express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies =  require('./routes/movies');
const rentals = require('./routes/rentals');

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log(`Server started on ${PORT}`);
})
