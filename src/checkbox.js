import React from 'react'

export const CheckBox = props => {
    return (
      <li style={{display: "inline"}}>
       <input key={props.id} onClick={props.handleCheckChieldElement} type='checkbox' value={props.name} /> {props.name}
      </li>
    )
}

export default CheckBox

/*import React from 'react';
import {Form} from 'react-bootstrap'

const CheckInput = (props) => {
    const getValue=(event)=>{
        props.changeChecked(event.target,event.target.checked);
    }
    return ( 
        <Form.Check 
             inline
            type='checkbox'
            id={props.id}
            checked={props.checked}
            value={props.label}
            label={props.label}
            onChange={getValue}
        />
     );
}
 
export default CheckInput;

{   this.state.ingredients?.length>0&&
    this.state.ingredients?.map((item,key)=><CheckInput onRemove={this.onRemove} style={{marginTop:"10%"}} checked={item} id={item.id} key={key} label={item.name}/>)
}
*/