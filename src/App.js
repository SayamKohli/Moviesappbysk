import logo from './logo.svg';
import Navbar from './Components/Navbar';
import './App.css';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Switch,Route,Routes,} from 'react-router-dom';
function App() {
  return (
    <div>
   
  <Router>
  <Navbar/>
  
    
   <Routes> 
      

   <Route path ='/' element={<><Banner/><Movies/></>} />
    
    <Route exact path ='/favourites' element={<Favourite/>}/>
   
    
    {/*<Banner/>*/}
    {/*<Movies/>*/}
    {/*<Favourite/>*/}
  </Routes>
  </Router>  
  </div>
  
    
  );
}

export default App;
