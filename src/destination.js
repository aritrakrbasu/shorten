import React , {Component} from 'react';
import {db} from './firebase_config';
import Public from './public';
import firebase from 'firebase';



class Destination extends Component {

    constructor(props){
        super(props);
        this.state={
            error_destination:''
        }
      }
 componentDidMount(){

     var url=window.location.href;
     
     var view = url.split("/v/");
     const ref = db.collection('urls').doc(view[1]);
    
   
      ref.get().then((doc) => {
          if(doc)
          {
        const data =doc.data();
            console.log(data)
            if(data.status)
            {
                ref.update({clicks:firebase.firestore.FieldValue.increment(1)})
                window.location.href = data.longurl;
            }
            else
            {
                this.setState({error_destination:'2'})
            }
        } else {
            this.setState({error_destination:'1'})
        }
      })
     .catch(error => {
    console.log(error)
    
} )




 }
    render(){
        return(
            <div class="body">
                     <Public />
                     {this.state.error_destination ==='1'?
                     (
                     <div class="error-desitnation">
                       <span>Wrong url ! please contact admin </span> 
                        
                    </div>
                     ) :
                     this.state.error_destination ==='2'?
                     (
                     <div class="error-desitnation">
                       <span>This url is not active :)</span> 
                        
                    </div>
                     ) : true
                    }
                </div>
            );
        }
      }

export default Destination;
      