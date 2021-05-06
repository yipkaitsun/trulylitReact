import Stripe from "stripe";
const stripe = new Stripe("sk_test_51HcTyyEB60BHODB7rVMZDdIfayjume0W8mc6XLhmxhBIwV6tiCYUVJRSNjXrFyEraiPWHY2AYZGjV2tOsfZIvJSc00ai3JDW9R");

export default async (req, res) => {
  if (req.method === "POST") {
      const { paymentMethodId } = JSON.parse(req.body).method;
      const  product  = JSON.parse(req.body).product;
    try {
      const paymentIntent= await stripe.paymentIntents.create(product);

    await stripe.paymentIntents.confirm(
        paymentIntent.id,
        {payment_method: paymentMethodId}
      );
     res.json({ id: paymentIntent.client_secret });

    } catch (e) {
      console.log(`create-customer:: Error: ${e.message}`);
      res.status(500).json({ statusCode: 500, message: e.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};