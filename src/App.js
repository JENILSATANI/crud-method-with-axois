import logo from './logo.svg';
import './App.css';
import Upload from './Upload';
import Copy from './Copy';
import Pp from './Pp'
import { BrowserRouter as Router, Route, Switch, Redirect, } from 'react-router-dom';
import Om from './Om';
function App() {
  return (
    <div className="App">
      {/* <Upload/> */}
      {/* <Copy /> */}
      {/* <Pp/> */}
      <Router>
        <Switch>
        <Route exact path='/table' component={Copy} />
        <Route path='/:id' component={Pp}/>
        <Route path='/' component={Om}/>
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
