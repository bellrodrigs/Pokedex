import React, { Component } from 'react'
import pokedex from  '../../assets/img/pokedex.png'


export default class NavBar extends Component {
    render() {
        return (
            <div>
               <nav className="navbar navbar-dark bg-dark fixed-top" >
               <a className="navbar-brand" href="/">
                   <img src={pokedex} className="image-costum navbar-brand" />
                   </a>
               </nav>
            </div>
        )
    }
}
