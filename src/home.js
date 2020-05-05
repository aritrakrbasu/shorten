import React , {Component} from 'react';
import {fire,db,domain} from './firebase_config';
import './App.css';


class Home extends Component {

  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.Addnewurls = this.Addnewurls.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.Deleteurl=this.Deleteurl.bind(this);
    this.Refresh=this.Refresh.bind(this);

    this.state={
        longurl:'',
        shorturl:'',
        urls:null,
        flag:null,
        error:'',
        newurl:''
    }
  }
 logout(){
     fire.auth().signOut();
 }

 componentDidMount()
 {
    
    db.collection('urls')
    .get()
    .then(snapshot =>{
        const urls=[]
     snapshot.forEach( doc =>{
         const data =doc.data();
         const id   =doc.id;
         const newjson ={
             "data": data,
             "id":id

         }
         //console.log(newjson);
         urls.push(newjson)
     })
     this.setState({ urls:urls})
    })
    .catch(error => console.log(error))
 }

 Addnewurls(e)
 {
    e.preventDefault();
    
    var docRef = db.collection("urls").doc(this.state.shorturl);
    var shorturl=this.state.shorturl;
    var longurl=this.state.longurl;
    

    docRef.get().then((doc)=> {
        if (doc.exists) {
            this.setState({error:'403'})
            //console.log(this.state.error)
           
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            db.collection('urls').doc(shorturl)
            .set({
            longurl: longurl,
            shorturl: shorturl,
            status: 'Active'
            });
            this.setState({newurl:domain+"/v/"+shorturl})
        }
    }).catch((error) =>{
        console.log("Error getting document:", error);
        this.setState({error:error})
    });

    
   
 }
 Refresh(e)
 {
    e.preventDefault();  
    window.location.reload();
 }
 Deleteurl(e)
 {
    var documentid=e.target.id;
    //console.log(documentid);
    db.collection('urls').doc(documentid).delete();
    window.location.reload();
 }
 handleChange(e){
    this.setState({[e.target.name]: e.target.value});
}

render(){
    return(
                <div class="dashboard-body">
                <div class="container-fluid p-0">
                    <div class="dash_welcome theme-bg p-4 text-light text-center">
                        <h1 class="dash_big_head"> Welcome to Shorten</h1>
                        <h3 class="dash_small_head"> Your custom url shortner </h3>
                        <button class="btn btn-danger text-light w-25 p-2 mb-4 mt-2" id="logoutbtn" onClick={this.logout}>Logout</button>
                    </div>
                </div> 
                
                <div class="container overlay-form">
                    <form class="shortner-form" method="post">
                        <div class="row mb-4">
                        <div class="col">
                        
                                    <label class="theme-text"> Paste your long url here </label>
                                    <input 
                                    type="text" 
                                    name="longurl" 
                                    class="form-control" 
                                    id="longurl" 
                                    placeholder="https://" 
                                    value={this.state.longurl} 
                                    onChange={this.handleChange} ></input>
                        </div>
                        <div class="col">
                        <label class="theme-text"> New Short Url </label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                            <div class="input-group-text">{domain + "/?v="}</div>
                            </div>
                            <input type="text" 
                                    name="shorturl" 
                                    class="form-control" 
                                    id="shorturl" 
                                    placeholder="short" 
                                    value={this.state.password} 
                                    onChange={this.handleChange} ></input>
                        </div>
                        </div>
                        </div>
                         
                        { this.state.error=='403' ? 
                        (
                            <div class="bg-danger text-light text-center m-auto w-50 p-2">
                                <h5>oops !seems like the short url already exists</h5>
                            </div>
                        )
                        :this.state.error=='401' ?
                        (
                            <div class="bg-danger text-light text-center m-auto w-50 p-2">
                                <h5>ehe</h5>
                            </div>
                        )
                        :
                        (false)
                        
                        }
                        <button type="submit" value="Get url now" class="btn theme-bg text-light" id="submiturl" onClick={this.Addnewurls}>Get url now</button>
                    </form>
                </div>
                { this.state.newurl ?
                (
                <div class="container theme-bg alert text-light alert-dismissible fade show text-center p-4" role="alert">
                <strong>Your custom short link is  : </strong>
                <span id="custom-link">{this.state.newurl}</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={this.Refresh}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
               
                 ) :
                (false)
                } 
                <div class="container">
                    <h1 class="dash_big_head my-4">Previous built links</h1>
                    <table class="table table-bordered"width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                    <th>Original Link</th>
                                    <th>Short Link</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                    <th>Original Link</th>
                                    <th>Short Link</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody id="table_body">
                                {
                                    this.state.urls &&
                                    this.state.urls.map( urls =>{
                                        return(
                                            <tr>
                                                <td><a href={urls.data.longurl} target="_blank" rel="noopener noreferrer">{urls.data.longurl}</a></td>
                                                <td><a href= {domain +"/v/"+ urls.data.shorturl} target="_blank" rel="noopener noreferrer">{domain +"/v/"+ urls.data.shorturl}</a></td>
                                                <td>{urls.data.status}</td>
                                                <td><button class="btn btn-danger" id={urls.id} onClick={this.Deleteurl}>Delete</button></td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                    </table>
                </div>
                </div>


    );
  }
}

export default Home;
