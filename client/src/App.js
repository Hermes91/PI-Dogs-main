import './App.css';
import { Route } from 'react-router-dom';
import Dogs from './components/dogComponents/dogs';
//import Home from './components/home/home';
import Landing from './components/landing'
import DogDetail from './components/dogComponents/dogDetail'
import AddDog from './components/dogComponents/addDog';
import NavBar from './components/home/navbar';
import About from './components/home/about';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:3001/'

function App() {
  return (
    <div className="App">

      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/dogs" >
        <NavBar />
        <Dogs/>
      </Route>

      <Route exact path="/dogDetail/:id">
        <NavBar />
        <DogDetail />
      </Route>

      <Route exact path='/AddDog'>
        <NavBar />
        <AddDog />
      </Route>

      <Route exact path='/About'>
        <NavBar />
        <About />
      </Route>
    </div>
  );
}

export default App;
