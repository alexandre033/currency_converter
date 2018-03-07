import React, {Component} from 'react'
import FaDotCircleO from 'react-icons/lib/fa/dot-circle-o'


export const Header = () =>{

    return(
        <header>
            <div id="logo">  
            <FaDotCircleO />
            </div>
            <h1>Currency Converter</h1>   
        </header>
    )
}