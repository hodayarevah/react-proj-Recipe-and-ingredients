import React, { Component } from 'react';
import { Card } from 'react-bootstrap';


class Ingredient extends Component {


    constructor(props) {
        super(props);
        
    }
    render (){
  return( 
 <Card  style={{ width: '16rem' ,color:"rgb(205, 180, 228)",marginLeft: "5%"}}>
  <Card.Img variant="top"style={{width:"250px",height:"150px"}} src={this.props.data.Image} />
  <Card.Body>
  <Card.Title>{this.props.data.Name}</Card.Title>
    <Card.Text>
    Calories:{this.props.data.Calories}
    </Card.Text>
  </Card.Body>
</Card>);
    }
 }
  export default Ingredient;