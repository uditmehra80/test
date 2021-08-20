import React,{ useState } from 'react';
import { useHistory } from 'react-router';
import { Link  } from "react-router-dom";


export const handleErrors = async (response) => {
    if (!response.ok) {
      const { message } = await response.json();
      throw Error(message);
    }
    return response.json();
  };

export default function Login(){

    const [loading,setloading] = useState(false);

    const [email,setemail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
   
    

    const login =(e) =>{
        setloading(true);
        e.preventDefault();
        fetch(`http://localhost:4000/users/login`,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
              }),
        })
        .then(handleErrors)
        .then((response) => {
            localStorage.setItem("token",response.token)
            history.push("/home");
          })
        .catch((error) =>{
            setError(error.message);
        });

        setTimeout(() => {
            setloading(false);
          }, 3000);
    };
        const history = useHistory();
     

    return(
        <div className="app">

        <div className="app">
            <div className="col-6 container-fluid">
               <form onSubmit={login}>
                <h3 ><i class="fas fa-hands-helping"></i>LogIn</h3>
               
                <p className=" mt-5">
                    New User?? <Link  to="/register">Register</Link>
                </p>
                
                <div className="form-group">
                    <input required type="email" className="form-control input-line" placeholder="email" onChange={(e) => setemail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <input required minLength="5" type="password" className="form-control input-line" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {loading && <button type="submit" className="btn btn-secondary btn-lg btn-block"><i class="fa fa-spinner fa-spin"></i> Sign in</button>}
                {!loading && <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>}
                

                
                {error && <span className="text-danger" >{error}</span>}

                <p className="forgot-password text-right">
                    Forgot <Link  to="/reset">password</Link>
                </p>
            </form>
            </div>
        </div>
       
        </div>
    )
}