const jwt = require('jsonwebtoken');

//fonction pour générer un jwt 

const generateToken = (user)=>{

    return jwt.sign(

        {
            id_utilisateur: user.id_utilisateur,
            email: user.email,
            role: user.role,
            zone_competence : user.zone_competence

        },
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    );


};
//Fonction pour vérifier un jwt 
const verifyToken = (token)=>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET);

    }catch (error){
        return null;
    }
    

};
module.exports = {
    generateToken,
    verifyToken
};
