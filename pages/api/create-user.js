import excuteQuery from '../../lib/db';
export default async (req, res) => {
    const user = JSON.parse(req.body).user;

    if (req.method === "POST") {
      try {
        res.json({msg:await excuteQuery({
        query: 'INSERT INTO `login_db` (username, pwd,`Fname`,`Lname`, email,role,Contact) VALUES(?, ?, ?, ?, ?,?,?)',
        values: [user.username,user.pwd,user.Fname,user.Lname,user.email,"customer",user.contact],
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
