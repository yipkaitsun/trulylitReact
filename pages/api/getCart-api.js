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
                   await excuteQuery({query:'SELECT cart_db.id as cartid,shop_db.id as pid, shop_db.name , cart_db.quantity ,cart_db.email, shop_db.price*cart_db.quantity as subtotal, 1 as opacity FROM cart_db INNER JOIN shop_db ON cart_db.productId=shop_db.id where email =?',
                    values: [decoded.user_email]})
            })

        
        }})
    }
     
  
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
