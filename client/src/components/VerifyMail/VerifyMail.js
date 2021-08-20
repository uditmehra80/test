import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'

const VerifyMail  = ()=>{

    const [error, setError] = useState("");
    const {token} = useParams()

    const VerifyEmail = ()=>{
        fetch("http://localhost:4000/users/verify-email",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token
            })
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.error){
             setError(data.error)
           }
           else{
               console.log("Success email verify")
           }
        })
    }

    useEffect(() =>{
        VerifyEmail()
      });
 
   return (
    <div className="app">
       
          <div className="app">
            
            {error && <div className="card bg-transparent">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src='https://www.dtcc.com/-/media/Images/News/Hero-Images/Newsletter/June2015/Session-expired-300x300.jpg' alt=".."   className="rounded-circle" width="250" height="250"/>
                
              </div>
            </div>
            <span>Back to... <Link  to="/">LogIn</Link></span>
           </div>}

            {!error && 
            <div className="card bg-transparent">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src='https://icon-library.com/images/verify-icon/verify-icon-10.jpg' alt=".."   className="rounded-circle" width="250" height="250"/>
                <h3>Verified Successfully</h3>
              </div>
            </div>
            <span>Back to... <Link  to="/">LogIn</Link></span>
           </div>
           }
          
        </div>
        
    </div>
   )
}


export default VerifyMail;