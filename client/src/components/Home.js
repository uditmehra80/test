import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import { Link,  } from "react-router-dom";
import ApiCardData from './ApiCardData'



function Home(){
    const history = useHistory();

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [verify_user, setverify_user] = useState('');

    const [error, setError] = useState("");

    const PostData = (e)=>{
        console.log(error)
      e.preventDefault();
      fetch('http://localhost:4000/users/verifyclick',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              email
          })
      })
      .then(res=>res.json())
      .then((data) => {
          if(data.error){
              setError(data.error)
           }
           else{
              alert("Please check your email")
              console.log(data.message)
           }
      })
      .catch(error=>{
          console.log(error)
      })
  }

    const LoadData =() =>{
        fetch('http://localhost:4000/users/userdata',{
            method: "GET",
            headers: {
            "x-access-token": localStorage.getItem("token")
          },
        })
        .then(response => response.json())
        .then(data => 
                      setfirstName(data.firstName) ||
                      setlastName(data.lastName) ||
                      setverify_user(data.verify.toString()) ||
                      setemail(data.email)
                      // || console.log(data) 
              )
    }
    useEffect(() =>{
        LoadData();
      }, []);



    const logout =() => {
        localStorage.removeItem("token");
        history.push("/");
    }
    return(
        <div className="app">
           <h1>WelCome to homepage</h1>
           <div className="row app container-fluid">
             <p className="text-right"><button className="btn btn-danger"  onClick={logout}>Logout</button></p>
             <p className="text-right">{verify_user ==='false' && <button type="submit" onClick={PostData} className="btn btn-secondary ">Verify Email</button>}</p>
           
           <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src='https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png' alt="Admin" className="rounded-circle" width="150" height="150"/>
                <div  className="mt-2">
                  <h4>{firstName} {lastName}</h4> {verify_user ==='false' && <i className='fa fa-exclamation-circle text-muted'>Verify your email</i>}{verify_user ==='true' && <i className='fa fa-check-circle text-success'></i>}
                  <h6 className="mb-1">{email}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
        <Link className="btn btn-primary btn-block" to="/helpform">Post </Link>
      </div>
        </div>
        <div className="col-6">
          <ApiCardData/>
        </div>

        </div>
           
       </div>
    )
}
export default  Home;