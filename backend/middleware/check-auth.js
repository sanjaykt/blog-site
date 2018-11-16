const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
   try {
      // const token = req.header.authorization.split(' ')[1]
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, 'this-should-be-a-long-secreit-key')
      next();
   } catch (error){
      res.status(401).json({
         message: 'Auth failed due to jwt mismatch! ' + error
      })
   }
}