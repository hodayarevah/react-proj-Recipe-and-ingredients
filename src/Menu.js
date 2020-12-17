import React from 'react';
import {Navbar,Nav,Image} from 'react-bootstrap';

export default function Menu(){
    return(
<Navbar  bg="dark" variant="dark" sticky="top">
<Image width='5%' height='5%' src="https://www.flaticon.com/svg/static/icons/svg/2944/2944515.svg" />
<Navbar.Brand>  Shirel and Hodaya</Navbar.Brand>
 <Nav className="mr-auto">
  <Nav.Link  href="/">My Kitchen</Nav.Link>
  <Nav.Link href="FormIngredient">New Ingredient</Nav.Link>
  <Nav.Link href="FormRecipe">New Recipe</Nav.Link>
 </Nav>
</Navbar>
    )
}
