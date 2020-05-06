import React , {Component} from 'react';
import {db} from './firebase_config';
import Public from './public';



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
     
     const ref = db.collection('urls').where("shorturl","==",view[1]);
     ref
    .get()
    .then(snapshot =>{
     snapshot.forEach( doc =>{
            const data =doc.data();
            console.log(data)
            
            window.location.href = data.longurl;
            return null; 


    
     })
    })
    .then(notfind => {
        
       
        this.setState({error_destination:'1'})
        console.log(this.state.error_destination)
    })
    .catch(error => {
        console.log(error)
        
    } )

 }
    render(){
        return(
            <div class="body">
                     <Public />
                     {this.state.error_destination ?
                     (
                     <div class="error-desitnation">
                       <span>Wrong url ! please contact admin </span> 
                        
                    </div>
                     ) :
                     true
                    }
                </div>
            );
        }
      }

export default Destination;
      