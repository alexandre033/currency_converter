import React, {Component} from 'react'
import {CurrencyFirst} from './_currencies-first'
import {CurrencySecond} from './_currencies-second'
import Historical from './_historical'

export default class Currencies extends Component{
    constructor(props){
        super(props)
        this.state = {
            currencies : [], 
            currencyFisrt : 1, 
            index : 0, 
            currencySymbolOne:"EUR", 
            currencySymbolTwo:"USD",
            lastUpdate : ""
        }
        this.getCurrencyFirstValue = this.getCurrencyFirstValue.bind(this)
        this.getSecondValue = this.getSecondValue.bind(this)
        this.getFirstValue = this.getFirstValue.bind(this)
    }
    getCurrencyFirstValue(e){
        this.setState({currencyFisrt : e.target.value})
    }
    //get the symbol selected
    getFirstValue(e){
        const valueTwo = this.state.currencySymbolTwo
        //update the symbol state
        this.setState({currencySymbolOne : e.target.value},
        () => {
            const value = this.state.currencySymbolOne
            fetch(`https://api.fixer.io/latest?base=${value}&symbols=${valueTwo}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const index = Object.values(data.rates)
                this.setState({index})
            })
        })
    }
    //find value of currency towards the symbols
    getSecondValue(e){
        const value = this.state.currencySymbolOne
        //update the symbol state
        this.setState({currencySymbolTwo : e.target.value},
        () => {
            const valueTwo = this.state.currencySymbolTwo
            fetch(`https://api.fixer.io/latest?base=${value}&symbols=${valueTwo}`)
            .then(res => res.json())
            .then(data => {
                
                const index = Object.values(data.rates)
                this.setState({index})
                this.setState({lastUpdate : data.date})
                
            })
        })
    }

    //receipt all the currencies name
    componentWillMount(){
        fetch("https://api.fixer.io/latest")
        .then(res => res.json())
        .then(data => {
            const currencies = []

            currencies.push(data.base, ...Object.entries(data.rates).map(rates => rates[0]));
            currencies.sort()
            this.setState({currencies})
            this.setState({lastUpdate : data.date})
            Object.entries(data.rates).map(entry => {
                if(entry[0] === "USD"){
                    const index = entry[1]
                    this.setState({index})
                }
            })
        });
    }

    render(){
        return(
            <section>
            <div id="currencies">
                <CurrencyFirst currenciesName = {this.state.currencies} getCurrencyValue = {this.getCurrencyFirstValue} currencyValue={this.state.currencyFisrt} currencySymbol={this.getFirstValue}/>
                <CurrencySecond currenciesName = {this.state.currencies} currencyFirstValue={this.state.currencyFisrt} getSecondValue={this.getSecondValue} index={this.state.index}/>
                <span>Last update : {this.state.lastUpdate}</span>
                
            </div>
            <div id="historical">
                <Historical currenciesName = {this.state.currencies}/>
            </div>
            </section>
        )
    }
}