import {excuteSimpleQuery} from '../../lib/db';


export default async (req, res) => {

    if (req.method === "POST") {
      try {
        res.json({activity:await excuteSimpleQuery("SELECT * FROM `activity_db`")});
      } catch (e) {
        console.log(`shop-api:: Error: ${e.message}`);
        res.status(500).json({ statusCode: 500, message: e.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  };
