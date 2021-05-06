import {excuteSimpleQuery} from '../../lib/db';
import excuteQuery from '../../lib/db';
export default async (req, res) => {
    const id = JSON.parse(req.body);
 
    if (req.method === "POST") {
      try {
      
        const product={product:await excuteQuery({
        query: 'SELECT `id` as pid ,`name`,`price` as subtotal FROM `shop_db` WHERE id  = ?',
        values: [id.id],
    })};
 

         res.json({product: product});

 
      } catch (e) {
        console.log(`getproduct:: Error: ${e.message}`);
        res.status(500).json({ statusCode: 500, message: e.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
