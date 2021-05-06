import excuteQuery from '../../lib/db';
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

export default async (req, res) => {
    const cart = JSON.parse(req.body).cartProp;
    if (req.method === "POST") {
     
        jwt.verify(cart.access_token, secret, async function(err, decoded) {
            if (err) {         
            } 
            else {
                const getuser = {
                    cart: await excuteQuery({query:'SELECT * FROM `cart_db` where email = ?',values: [decoded.user_email]})
            }
         
            if (getuser.cart.length<10){
                
            await excuteQuery(
                {query:'INSERT INTO `cart_db`(`email`, `productId`, `quantity`) VALUES(?,?,?)',
                values:[decoded.user_email,cart.id,cart.quantity]}
            )
    
            res.json({statusCode: 200, msg:"Product successfully addeded to your shopping cart."});
        }

            else{
                res.json({ statusCode: 500, msg: "Your Shopping cart has been fulled." });
    
            }
        }})
    }
     
  
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
