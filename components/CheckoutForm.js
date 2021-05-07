
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { UserOutlined,AimOutlined, HomeOutlined,GlobalOutlined } from '@ant-design/icons';
import { Input, Col, Row, Form, Button, Modal } from "antd";
import { useState,useEffect  } from "react";
import axios from 'axios';

const CheckoutForm = (props) => {


    const handleSubmit = async (values) => {
      setLoading(true);
        const result = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
              address: {
                city: values.city,
                line1: values.address,
                postal_code: values.zip,
                state: values.state
              },
              email: props.email,
              name: values.name,
              phone: props.phone
            }
          });
            await handleStripePayment(result);
      };
    
      const previous = () => {
        props.prev();
    }
    const next = () => {
      props.next();
  }
      const handleStripePayment =  result => {
        axios.post("https://api.trulylittlethings.com/create-customer",{
          method:{
          paymentMethodId: result.paymentMethod.id,},
          product: {
              amount: props.price,
              currency: 'hkd',
              payment_method_types: ['card'],
            }
         })
        .then(function (response) {  
            handleSubscription(response.data);

        })
       
        
      };
    
      const handleSubscription = subscription => {

        const  latest_invoice  = subscription;
        const  payment_intent  = latest_invoice;
    
        if (payment_intent) {
          const { client_secret, status } = payment_intent;
      
          if (status === "requires_action") {
            stripe.confirmCardPayment(client_secret).then(function(result) {
              setLoading(false);
              if (result.error) {
                console.log("error");
                Modal.error({
                  title: "Error",
                  content: result.error.message
                });
              } else {

                Modal.success({
                  title: "Success"
                });
                next();
              }
            });
          } else {
            Modal.success({
              title: "Success"  
            });
            next();
          }
        } else {
          console.log(`handleSubscription:: No payment information received!`);
        }
      };
    
  const [isLoading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const cardOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#1890ff",
        color: "rgba(0, 0, 0, 0.65)",
        fontWeight: 500,
        fontFamily: "Segoe UI, Roboto, Open Sans, , sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#bfbfbf" }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };

  return (
    
    <Form   layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Name On Card" name="name" colon={false} rules={[{ required: true }]}>
       <Input prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>
      <Form.Item label="Address" colon={false} name="address" rules={[{ required: true }]}>
      <Input prefix={<HomeOutlined className="site-form-item-icon" />}  />
      </Form.Item>
      <Input.Group>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="City" colon={false}  name="city" rules={[{ required: true }]}>
            <Input prefix={<AimOutlined className="site-form-item-icon" />}  />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="State" colon={false}  name="state" rules={[{ required: true }]}>
            <Input prefix={<GlobalOutlined className="site-form-item-icon" />}  />
            </Form.Item>
          </Col>
  
        </Row>
      </Input.Group>
      <Form.Item label="Card" colon={false} name="card" rules={[{ required: true }]}>
        <CardElement options={cardOptions} />
      </Form.Item>
      <Form.Item>
      <Button
        loading={isLoading}
        style={{width:"50%"}}
        type="primary"
        htmlType="submit" 
        className="checkout-button"
        disabled={!stripe}
      >
        SUBMIT
      </Button>
      <Button  style={{width:"50%"}}  type="secondary"  onClick={previous} >
        PREVIOUS
      </Button>

      
           
      </Form.Item>
    </Form>
  );
};


export default CheckoutForm;
