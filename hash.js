const bcrypt = require('bcryptjs');
const saltRounds = 10;

//promise 
async function genHashAsync(){
    let salt = await bcrypt.genSalt(saltRounds);
    console.log(salt);
    let hash = await bcrypt.hash('Password1',salt)
    console.log(hash);
}
genHashAsync();


