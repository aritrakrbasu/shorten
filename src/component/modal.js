import React , {Component} from 'react';
import {Modal} from 'react-bootstrap'
import {db,domain} from '../firebase_config';





class  EditModal extends Component {
    
   
  constructor(props){
      super(props);
     
      this.updatehandleChange=this.updatehandleChange.bind(this)
      this.UpdateUrls=this.UpdateUrls.bind(this)
      this.state={
          updatelongurl:'',
          updateshorturl:'',
          previouslongurl:''
          
      }

  }

   UpdateUrls(e)
   {
      e.preventDefault();



      //error validation
      const checkerror = () => {
      this.setState({ previouslongurl:this.props.docid.longurl, previousshorturl:this.props.docid.shorturl})
      if (!(this.state.updatelongurl)) {
        this.setState({updatelongurl:this.props.docid.longurl}, () => {console.log(this.state.updatelongurl)})
      }
      if (!(this.state.updateshorturl)) {
        this.setState({updateshorturl:this.props.docid.shorturl}, () => {console.log(this.state.updateshorturl)})
       
      } 
      return Promise.resolve(true);
    
    }
checkerror().then(()=>{




          var docRef = db.collection("urls").doc(this.state.updateshorturl);

          docRef.get().then((doc)=> {
              if (doc.exists) {
                  const data=doc.data()
                  if(data.author===localStorage.getItem("user"))
                  {
                    db.collection("urls").doc(this.state.previousshorturl).delete();
                    console.log("No such document!");
                    docRef
                    .set({
                      longurl: this.state.updatelongurl,
                      shorturl: this.state.updateshorturl ,
                      status: "True",
                      clicks:0,
                      author:localStorage.getItem("user")
                    });
                    this.props.onHide();
                  }
                  else
                  {
                  this.setState({error:'403'})
                  }
                  //console.log(this.state.error)
              
              } else {
                  // doc.data() will be undefined in this case
                  db.collection("urls").doc(this.state.previousshorturl).delete();
                    console.log("No such document!");
                    docRef
                    .set({
                      longurl: this.state.updatelongurl,
                      shorturl: this.state.updateshorturl ,
                      status: 'True',
                      clicks:0,
                      author:localStorage.getItem("user")
                    });
                    this.props.onHide();
                  }
                  
                  
              
          }).catch((error) =>{
              console.log("Error getting document:", error);
              this.setState({error:error})
          });


       
          
        });















       






       
   }

updatehandleChange(e){
      this.setState({[e.target.name]: e.target.value});   
  } 

  
    render(){
      const update = this.props.docid
        return(
            <div>
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            ref={this.otpModalRef}
          >

            <Modal.Body>
            <form className ="shortner-form" method="post">
                        <div className ="row mb-2">
                        <div className ="col-lg-12 mt-2">
                        
                                    <label className ="theme-text"> Long url  </label>
                                    <input 
                                    type="url" 
                                    name="updatelongurl" 
                                    className ="form-control" 
                                    id="longurl" 
                                    defaultValue={update.longurl} 
                                    onChange={this.updatehandleChange} required ></input>
                        </div>
                        <div className ="col-lg-12 mt-2">
                        <label className ="theme-text"> Short Url </label>
                        <div className ="input-group mb-2">
                            <div className="input-group-prepend d-none d-lg-block d-md-block">
                            <div className ="input-group-text">{domain + "/v/="}</div>
                            </div>
                                   
                                    <input 
                                    type="url" 
                                    name="updateshorturl" 
                                    className ="form-control" 
                                    id="shorturl" 
                                    defaultValue={update.shorturl} 
                                    onChange={this.updatehandleChange} required ></input>
                        </div>
                        </div>
                        </div>
                        {
                          this.state.error ==="403"?
                          ( 
                          <div className ="bg-danger text-light text-center m-auto  p-2">
                          <h5>oops !seems like the short url already exists</h5>
                            </div>

                           
                            ):true
                        }

                        <button type="submit" value="Get url now" className ="btn theme-btn-medium theme-bg text-light" id="submiturl" onClick={this.UpdateUrls}>Get url now</button>
                    </form>
                  
            </Modal.Body>
          </Modal>
          
     

          </div>
        );
    }
}

export default EditModal ;