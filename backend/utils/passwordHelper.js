const bcrypt = require('bcryptjs');

//hacher un mot de passe

const hashPassword = async (password) =>{
    return await bcrypt.hash(password, 10);
};

//verifier un mot de passe 

const comparePassword = async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword);

};

module.exports = {
    hashPassword,
    comparePassword
};
