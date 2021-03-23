import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Products from "./components/Products"
import Details from "./components/Details";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path='/' component={Products}/>
                    <Route exact path='/product/:id' component={Details}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

