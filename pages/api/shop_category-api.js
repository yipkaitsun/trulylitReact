import {excuteSimpleQuery} from '../../lib/db';


export default async (req, res) => {
  const category = JSON.parse(req.body).category;
  var sql="SELECT * FROM shop_db ";
  for (var i=0;i<category.length;i++){
    if (i!==0){
      sql+="OR TAG LIKE '%"+category[i]+"%'";
    }
    else
    {
      sql+= "WHERE tag LIKE '%"+category[i]+"%' ";
    }

  }
    if (req.method === "POST") {
      try {
      res.json({product:await excuteSimpleQuery(sql)});
       
         
      } catch (e) {
        console.log(`shop-api:: Error: ${e}`);
        res.status(500).json({ statusCode: 500, message: e.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
