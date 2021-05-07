import excuteQuery from '../../lib/db';

export default async (req, res) => {
    const cart = JSON.parse(req.body);
    if (req.method === "POST") {

            res.json({item:
                   await excuteQuery({query:'DELETE FROM `cart_db` WHERE `id` =?',
                    values: cart.id})
            })

    }
     
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
