import './App.css';
import PokemonPage from "./MainComponents/PokemonPage";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/:pageNumber">
      <div className="App">
        <PokemonPage />
      </div>
      </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
