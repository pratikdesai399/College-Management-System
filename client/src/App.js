
import Login from './components/login'
import './App.css';
import Main from './components/Main';
import Home from './components/home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './components/register';


function App() {
  return(
    <Router>
      <Switch>
        <Route path='/' exact render={(props)=> <Home />} />
        <Route path='/register' exact render={(props)=> <Register />} />

        <Route path='/login' exact render={(props)=> <Login />} />
        <Route path='/main' exact render={(props)=> <Main />} />

      </Switch>

      
    </Router>
  ) 
}

export default App;
