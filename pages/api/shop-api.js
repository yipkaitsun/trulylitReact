import {excuteSimpleQuery} from '../../lib/db';


export default async (req, res) => {

    if (req.method === "POST") {
     var cat=[];
      try {
        var category=await excuteSimpleQuery("SELECT DISTINCT `tag` FROM shop_db");
          for (var j=0;j<category.length;j++){
            outer:
            for (var k=0;k< JSON.parse(category[j].tag).length;k++){
              
              for (var i=0;i<cat.length;i++){  
                if ( JSON.parse(category[j].tag)[k]===cat[i]){
                  continue outer;
                }
              }
              
              cat.push(JSON.parse(category[j].tag)[k]);
            }
          }
          
          res.json({product:await excuteSimpleQuery("SELECT * FROM `shop_db` ORDER BY ID DESC"),category:cat});
       
         
      } catch (e) {
        console.log(`shop-api:: Error: ${e}`);
        res.status(500).json({ statusCode: 500, message: e.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
