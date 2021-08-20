import React,{useState,useEffect} from 'react';

export default function ApiCardData(){

  const [result, setresult] = useState([]);

  const LoadData =() =>{
    fetch('http://localhost:4000/users/help',{
      method: "GET",
      headers: {
      "x-access-token": localStorage.getItem("token")
    }})
    .then(response => response.json())
    .then(data => 
      setresult(data) || console.log(data));
  }
  
  useEffect(() =>{
    LoadData();
  }, []);



    return(<>
        <div>

        {result.map((help,index) => (
        <div  className="card cardResponsive">
        <div className="card-body" key={help._id}>
          <h5 className="card-title">{help.title}</h5>
          
          <h6 className="card-subtitle mb-2 text-muted">{help.date} ,{help.time}</h6>
          <div className="row">
            <p  className="cardDescription card-text p-1">{help.description}</p>
          </div>
        </div>
    </div>
      ))}
        </div>
        </>
    )
  }