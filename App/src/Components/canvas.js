// src/components/Canvas.js
import React from 'react';

const Canvas = ({canvasRef,setIsDrawing,setLastPos,draw,isDrawing}) => {

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setLastPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (   
      <canvas
        ref={canvasRef}
        width="600"
        height="600"
        style={{ border: '1px solid black' }}
        className="mt-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      />
  );
};

export default Canvas;
