const jwt = require('jsonwebtoken')
// Authorization
const verifyToken =async (req, res, next) => {
   // const token = req.header('token');
   // console.log(token);
   // if (token) {jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

   //       if (err) res.status(403).json({"Errors": "Token is not valid!"});
   //       req.user = user;
   //       console.log(err) 
   //       return
   //    })
   // } else if(!token) {
   //    return res.status(400).json({"errors": "No token Found!"});
   // } else {
   //    return res.status(400).json({"errors": "You are not authenticated!"});
   // }
   const token = req.header('auth-token')

   if(!token){
      return res.status(400).json({
         "errors": [{"Msg": "No token found!"}]
      })
   }
   try {
      let user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = user.email
      next()
   } catch (error) {
      return res.status(400).json({
         "errors": [
            {"Msg": "Token invalid"},
         ]
      })
      
   }
   
};

const verifytokenAndAuthorization = (req, res, next) => {

   verifyToken(req, res, () => {

      if (req.user.id === req.params.id || req.user.isAdmin) {
         next()

      } else {
         res.status(403).json("You are not allowed to do that!");
      }
   });
};

const verifytokenAndAdmin = (req, res, next) => {

   verifyToken(req, res, () => {

      if (req.user.isAdmin) {
         next();

      } else {
         res.status(403).json("You are not allowed to do that!");
      }
   });
};

module.exports = { verifyToken, verifytokenAndAuthorization, verifytokenAndAdmin };