const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

export default async (req, res) => {
    const access = JSON.parse(req.body);
 
 
    if (req.method === "POST") {
            jwt.verify(access.token, secret, function(err, decoded) {
            if (err) {
            
            
            if (access.refresh!==undefined){
            jwt.verify(access.refresh, secret, function(err, decoded) {
	        	const accesspayload = { refresh_token:access.refresh,user_email:decoded.user_email};
            const access_token = jwt.sign(accesspayload, secret, {
                expiresIn: '2h' })
                        
           res.status(200).json({ statusCode: 200,msg:"refresh",username:decoded.user_email,access_token:access_token});
          });
                  }
            else{res.status(401).json({ statusCode: 500, message: "Invalid token" });}
            }
            else {
              res.status(200).json({ statusCode: 200,username: decoded.user_email });;
            } 
             });
           
            
  };
}