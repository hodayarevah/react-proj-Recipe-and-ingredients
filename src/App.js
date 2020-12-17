import React,{Component} from 'react';
import {Switch} from 'react-router';
import FormIngredient from "./FormIngredient"
import MyKitchen from './MyKitchen';
import Menu from "./Menu"
import {Route} from 'react-router-dom'
import FormRecipe from "./FormRecipe"

class App extends Component{
  render(){
return(


  <div>
    <Menu/>
<Switch>
  <Route exact path='/'>
  <MyKitchen/>
  </Route>
  <Route path='/FormIngredient'>
    <FormIngredient/>
  </Route>
  <Route path='/FormRecipe'>
  <FormRecipe/>
  </Route>
</Switch>
</div>
  
);
  }
  
}

export default App;
