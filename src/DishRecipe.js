
import React, { Component } from 'react';
import { Button,Card,Modal } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Ingredient from './Ingrediant'

class DishRecipe extends Component {

    constructor(props) {
        super(props);
        
		this.state = {
			
			showIt: false,
		};
        
    }
    totalCalorise = () =>{
      let  sum=0;
       this.props.data.Ingredients.forEach(element => {
           sum+= element.Calories;
       });

       return(sum);
   } 

 render (){
    
  let IngClose = () => this.setState({ showIt: false });

    return(
      <div>
   <Card style={{ width: '18rem' ,height:"30rem", backgroundColor:"rgb(205, 180, 228)", textAlign:"center"}}>
    <Card.Img style={{width:"285px",height:"190px"}} variant="top" src={this.props.data.Image} />
    <Card.Body>
      <Card.Title> Name: {this.props.data.Name}</Card.Title>
      <Card.Text> Cooking Method:{this.props.data.CookingMethod}
      </Card.Text>
      <Card.Text> Time:{this.props.data.Time}
      </Card.Text>
      <Button style= {{backgroundColor:"#50cbd4" }} id={this.props.data.Id} variant="primary"onClick={() => this.setState({ showIt: true })}>Get Ingredients!</Button> <br/><br/> 
    <h1 variant="primary" >Total Calories:{this.totalCalorise(this.props.data.Ingredient)}
    
    </h1> 
    </Card.Body>
  </Card>
  <Modal
  size="lg"
  show={this.state.showIt}
  onHide={IngClose}
  aria-labelledby="example-modal-sizes-title-lg"
>
  <Modal.Header closeButton>
    <Modal.Title id="example-modal-sizes-title-lg">
                Ingredients
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>     <Row>  {this.props.data.Ingredients.length >0 ? this.props.data.Ingredients.map(ing => <Col> <Ingredient key={ing.Id} data={ing}/> </Col>)  : null}</Row>
</Modal.Body>
</Modal>
</div> 
);
      }
    }
      export default DishRecipe;