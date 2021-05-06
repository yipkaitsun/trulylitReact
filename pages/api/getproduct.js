import {excuteSimpleQuery} from '../../lib/db';
import excuteQuery from '../../lib/db';
export default async (req, res) => {
    const id = JSON.parse(req.body);
 
    if (req.method === "POST") {
      try {
      
        const product={product:await excuteQuery({
        query: 'SELECT * FROM `shop_db` WHERE id  = ?',
        values: [id.id],
    })};
 

    var sqlsmt="SELECT * FROM `shop_db` WHERE `tag` like " ;
    var tag=[];
    tag=JSON.parse(product.product[0].tag);
    var i;
    for (i = 0; i < tag.length; i++) { 
        if (i === 0){
            sqlsmt+= "'%"+tag[i]+"%'";
        }
        else{
            sqlsmt+=" OR `tag` like '%" +tag[i]+"%'";
        }
}
        var relatedPro={relatedPro:await excuteSimpleQuery(sqlsmt)};
         res.json({product: product,relatedPro:relatedPro});

 
      } catch (e) {
        console.log(`getproduct:: Error: ${e.message}`);
        res.status(500).json({ statusCode: 500, message: e.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
