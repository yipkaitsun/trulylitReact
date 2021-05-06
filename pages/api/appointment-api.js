import excuteQuery from '../../lib/db';


export default async (req, res) => {
    const appointment = JSON.parse(req.body);
    if (req.method === "POST") {
       await excuteQuery({query:'INSERT INTO `appointment`( `date`, `time`, `user`, `email`) VALUES(?,?,?,?)',
                    values: [appointment.date,appointment.time,appointment.name,appointment.email]});

        await excuteQuery({query:'INSERT INTO `appointment_block`( `BlockDate`, `BlockTime`) VALUES(?,?)',
                    values: [appointment.date,appointment.time]});

        res.json({result:true});
    }
     
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
