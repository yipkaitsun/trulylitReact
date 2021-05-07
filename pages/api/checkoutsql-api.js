import excuteQuery from '../../lib/db';


export default async (req, res) => {
    const transaction = JSON.parse(req.body);
    if (req.method === "POST") {
      try {
        await excuteQuery({
        query: 'INSERT INTO `transaction_db` (detail,username,email,phone,paymentmethod,shippingmethod,flat,block,floor,building,street,express,pickpt,user_email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        values: [transaction.detail,transaction.name,transaction.email,transaction.phone,transaction.paymentmethod,transaction.method,transaction.flat,
           transaction.block,transaction.floor,transaction.building,transaction.street,transaction.express,transaction.pickuppoint,transaction.useremail],
    });

    res.json({msg:await excuteQuery({
        query: 'DELETE FROM `cart_db` WHERE email= ?',
        values: [JSON.parse(transaction.detail)[0].email],
    })});

 
      } catch (e) {
        console.log(`create-user:: Error: ${e.message}`);
        res.status(500).json({ statusCode: 500, message: e.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
