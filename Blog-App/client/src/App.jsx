import './App.css';
import { Route, Switch } from 'react-router';
import Posts from './pages/Posts/Posts';
import Profile from './pages/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import NavBar from './components/navigation/navbar';

function App() {
  return (
    <div className="App">
      <NavBar className="navBar" />
      <div className="routerContainer">
        <Switch>
          <Route strict exact path="/posts" component={Posts} />
          <Route strict exact path="/signup" component={Signup} />
          <Route strict exact path="/signin" component={Signin} />
          <Route strict exact path="/profile/:id" component={Profile} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
