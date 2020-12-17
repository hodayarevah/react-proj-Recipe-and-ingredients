
import {Form ,Button} from 'react-bootstrap';
import React, { Component } from 'react';
import './formCSS.css';



class FormIngredient extends Component{
  constructor(props) {
    super(props);
    
    
   this.state={
        name:'',
        image:'',
        calories:''
    }
  }
 //hendel form post new ingredeient 
 handleChange = (event) => {
  this.setState({[event.target.name]: event.target.value});
}
    handleSubmit = (event) => {
      if (this.state.name==='' ||this.state.image ==='' || this.state.calories === '') {
          alert("missing some values, please fill the entire form.");
      }
      else{
      console.log(this.state);
    const data = { 
      name: this.state.name,
      image: this.state.image,
      calories:parseInt(this.state.calories) 
      };
      const apiUrl = `http://localhost:64217/api/Ingredient/`;;
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
        .then(response => {
          console.log('response=', response);
          console.log('response.status', response.status);
          console.log('response.ok', response.ok);
          return response.json();
        
        })
        .then((result) => {
          console.log("result= ", result);
          console.log(result.Avg)
          alert("ingredieant added");

        },
          (error) => {
            console.log("err post=", error);
          });
  
      console.log('end');
    }
      }
    

/*  
        clearForm=()=>{
            this.setState({
                name:'',
                image:'',
                calories:''
            })
        }
          */
        render(){
            return (  

<Form onSubmit={this.handleSubmit}>
  <Form.Group controlId="formNewIng">
  <Form.Label  style={{width: "100%"}}>Create  New Ingredient </Form.Label>
    <Form.Label>Name</Form.Label>
    <Form.Control name='name' onChange={this.handleChange} style={{width: "50%", marginLeft:"25%"}}type="text" placeholder="Enter ingredient name" />
    <Form.Label>Image</Form.Label>
    <Form.Control  name='image' onChange={this.handleChange} style={{width: "50%", marginLeft:"25%"}}type="text" placeholder="Enter imge url" />
    <Form.Label>Calories</Form.Label>
    <Form.Check  name='calories' onChange={this.handleChange} type="number" placeholder="Enter dish calories" />
  <Button style= {{backgroundColor:"#50cbd4",marginTop: "10%" }}variant="primary" type="submit">
    Create New Ingedient
  </Button>
  <Button style= {{backgroundColor:"#ff485e",marginTop: "10%" }}  href="FormIngredient">
    Clear Form
  </Button>
  </Form.Group>
</Form>
            );
        }
    
}

export default FormIngredient;