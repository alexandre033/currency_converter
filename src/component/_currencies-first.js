import React, {Component}  from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export const CurrencyFirst = (props) =>{

        const {currenciesName, getCurrencyValue, currencyValue, currencySymbol} = props

        return(
            <Form inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input type="number" onChange={getCurrencyValue} value={currencyValue}/>    
            </FormGroup>
            <FormGroup>
            <Input type="select" name="select" id="exampleSelect" onChange={currencySymbol}>
            {
                currenciesName.map(name => {
                    if(name === "EUR"){
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