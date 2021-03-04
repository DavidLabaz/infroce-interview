import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Users from './components/Users'
import Posts from './components/Posts'
import Post from './components/Post'

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path='/' component={Users}/>
                    <Route exact path='/posts/:id' component={Posts}/>
                    <Route exact path='/posts/details/:id' component={Post}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

