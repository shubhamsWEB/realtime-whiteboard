// src/components/Canvas.js
import React, { useCallback } from 'react';

const Canvas = ({ canvasRef, setIsDrawing, setLastPos, draw, isDrawing }) => {

  // Memoized event handlers to prevent re-creation on every render
  const handleMouseDown = useCallback((e) => {
    setIsDrawing(true);
    setLastPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }, [setIsDrawing, setLastPos]);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing) return;
    draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }, [isDrawing, draw]);

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, [setIsDrawing]);

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
