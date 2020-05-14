import React , {Component} from 'react';
import {fire,db,domain} from './firebase_config';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt,faSignal,faSmileBeam } from '@fortawesome/free-solid-svg-icons'
import EditModal from './component/modal'

class  Home extends Component {

  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.Addnewurls = this.Addnewurls.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.Deleteurl=this.Deleteurl.bind(this);
    this.refresh=this.refresh.bind(this);
    this.toggle=this.toggle.bind(this);
    this.togg=this.togg.bind(this);

    this.state={
        longurl:'',
        shorturl:'',
        urls:null,
        flag:null,
        error:'',
        newurl:'',
        refresh:false,
        editModalStatus : false,
        editdoc:''
    }
    this.editmodal = React.createRef();

  }
 logout(){
     fire.auth().signOut();
 }

 componentDidMount ()
 {
    console.log(localStorage.getItem("user"))
    db.collection('urls')
    .where("author","==",localStorage.getItem("user")).get()
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
     this.setState({ urls:urls,urlarrlength :urls.length})
    })
    .catch(error => console.log(error))

    
 }
 componentDidUpdate()
 {
    if (this.state.refresh) {
    db.collection('urls')
    .where("author","==",localStorage.getItem("user")).get()
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
     this.setState({ urls:urls,urlarrlength :urls.length,refresh:false})
     
    })
    .catch(error => console.log(error))
}
 }

 Addnewurls(e)
 {
     e.preventDefault();
    if(this.state.shorturl && this.state.longurl)
    {
        this.setState({error:null,newurl:null})
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
                docRef
                .set({
                longurl: longurl,
                shorturl: shorturl,
                status: 'True',
                author:localStorage.getItem("user")
                });
                this.setState({newurl:domain+"/v/"+shorturl,refresh:true})
            }
        }).catch((error) =>{
            console.log("Error getting document:", error);
            this.setState({error:error})
        });
    }
    else
    {
        this.setState({error:"404"})
    }
    
  
 }
 Deleteurl(e)
 {
    var documentid=e.currentTarget.id;
    //console.log(documentid);
    db.collection('urls').doc(documentid).delete();
    this.setState({refresh:true})
 }
 handleChange(e){
    this.setState({[e.target.name]: e.target.value});
    
    console.log(this.state.toggle);
}

 togg(e){
    this.setState({[e.target.name]: e.target.checked});
    
    console.log(this.state.toggle);

} 
 toggle(e){
     e.preventDefault();
     var documentid=e.currentTarget.id;
     var checked=e.currentTarget.checked;

    // console.log(checked);
     db.collection('urls').doc(documentid).update({
         status:checked
     });
     this.setState({refresh:true});
} 
copyToClipboard (copy){
    var textField = document.createElement('textarea')
    textField.innerText = copy
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  refresh()
  {
      this.setState({refresh:true,urls:null})
  }
render()
{
    let closeModal = () => this.setState({editModalStatus:false});
    return(
                <div className ="dashboard-body">
                <div className ="container-fluid p-0">
                    <div className ="dash_welcome theme-bg p-4 text-light text-center d-none d-sm-block">
                        <h1 className ="dash_big_head"> Welcome to Shorten</h1>
                        <h3 className ="dash_small_head"> Your custom url shortner </h3>
                        <button className ="btn btn-danger text-light w-25 p-2 mb-4 mt-2" id="logoutbtn" onClick={this.logout}>Logout</button>
                    </div>
                    <div className ="dash_welcome theme-bg p-0 text-light text-center  d-xs-block d-md-none ">
                        <h1 className ="dash_big_head">Shorten</h1>
                        <h3 className ="dash_small_head"> Your custom url shortner </h3>
                        <button className ="btn btn-danger theme-btn w-50 text-light w-25 p-2 mb-4 mt-2" id="logoutbtn" onClick={this.logout}>Logout</button>
                    </div>
                </div> 
                
                <div className ="container overlay-form">
                    <form className ="shortner-form" method="post">
                        <div className ="row mb-4">
                        <div className ="col-md-6 col-lg-6 col-xs-12 col-sm-12 mt-4">
                        
                                    <label className ="theme-text"> Paste your long url </label>
                                    <input 
                                    type="url" 
                                    name="longurl" 
                                    className ="form-control" 
                                    id="longurl" 
                                    placeholder="https://" 
                                    value={this.state.longurl} 
                                    onChange={this.handleChange} 
                                    required >

                                    </input>
                        </div>
                        <div className ="col-md-6 col-lg-6 col-xs-12 col-sm-12 mt-4">
                        <label className ="theme-text"> New Short Url </label>
                        <div className ="input-group mb-2">
                            <div className ="input-group-prepend d-none d-lg-block d-md-block">
                            <div className ="input-group-text ">{domain + "/?v="}</div>
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
                         
                        { (this.state.error==='403') ? 
                        (
                            <div className ="bg-danger text-light text-center m-auto  p-2">
                                <h5>oops !seems like the short url already exists</h5>
                            </div>
                        )
                        :this.state.error==='401' ?
                        (
                            <div className ="bg-danger text-light text-center m-auto  p-2">
                                <h5>ehe</h5>
                            </div>
                        )
                        :this.state.error==="404" ?
                        (
                            <div className ="bg-danger text-light text-center mb-4 p-2">
                                <h5>Enter Long and Short Url</h5>
                            </div>
                        )
                        :
                        true
                        
                        }
                        <button type="submit" value="Get url now" className ="btn theme-btn theme-bg text-light" id="submiturl" onClick={this.Addnewurls}>Get url now</button>
                    </form>
                </div>
                { this.state.newurl ?
                (
                <div className ="container bg-info mt-4 alert text-light alert-dismissible fade show text-center p-4" role="alert">
                <strong>Your custom short link is  : </strong>
                <span id="custom-link">{this.state.newurl}</span> <br/><br/>
                <button className="btn small-btn mr-1 text-light border-light" onClick={()=>{this.copyToClipboard(this.state.newurl)}}>Copy url</button>
                </div>
               
                 ) :
                (false)
                } 
                 <div className="container-fluid p-0">
                     <div className="container text-center">
                    <h1 className ="dash_big_head my-4">Previous Links</h1>
                    </div>
                    <div className="link_info_container">
                        <div className="info_text left_info">{this.state.urlarrlength} Links</div>
                        <div className="info_text right_info">Total Clicks</div>
                               
                    </div>

                       
                       
                </div>

                               
                                { this.state.urlarrlength ?
                                (
                                
                                
                                this.state.urls?
                                (
                                    this.state.urls &&
                                    this.state.urls.map( urls =>{
                                       
                                        return(
                                            <div className="link_container" key={urls.id}>
                                            <div className="row">
                                                <div className="col-9">
                                                    
                                                                                        
                                                        <label className="switch"> 
                                                        <input type="checkbox"
                                                        checked={urls.data.status}
                                                        name="toggle"
                                                        id={urls.id} 
                                                        onChange={this.toggle}/>
                                                        <span className="knob"></span>
                                                        </label>
                                                       
                                                
                                                <ul>
                                                    <li className="long_url"><a href={urls.data.longurl}  target="_blank" rel="noopener noreferrer">{urls.data.longurl}</a></li>
                                                    <li className="short_url"><a href= {domain +"/v/"+ urls.data.shorturl}  target="_blank" rel="noopener noreferrer" >{domain +"/v/"+ urls.data.shorturl}</a></li>
                                                    <small>{urls.data.status}</small><br/>
                                                    <button className="btn small-btn mr-1" onClick={()=>{this.copyToClipboard(domain +"/v/"+ urls.data.shorturl)}}>Copy url</button>
                                                    <button className="btn small-btn mr-1" id={urls.id} onClick={() => this.setState({editModalStatus:true,editdoc:urls.data})}>Edit Url</button>

                                                </ul>
                                                </div>
                                                <div className="col-3 text-right">
                                                 <span class="d-block">20 <FontAwesomeIcon icon={faSignal} /></span>   
                                                
                                                <button className ="btn btn-danger text-right mt-4" id={urls.id} onClick={this.Deleteurl}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                                </button> 
                                                </div>
                                                
                                            </div>
                                        </div>
                                          
                                        )
                                       
                                    })
                                ):(
                                    <div className="link_container">
                                            <div className="row">
                                                <div className="col-9">
                                                <ul>
                                                    <li className="long_url"><div class="block block--long load-animate"></div></li>
                                                    <li className="short_url"><div class="block block--short load-animate"></div></li>
                                                    <small><div class="block block--short load-animate"></div></small><br/>
                                                </ul>
                                                </div>                                                
                                            </div>
                                </div>
                                 )
                                ):(<div className="container py-5 text-center ">
                                    <h3 class="theme-text-light">Nothing to show <FontAwesomeIcon icon={faSmileBeam} transform="shrink-2"  /> </h3>
                                    </div>
                                )
                              
                                }
                                
                                
                              
                <EditModal show={this.state.editModalStatus} docid={this.state.editdoc} onHide ={closeModal} refresh ={this.refresh}/>
                </div>


    );
  }
}



//modal



  

export default Home;
