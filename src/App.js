
import './App.css';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from "react-router-dom";
import { Client } from './pages/Client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './pages/Admin';
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const user = useSelector(state => state.user)

  return (
    <Router>
      <Switch>
        {/* {
          user.RoleCode === null ?
            <Redirect to="/" />
            : user.RoleCode === 'CLIENT' ?
              <Redirect to="/" /> : <Redirect to="/admin" />
        } */}
        
        <Route path="/admin">
          {
            user.RoleCode !== 'ADMIN' ?
              <Redirect to="/admin/login" />
              : <Redirect to="/admin" />

          }

          <Admin />
        </Route>
        <Route path="/">
          <Client/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
