import excuteQuery from '../../lib/db';
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

export default async (req, res) => {
    const cart = JSON.parse(req.body);
    if (req.method === "POST") {
     
        jwt.verify(cart.access_token, secret, async function(err, decoded) {
            if (err) {
                          
            } 
            
            else {
            res.json({item:
                   await excuteQuery({query:'SELECT * FROM `transaction_db` where user_email =?',
                    values: [decoded.user_email]})
            })

        
        }})
    }
     
  
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
