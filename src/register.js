import React , {Component} from 'react';
import {fire} from './firebase_config';


class Register extends Component {

    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this);
        this.register=this.register.bind(this);
        this.state={
            email:'',
            password:''
        }
      }
      register(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u) => {
    
        }).catch((error)=>
        {
             alert(error.message);
        });
    }
      handleChange(e){
          this.setState({[e.target.name]: e.target.value});
      }
    

    render(){
        return(
                            <div class="container-fluid">

                            <div class="nav">
                                <ul class="nav-menus">
                                <a href="/"><li>Home</li></a>
                                <a href="/login"> <li>Login</li></a>
                                </ul>
                                
                            </div>
                <div class="row">
                    <div class="col-lg-6 theme-bg h-100 text-center text-light">

                        <div class="website_desc div-middle">
                            <div class="img-holder w-25 m-auto">
                            <img src="logo.png" class="img-fluid" alt="logo"/>
                            </div>
                            <h1> Shorten </h1>
                            <h3 class="text-white">  Your custom url shortner </h3>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="div-middle">
                        <h1 class="website_head"> Register </h1>
                            <form class="login-form text-left mx-auto my-4">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} ></input>
                                    
                                </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                    <input onChange={this.handleChange} value={this.state.password} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
                                    ></input>
                </div>                  
                                <div class="form-group text-center">
                                    <button type="submit" onClick={this.register} class="btn theme-bg text-light w-25 p-2 mx-2" id="loginbtn">Register</button>
                                </div>
                                <p>Have an account <a href="/login">Login Now </a></p>
                            </form>

                            
                        </div>
                    </div>
                </div> 
                </div> 
            );
        }
      }

export default Register;
      