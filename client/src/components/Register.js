import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { Link,  } from "react-router-dom";

import { handleErrors } from './Login';

export default function Register(){

    const [loading,setloading] = useState(false);

    const [firstName,setfirstName] = useState("");
    const [lastName,setlastName] = useState("");
    const [email,setemail] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");
    const [error, setError] = useState("");

    

    const register =(e) =>{
        
        e.preventDefault();
        if(password!==password2){
            setError("Password does not match")
        }else{
            setloading(true);

        fetch(`http://localhost:4000/users/register`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
              }),
        })
        .then(handleErrors)
        .then(() => {
            alert("You Are Registered Please Login")
            history.push('/')
        })
        .catch((error) =>{
            setError(error.message);
        });

        setTimeout(() => {
            setloading(false);
          }, 3000);
    };
    };
    const history = useHistory();
    return(
        <div className="app">
        <div className="app">
            <div className="col-6 container-fluid" >
           
               <form onSubmit={register}>

                <h3><i class="fas fa-hands-helping"></i> Register</h3>
                
                

                <div className="form-group mt-5">
                    <input required minLength="3" type="text" className="form-control input-line" placeholder="firstname" onChange={(e) => setfirstName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input required minLength="3" type="text" className="form-control input-line" placeholder="lastname" onChange={(e) => setlastName(e.target.value)}/>
                </div>
             
                <div className="form-group">
                    <input required type="email" className="form-control input-line" placeholder="email" onChange={(e) => setemail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input required minLength="5" type="password" className="form-control input-line" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input required minLength="5" type="password" className="form-control input-line" placeholder="confirm password" onChange={(e) => setPassword2(e.target.value)}/>
                </div>

               
                {loading && <button type="submit" className="btn btn-secondary btn-lg btn-block"><i class="fa fa-spinner fa-spin"></i>Register</button>}
                {!loading && <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>}
                
                {error && <span className="text-danger" >{error}</span>}
                <p className=" text-right">
                    Back to <Link  to="/">Login</Link>
                </p>
            </form>
            </div>
        </div>
        </div>
    )
}