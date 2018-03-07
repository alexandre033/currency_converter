import React, {Component}  from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export const CurrencySecond = (props) => {
        const {currenciesName, currencyFirstValue, getSecondValue, index} = props
        const newValue = currencyFirstValue * index 
        
        return(
            <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="text" value={newValue}/>    
            </FormGroup>
            <FormGroup>
            <Input type="select" name="select" id="exampleSelect" onChange={getSecondValue}>
            {
                currenciesName.map(name => {
                    if(name === "USD"){
                        return <option value={name} selected>{name}</option>
                    }else{
                        return <option value={name}>{name}</option>
                    }
                    
                })
            }
            </Input>
            </FormGroup>
            </Form>
        )
}