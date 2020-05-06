import React , {Component} from 'react';
import {fire,db,domain} from './firebase_config';
import './App.css';


class  Home extends Component {

  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.Addnewurls = this.Addnewurls.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.Deleteurl=this.Deleteurl.bind(this);

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

 componentDidMount ()
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
 componentDidUpdate(prevProps, prevState)
 {
    if (prevState !== this.state) {
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
 Deleteurl(e)
 {
    var documentid=e.target.id;
    //console.log(documentid);
    db.collection('urls').doc(documentid).delete();
 }
 handleChange(e){
    this.setState({[e.target.name]: e.target.value});
}

render(){
    return(
                <div className ="dashboard-body">
                <div className ="container-fluid p-0">
                    <div className ="dash_welcome theme-bg p-4 text-light text-center">
                        <h1 className ="dash_big_head"> Welcome to Shorten</h1>
                        <h3 className ="dash_small_head"> Your custom url shortner </h3>
                        <button className ="btn btn-danger text-light w-25 p-2 mb-4 mt-2" id="logoutbtn" onClick={this.logout}>Logout</button>
                    </div>
                </div> 
                
                <div className ="container overlay-form">
                    <form className ="shortner-form" method="post">
                        <div className ="row mb-4">
                        <div className ="col">
                        
                                    <label className ="theme-text"> Paste your long url here </label>
                                    <input 
                                    type="url" 
                                    name="longurl" 
                                    className ="form-control" 
                                    id="longurl" 
                                    placeholder="https://" 
                                    value={this.state.longurl} 
                                    onChange={this.handleChange} required ></input>
                        </div>
                        <div className ="col">
                        <label className ="theme-text"> New Short Url </label>
                        <div className ="input-group mb-2">
                            <div className ="input-group-prepend">
                            <div className ="input-group-text">{domain + "/?v="}</div>
                            </div>
                            <input type="text" 
                                    name="shorturl" 
                                    className ="form-control" 
                                    id="shorturl" 
                                    placeholder="short" 
                                    value={this.state.password} 
                                    onChange={this.handleChange} required></input>
                        </div>
                        </div>
                        </div>
                         
                        { this.state.error==='403' ? 
                        (
                            <div className ="bg-danger text-light text-center m-auto w-50 p-2">
                                <h5>oops !seems like the short url already exists</h5>
                            </div>
                        )
                        :this.state.error==='401' ?
                        (
                            <div className ="bg-danger text-light text-center m-auto w-50 p-2">
                                <h5>ehe</h5>
                            </div>
                        )
                        :
                        (false)
                        
                        }
                        <button type="submit" value="Get url now" className ="btn theme-bg text-light" id="submiturl" onClick={this.Addnewurls}>Get url now</button>
                    </form>
                </div>
                { this.state.newurl ?
                (
                <div className ="container theme-bg alert text-light alert-dismissible fade show text-center p-4" role="alert">
                <strong>Your custom short link is  : </strong>
                <span id="custom-link">{this.state.newurl}</span>
                </div>
               
                 ) :
                (false)
                } 
                <div className ="container">
                    <h1 className ="dash_big_head my-4">Previous built links</h1>
                    <table className ="table table-bordered" width="100%" >
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
                                            <tr key={urls.data.shorturl}>
                                                <td><a href={urls.data.longurl} target="_blank" rel="noopener noreferrer">{urls.data.longurl}</a></td>
                                                <td><a href= {domain +"/v/"+ urls.data.shorturl} target="_blank" rel="noopener noreferrer">{domain +"/v/"+ urls.data.shorturl}</a></td>
                                                <td>{urls.data.status}</td>
                                                <td><button className ="btn btn-danger" id={urls.id} onClick={this.Deleteurl}>Delete</button></td>
                                                
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
