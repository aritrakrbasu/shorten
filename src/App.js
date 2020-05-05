//Importing all important files 

import React , {Component} from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import './App.css';
import fire from './firebase_config';
import Login from './login';
import Register from './register';
import Home from './home';
import Destination from './destination';
import Public from './public';

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
      //console.log(user);
      if(user)
      {
        this.setState({user});
        //localStorage.setItem('user',user.uid);
      }else
      {
        this.setState({user: null});
        //localStorage.removeItem(user);
      }
    });
  }

  render(){
    return(
      <div className="App">
         { this.state.user ? 
         (<div>
         <Home />
         <BrowserRouter>
          <Route  path="/v/:id" component ={Destination}></Route> 
         </BrowserRouter>
         </div>
         )
         :
         (
        <BrowserRouter>
        <Switch>          
          <Route exact path="/" component ={Public}></Route>         
          <Route exact path="/register" component ={Register}></Route>
          <Route exact path="/login" component ={Login}></Route>
          <Route  path="/v/:id" component ={Destination}></Route> 
          </Switch>

        </BrowserRouter>
         )}
      </div>
    );
  }
}

export default App;
