import React, {useState} from 'react'
import { useHistory } from 'react-router';


export default function HelpForm() {

  const [loading,setloading] = useState(false);

  
    const [title,setTitle] = useState("");
  
   
    const [description,setDescription] = useState("");

    const [error, setError] = useState("");
  


    const PostHelpClick =(e) =>{
      e.preventDefault();

     if(title){
      setloading(true);

      fetch(`http://localhost:4000/users/help`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify({
               title,description
              }),
        })
      .then(() => {
          alert("Your Post successfully added")
          history.push('/home')
      })
      .catch((error) =>{
        setError('check console');
        console.log(error.message)
      });
     }else{
       setError('Please Give title')
     }

     setTimeout(() => {
      setloading(false);
    }, 5000);
  };
  const history = useHistory();
   
    return(
        <div className="app">
        <div className="mt-5 row" >
            <div  className="app col-5 container-fluid">
               
               <h2>Post Something</h2>
               <hr/>
            <form onSubmit={PostHelpClick}>
                    <div class="form-row">
                        <div className="form-group  input-line01">
                        <input required type="text" class="form-control" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>
                 
                  
                    
                    <div class="form-group">
                    <div class="form-group">
                        <textarea required class="form-control"  rows="3" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    </div>
                    
                    {error && <span id="reg-msg" >{error}</span>}

                    {loading && <button type="submit" className="btn btn-secondary btn-lg btn-block"><i class="fa fa-spinner fa-spin"></i> Please Wait</button>}
                    {!loading && <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>}
            </form>
               
            </div>
        </div>
        </div>
    )
}