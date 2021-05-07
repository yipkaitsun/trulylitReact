import excuteQuery from '../../lib/db';
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const CryptoJS = require("crypto-js");

export default async (req, res) => {
    const body = JSON.parse(req.body)
    if (req.method === "POST") {
     
        jwt.verify(body.access_token, secret, async function(err, decoded) {
            if (err) {         
            } 
            else {
                const username=await excuteQuery({query:'SELECT * FROM `login_db` where email = ?',values: [decoded.user_email]});  
               const encryptusername= CryptoJS.AES.encrypt(JSON.stringify(username[0].username),secret).toString();
                res.json({username:encryptusername});  
            }})
    }
     
  
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
