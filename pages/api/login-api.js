import excuteQuery from '../../lib/db';
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
export default async (req, res) => {
    const user = JSON.parse(req.body).user;
 
    if (req.method === "POST") {
      try {
      
      const getuser = {user:await excuteQuery({
        query: 'SELECT * FROM `login_db` WHERE `email` = ? AND `pwd` = ? ',
        values: [user.username,user.pwd],
    })};
  
    if (getuser.user.length ===0){
        res.status(401).json({ statusCode: 401, message: "Incorrect Password or Username" });
    }

    else {
        var email=getuser.user[0].email;
    const payload = { user_email:email };
		const refresh_token = jwt.sign(payload, secret, {
				expiresIn: '14d'
			  });
		const accesspayload = { refresh_token:refresh_token,user_email:email};
		const access_token = jwt.sign(accesspayload, secret, {
		expiresIn: '2h'
			  });
        res.status(200).json({ statusCode: 200, msg:"refresh", refresh_token: refresh_token,access_token:access_token });
    }

 
      } catch (e) {
        console.log(`getproduct:: Error: ${e.message}`);
        res.status(500).json({ statusCode: 500, message: e.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
