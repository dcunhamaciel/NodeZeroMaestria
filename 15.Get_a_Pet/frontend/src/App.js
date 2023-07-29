import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

/* pages */
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Profile from './components/pages/User/Profile'

/* contexts */
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
        <UserProvider>
            <Navbar/>
            <Container>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/user/profile">
                        <Profile />
                    </Route>                    
                    <Route path="/">
                        <Home/>
                    </Route>            
                </Switch>
            </Container>
            <Footer/>
        </UserProvider>
    </Router>
  );
}

export default App;
