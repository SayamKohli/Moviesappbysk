import React, { Component } from "react";
import { movies } from "./getMovies";
import axios from 'axios';

export default class Movies extends Component {
    constructor(){                               //additional changes baad me
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }

    async componentDidMount(){
        //Side effects
     const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e662cd1c20a2e08ff3eaacc19197766b&language=en-US&page=${this.state.currPage}`);   
        let data=res.data;
        //console.log(data);  

        this.setState({
            movies:[...data.results]
        })
        //console.log('mounting done');
    }

    changeMovies = async() =>{
        console.log("changesmovies called");
        console.log(this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=e662cd1c20a2e08ff3eaacc19197766b&language=en-US&page=${this.state.currPage}`);   
        let data=res.data
        //console.log(data);  

        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=()=>{
        let temparr=[]

        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i);
        }

        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies);
        

    }

    handleLeft =() => {
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }

    }

    handleClick =(value) => {


        if(value!= this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
        }

    }

    handleFavourites= (movie) => {
        let olddata =JSON.parse(localStorage.getItem('movies-app') || "[]")
    if(this.state.favourites.includes(movie.id)){
        olddata=olddata.filter((m) => m.id!=movie.id)
    }else{
        olddata.push(movie)
    }
    localStorage.setItem("movies-app",JSON.stringify(olddata))
    console.log(olddata)
    this.handleFavouritesState()
    
    }
  handleFavouritesState=()=>{
    let olddata=JSON.parse(localStorage.getItem("movies-app")||"[]")
    let temp = olddata.map((movie)=>movie.id)
    this.setState({
      favourites:[...temp]
    })
  }  
  render() {
    //let movie = movies.results;
    //console.log('render')
    return (
      <>
        {this.state.movies.length == 0 ? 
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
         : 
          <div>
            <h3 className="text-center">
              <b>Trending</b>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div className="card movies-card" onMouseEnter={() => this.setState({hover:movieObj.id})}  onMouseLeave={()=> this.setState({hover:""})}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    
                    className="card-img-top"
                    alt={movieObj.title}
                    class="card-img-top movies-img"
                  />
                  
                  <h5 className="card-title movies-title">
                    {movieObj.original_title}
                  </h5>
                  {/*<p class="card-text movies-text">{movieObj.overview}</p>*/}
                   <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                    {
                        this.state.hover== movieObj.id  && 
                        <a href="#" className="btn btn-primary movies-button"onClick={() => this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to favourites"}</a>
                    }
                   
                  </div>
                  
                </div>
              ))
              }
              <div style={{display:'flex',justifyContent:'center'}}>
              <nav aria-label="Page navigation example">
              <ul class="pagination">
              <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                {
                    this.state.parr.map((value) => (
                        <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                        
                        
                    ))

                    
                }
                <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                 
                 
                 
              </ul>
              </nav>
              </div>
              
              {/* Don,t do this
                movie.map(function(movieObj)             //don't call like this here very difficult
                { 
                    <div className="card banner-card">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top"
                    alt={movie.title}
                    className="card-img-top banner-img"
                  />
                  
                  <h1 className="card-title banner-title">
                    {movie.original_title}
                  </h1>
                  <p class="card-text banner-text">{movie.overview}</p>
                  
                  
                </div>
                
                })
            */}
            </div>
          </div>
        }
      </>
    );
  }
}
