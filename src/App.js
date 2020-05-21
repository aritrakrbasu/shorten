//Importing all important files 

import React , {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import fire from './firebase_config';
import Login from './login';
import Register from './register';
import Home from './home';
import Destination from './destination';
import Public from './public';
import {PrivateRoute} from './privateroute';
import { createBrowserHistory  } from 'history'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      user:{},
    }
  }


  componentDidMount(){
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) => {
     // console.log(user)
      if(user)
      {
        localStorage.setItem('user',user.uid);
        this.setState({user});
        this.setState({islogged:true});
      }else
      {
        
        localStorage.removeItem('user');
        this.setState({user: null});
        this.setState({islogged:false});
      }
    });
  }

  render(){
    return(
      <div className="App">
        <BrowserRouter>
        <Switch>      
          <Route exact path="/" component ={Public}></Route>         
          <Route exact path="/register" component ={Register}></Route>
          <Route exact path="/login" component ={Login}></Route>
          <Route  path="/v/:id" component ={Destination}></Route> 
          <PrivateRoute path="/dashboard" component={Home} />
          </Switch>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
