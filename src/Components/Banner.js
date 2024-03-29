import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Banner extends Component {
  render() {
    //console.log(movies)
    let movie=movies.results[0]
    //let movie=''
    return (
        <>
        {  movie == ''?
        <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>:
        
        <div className="card banner-card" >
        <img src= { `https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top" alt={movie.title} class="card-img-top banner-img"/>
        {/*<div className="card-body">*/}
          <h1 className="card-title banner-title">{movie.original_title}</h1>
          <p class="card-text banner-text">{movie.overview}</p>
          {/*<a href="#" className="btn btn-primary">Go somewhere</a>*/}
        {/*</div>*/}
      </div>

        }

      </>
    )
  }
}
