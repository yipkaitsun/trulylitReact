import React, { Component } from 'react';
import CarouselItem from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import '../styles/app.css'
class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
    }
    this.loadData();
  }

  loadData() {

      axios.post("https://api.trulylittlethings.com/activity-api", {
   
    
    }) .then((response) => {
        this.setState({ activity: response.data.activity });

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
        {this.state.activity.map((arr, index, { length }) => (
          <a key={"product" + index} href={arr.link}>
            <Card style={{ width: '100%' }} className="ActivityCard">
              <Card.Img variant="top" src={arr.image} />
              <Card.Body className="ActivityCardBody">
                <Card.Title className="ActivityCardTitle">{arr.name}</Card.Title>
                <Card.Text >
                  {arr.discription}
                </Card.Text>

              </Card.Body>
            </Card>

          </a>

        ))
        }



      </CarouselItem>
    )
  }
}

export default Activity;
