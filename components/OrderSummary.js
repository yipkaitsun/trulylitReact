import { Col, Row } from "antd";
import Card  from 'react-bootstrap/Card';


const OrderSummary = (props) => {
  return (    
    <div className="order-summary">
    <Card   bg="light" style={{ width: '100%' }}>
    <Card.Header style={{fontSize:"20px",fontWeight:"bold"}}>Summary</Card.Header>
    <Card.Body>
      <Card.Text>
      {    
             props.product.map((arr,index,{length})=>(
               <div>
                <Row>
                <Col span={18}>
                  <div className="order-item">
                    <h5>{arr.name+" X "+arr.quantity}</h5>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="order-item-price">
                    <h5 style={{textAlign:"right"}}>${arr.subtotal}</h5>
                  </div>
                </Col>
   
              </Row>
                           <hr></hr>
                           </div>

          ))}
      </Card.Text>
      <Card.Text>
      <Row>
      <Col span={18} style={{fontSize:"20px",fontWeight:"bold"}} >Order Total</Col><Col span={6} >    <h5 style={{fontSize:"20px",fontWeight:"bold",textAlign:"right"}}> ${props.price}</h5></Col>
      </Row>
      </Card.Text>
    </Card.Body>
  </Card>


  
    </div>
  );
};

export default OrderSummary;