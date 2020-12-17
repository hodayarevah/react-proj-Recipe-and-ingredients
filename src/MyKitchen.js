//import { render } from '@testing-library/react';
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DishRecipe from './DishRecipe'


class MyKitchen extends React.Component {
    constructor(props){
        super(props)
            this.state={
                allRecipes:null,
               
            }
        
        }

           

componentDidMount() {
  
  const url=`http://localhost:64217/api/DishRecipe/`
  fetch(url)
  .then(res => {
  console.log('res=', res);
  console.log('res.status', res.status);
  console.log('res.ok', res.ok);
  return res.json()
  })
  .then(
  (result) => {
  console.log("fetch = ", result);
  
  this.setState({allRecipes:result});


  
  },
  (error) => {
  console.log("err post=", error);
  });

  
}


    

    render(){ 
      
        return (
          
          <Container fluid >
             
            <Row>
           
          <h1 style= {{paddingTop:"2%", paddingLeft:'40%'}}>Recepis List : </h1>
          </Row>
          <Row>
          {this.state.allRecipes!== null ? this.state.allRecipes.map(recipe => <Col style={{marginLeft: "5%",maxWidth:"20%"}}><DishRecipe key={recipe.id} data={recipe}/></Col>) : null}
        
          </Row>
          </Container>
          )
        }
     }
export default MyKitchen;