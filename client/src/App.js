import { Route } from 'react-router-dom';
import './App.css';
import Form from './Components/Form/Form';
import Game from './Components/Game/Game';
import Home from './Components/Home/Home';
import Landing from './Components/Landing/Landing';
import Nav from './Components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Route exact path={'/'} component={Landing}/>
      <Route exact path={'/videogames'} component={Home}/>
      <Route path={'/videogames/:id'} component={Game}/>
      <Route path={'/create'} component={Form}/>
    </div>
  );
}

export default App;
