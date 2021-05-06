import excuteSimpleQuery from '../../lib/db';
export default async (req, res) => {
    const cart = JSON.parse(req.body).cartid;
    //console.log(cart);
    if (req.method === "POST") {
     
               var query="SELECT id,name,price FROM `shop_db` where";
               for (var i=0;i<cart.length;i++){
                   if(i!==0){
                       query+=" or" 
                   }
                   query+=" id="+cart[i].id
               }
                    res.json({cart: await excuteSimpleQuery({query:query})});
                
    }
     
  
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
