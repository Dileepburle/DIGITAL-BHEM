import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForms = ({uuid,setUser})=>{

  const [roomId,setRoomId] = useState(uuid);
  const [name,setName] = useState("");
  
  const navigate = useNavigate();

  const handleCreateRoom = (e) =>{
    e.preventDefault();
    const roomData={
      name,
      roomId,
      userId:uuid(),
      host:true,
      presenter:true
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
            <div className="form-group border">
               <div className="input-group d-flex align-items-center justify-content-center ">
                 <input 
                  type="text"
                  className="form-control my-2 border-0 "
                  value={roomId}
                  disabled
                  placeholder="Generate room code"
                 />
                 <div className="input-group-append"> 
                   <button className="btn btn-primary btn-sm me-1"
                   onClick={()=>setRoomId(uuid())} 
                   type="button">
                        generate
                   </button>
                   <button className="btn btn-outline-danger btn-sm me-2" 
                   type="button">
                    copy
                   </button>
                 </div>
               </div>
               
            </div>
            <button type="submit" onClick={handleCreateRoom} className="btn btn-primary mt-4 btn-block form-control">
                Generate Room
            </button>
        </form>
    )
}
export default CreateRoomForms;