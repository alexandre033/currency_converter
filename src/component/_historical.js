import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class Historical extends Component{
    constructor (props) {
        super(props)
        this.state = {
          startDate: moment(),
          symbol : "EUR",
          historicalData : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.getHistoricalData = this.getHistoricalData.bind(this)
        this.setSymbol = this.setSymbol.bind(this)
    }
    
    handleChange(date) {
        this.setState({
          startDate: date
          
        });
    }
    //Set new symbol
    setSymbol(e){
        this.setState({
            symbol: e.target.value       
          });
    }
    //Get historical data
    getHistoricalData(){
        let date = this.state.startDate.format("DD/MM/YYYY")
        date = date.split('/').reverse()
        date = date.join('-')
        const symbol = this.state.symbol

        fetch(`https://api.fixer.io/${date}?base=${symbol}`)
        .then(res => res.json())
        .then(data => {
            const historicalData = []
            Object.entries(data.rates).map(data => {
                historicalData.push(data)
            })
            this.setState({historicalData : historicalData})
        })
    }

    render(){
        const {currenciesName} = this.props
        console.log(this.state.historicalData)
        
        return(
            <div>
                <h1>Historical Rate</h1>
                <div id="historical-data">
                <Form inline>
                <FormGroup>
                <Input type="select" name="select" onChange={this.setSymbol}>
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
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
                <FormGroup>
                    <Button onClick={this.getHistoricalData}>View data</Button>
                </FormGroup>
                </Form>
                </div>
                
                <div id="allSymbols">
                {
                    this.state.historicalData.map(data => {
                        return (
                            <div class="showData">
                                <div>
                                    <span><strong>{data[0]}</strong></span>
                                </div>
                                <div>
                                <span>{data[1]}</span>
                                </div>
                            </div>
                        )
                    })
                }
                </div> 
            </div>
        )
    }
}