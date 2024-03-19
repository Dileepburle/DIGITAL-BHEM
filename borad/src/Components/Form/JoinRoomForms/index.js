import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForms = ({uuid,setUser})=>{

    const [roomId,setRoomId] = useState("");
    const [name,setName] = useState("");
    

    const navigate = useNavigate();

    const handleRoomJoin = (e) =>{
       e.preventDefault();
       const roomData = {
        name,
        roomId,
        userId: uuid(),
        host:false,
        presenter:false
       }
      setUser(roomData);
      
      navigate(`/${roomId}`);

      fetch("http://localhost:5000",{
      method:"POST",
      body:JSON.stringify(roomData),
      headers:{
        "Content-Type":"application/json"
      }

    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    
    }
    return(
        <form className="form col-md-12 mt-5">
            <div className="form-group">
                <input 
                  type="text"
                  className="form-control my-2"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  />
            </div>
               <div className="input-group d-flex align-items-center justify-content-center">
                 <input 
                  type="text"
                  className="form-control my-2"
                  placeholder="Enter room code"
                  value={roomId}
                  onChange={(e)=>setRoomId(e.target.value)}
                 /> 
            </div>
            <button type="submit" onClick={handleRoomJoin} className="btn btn-primary mt-4 btn-block form-control">
                Join Room
            </button>
        </form>
    )
}
export default JoinRoomForms;