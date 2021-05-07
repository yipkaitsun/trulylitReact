import excuteQuery from '../../lib/db';


export default async (req, res) => {
    const appointment = JSON.parse(req.body);
    if (req.method === "POST") {
        var BlockTime=[]
        var arr=await excuteQuery({query:'SELECT BlockTime FROM `appointment_block` where `BlockDate` =?',
                    values: [appointment.date]})
        for (var i=0;i<arr.length;i++){
            BlockTime.push(arr[i].BlockTime);

    };
        res.json({item:BlockTime});
                    
    }
     
  
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
