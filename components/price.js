import React, { Component } from 'react';
import CarouselItem from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Card from 'react-bootstrap/Card';
import { Markup } from 'interweave';
import axios from 'axios';
import '../styles/app.css'
class CardPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
        price: [],
    }
    this.loadData();
  }

  loadData() {
      axios.post("https://trulylittlethings.herokuapp.com/price-api", {
    }) .then((response) => {
        this.setState({ price: response.data.price });

      });

  }

  render() {

    return (

      <CarouselItem responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }} infinite={false}>
            {this.state.price.map((arr, index, { length }) => (
          
                <Card style={{ width: "94%",height:"94%"}}>
                    <Card.Body style={{ textAlign: "center", padding: "0px" }}>
                        <Card.Title>{arr.name}</Card.Title>
                        <Card.Text> <Markup content={arr.price}/></Card.Text>
                        <br /><br />

                        <Card.Text><div className="card-title h5"><Markup content={arr.info}/></div></Card.Text>

                    </Card.Body>
                </Card>


                 


        ))
        }
      </CarouselItem>
    )
  }
}

export default CardPrice;
