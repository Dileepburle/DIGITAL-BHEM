import React, { useEffect, useRef, useState } from 'react';
function Whiteboard  ({user,uuid}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('rgb(0,0,0)')
  const [image,setImage] = useState("");
  const [roomId,setRoomId] = useState(uuid());
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = color;
    context.stroke()
    context.lineCap = "round";
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  useEffect(() => {
      contextRef.current.strokeStyle = color;
  }, [color]);

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    event.preventDefault();
  };

  const handleMouseUp = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const handleMouseMove = (event) => {
    if (isDrawing) {
      const x = event.nativeEvent.offsetX;
      const y = event.nativeEvent.offsetY;
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
      event.preventDefault();
    }
  };

   useEffect(()=>{
    const canvasImage = canvasRef.current.toDataURL();
    setImage(canvasImage);
    
    console.log(canvasImage);
  

const draw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };

const eraser = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };

const clear = () => {
    contextRef.current.clearRect(0, 0, 1300, 700);
  };

function saveCanvas() {
    localStorage.setItem("myCanvas",canvasRef.current.toDataURL());
  }

return (
    <div>
      <h2 className='text-center py-5'>White Board Drawing App<span className='text-primary'>[user online : 0]</span> </h2>
      {
        user?.presenter && (
          <div className='d-flex justify-content-between'>
          <div>
          <button onClick={draw}>draw</button>
          <button className='border border-warning' onClick={eraser}>
            Eraser
          </button>
          </div>
          <div className='d-flex '>
            <input type='color' value={color} onChange={(e)=>setColor(e.target.value)} />
            <button onClick={clear} className='bg-color-danger'>Clear</button>
            <button onClick={saveCanvas}>Save</button>
          </div>
        </div>
        )
      }
      
      <canvas
        ref={canvasRef}
        width='1300'
        height='700'
        color ={color}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        user={user}
        uuid={uuid}
      >
        Your browser does not support the canvas element.
      </canvas>
    </div>
  );
}

export default Whiteboard;
