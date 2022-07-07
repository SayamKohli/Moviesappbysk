import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex', background: 'white',padding:'0.5'}}>
        <Link to ="/" style={{textDecoration:'none'}} ><h1>Moviesapp </h1></Link>
        <Link to ="/favourites" style={{textDecoration:'none'}} ><h4 style={{marginLeft:'1rem',marginTop:'1.5rem'}}>favourites</h4></Link>
        
        
      </div>
    )
  }
}
