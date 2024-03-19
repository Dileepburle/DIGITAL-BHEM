import './App.css';
import Forms from './Components/Form';
import { Routes,Route } from 'react-router-dom';
import { useState } from 'react';
import Whiteboard from './Components/Whiteboard';

const App = () => {
  const [user,setUser] = useState(null);

  
  const uuid = () =>{
    let s4 = () => {
      return(((1+Math.random()) *0x10000) | 0).toString(16).substring(1);

  };
  return(
    s4() +
    s4() +
    "-"  +
    s4() +
    "-"  +
    s4() +
    "-"  +
    s4() +
    "-"  +
    s4() +
    s4() +
    s4() +
    s4()
  );
  };


  return (
       <div className='container'>
        <Routes>
          <Route path="/" element={ <Forms uuid={ uuid }  setUser={setUser} />}/>
          <Route path="/:roomId" element={ <Whiteboard user={user} uuid={uuid}/>} />
        </Routes>
        
       </div>
         
  );
}

export default App;
