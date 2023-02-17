const { sign, verify } = require('jsonwebtoken')
require('dotenv').config();

const createToken = async (userCred) => {
    
    const accessToken = sign({
        id: userCred.id,
        userName: userCred.userName
    },
    process.env.SECRET
    )

    return accessToken;
}

const verifyToken = async (req, res, next) => {
    try {

        var accesstoken = req.header("Authorization").replace("Bearer ", "");

        const validateToken = verify(accesstoken, process.env.SECRET)

        if(validateToken){
          req.authenticated = true
          return next();
        }
  
        //return [Promise.resolve(true), claims];
      } catch (err) {
        console.log("ERR!", err);
        if (!req.header("Authorization")) {
          res.status(400).send({ error: "Auth Token Missing!!" });
        } else {
          res.status(400).send({ Error: "Invalid Token" });
        }
      }
}

module.exports = { createToken, verifyToken }