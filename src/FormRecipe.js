import React, { Component } from 'react';
import {Form ,Button} from 'react-bootstrap';
import './formCSS.css';
import CheckBox from './checkbox'


class RecipeForm extends Component {

    constructor(props) {
        super(props);
    
     this.state={
       name:'',
       image:'',
       ingredients:[],
       time:'',
       cookingMethod:'',
       ingredientsInRe:[],
     }
    }
    componentDidMount(){
      this.getIngredients();
  }
  getIngredients=()=>{

    const allingredien = [];
    const url = `http://localhost:64217/api/Ingredient/`
    fetch(url)
    .then(response => response.json())
    .then(res => {
      console.log('res=', res);
        res.forEach((item) => {
          allingredien.push({id: item.Id ,name: item.Name, image:item.Image, calories:parseInt(item.Calories)});
        });
        this.setState({ingredients:[...allingredien]});
    });
      }

     //hendel form post new ingredeient 
     handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }
       
        
    submitres = (event) =>
     {  if (this.state.name==='' ||this.state.image ==='' || this.state.time === ''||this.state.cookingMethod === '') {
      alert("missing some values, please fill the entire form.");
  }
  else{
     
      //alert("push");
      console.log(this.state);
    
      const data = { 
        name: this.state.name,
        image: this.state.image,
        cookingMethod:this.state.cookingMethod,
        ingredients:this.state.ingredientsInRe,
        time:parseInt(this.state.time) ,
        };
      //  alert({data});
        console.log(data);
      let apiUrl = "http://localhost:64217/api/DishRecipe/";
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
          console.log(result.Avg);
          if (result===1)
          {
              alert("recipe added");
            }
        },
          (error) => {
            console.log("err post=", error);
          });
  
      console.log('end');

        }
      }
    
    /*
    onSelect =(e) =>{
      console.log(e);
      let allingredien=this.state.ingredientsInRe;
      allingredien.push(e);
      this.setState({ingredientsInRe:allingredien});
  }

  onRemove =(e) =>{

    var filtered = this.state.ingredientsInRe.filter(function(el) { return el.id !== e.id; }); 

    this.setState({selectedValue:filtered});
}
  */
 handleCheckChieldElement = (event) => {
  let ingri = this.state.ingredients
  let selected=this.state.ingredientsInRe
  ingri.forEach(item => {
     if (item.name === event.target.value)
     {
        selected.push(item);
     
     }
  })
  this.setState({ingredientsInRe:[...selected]});
  
}

       render(){
        return (  

<Form>
<Form.Group controlId="formNewRe">
<Form.Label style={{width: "100%"}}>Create New Recipe </Form.Label>
<Form.Label>Name</Form.Label>
<Form.Control  name='name' onChange={this.handleChange} style={{width: "50%", marginLeft:"25%"}}type="text" placeholder="Enter name" />
<Form.Label>Cooking method</Form.Label>
<Form.Control  name='cookingMethod' onChange={this.handleChange}  style={{width: "50%", marginLeft:"25%"}}type="text" placeholder="Enter Cooking method" />
<Form.Label>Time</Form.Label>
<Form.Control  name='time' onChange={this.handleChange} style={{width: "50%", marginLeft:"25%"}}type="number" placeholder="Enter Time" />
<Form.Label>Image</Form.Label>
<Form.Control name='image'  onChange={this.handleChange} style={{width: "50%", marginLeft:"25%"}}type="text" placeholder="Enter imge url" />
<Form.Label style={{paddingLeft:"46%",paddingRight:"50%"}}>Ingredients</Form.Label>
<Form.Label></Form.Label>
{
          this.state.ingredients.map((ingr) => {
            return (<CheckBox name ={ingr.name} key={ingr.id} handleCheckChieldElement={this.handleCheckChieldElement}  {...ingr} />)
          })
 }
 
<Button onClick={this.submitres}variant="primary" type="submit" style= {{backgroundColor:"#50cbd4",marginTop: "5%", marginLeft: "40%", marginRight: "40%" }}>
Create New Recipe
</Button>
<Button style= {{backgroundColor:"#ff485e",marginTop: "5%" }}  href="FormRecipe">
Clear Form
</Button>
</Form.Group>

</Form>
        );
    }

}

export default RecipeForm;