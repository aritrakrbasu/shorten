import React , {Component} from 'react';
import {fire,db,domain} from './firebase_config';
import Public from './public';



class Destination extends Component {
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
     .catch(error => console.log(error))
         console.log(view[1])

 }
    render(){
        return(
            <div class="body">
                     <Public />
                </div>
            );
        }
      }

export default Destination;
      