import React , {Component} from 'react';
import './App.css';


class Public extends Component {
    render(){
        return(
          <div className="App">

                    <div class="container-fluid" id="preloader">
                    <div class="nav">
                        <ul class="nav-menus">
                        <a href="/register"> <li>Register Now</li></a>
                        <a href="/login"><li>Login Now</li></a>
                        </ul>
                        
                    </div>
                    <div class="desc">
                        <h1 class="website_head theme-text"> Shortner</h1>
                        <h3>Your custom url shortner</h3>
                    </div>
                            <div class="boxes">
                                <div class="box">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div class="box">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div class="box">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div class="box">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            </div>

            
          </div>
        );
      }
    }
    
    export default Public;
    