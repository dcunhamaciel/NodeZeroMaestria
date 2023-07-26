import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

/* pages */
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/register">
                <Register/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>            
        </Switch>
    </Router>
  );
}

export default App;
