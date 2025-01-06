import { useRef, useEffect, useState } from 'react';
import Toolbox from './Toolbox';
import EditorCanvas from './EditorCanvas';
import './App.css';
import { Canvas, PencilBrush } from 'fabric';

function App() {

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, { backgroundColor: 'white' });
    canvas.setDimensions({ width: 1500, height: 800 });
    setCanvas(canvas);

    const brush = new PencilBrush(canvas);
    brush.color = 'black';
    brush.width = 5;
    canvas.freeDrawingBrush = brush;

    return () => canvas.dispose();
  }, [canvasRef, setCanvas]);
  return (
    <div className="editor">
      <Toolbox 
        canvas={canvas}
      />
      <EditorCanvas 
        ref={canvasRef}
        canvas={canvas}
      />
    </div>
  );
}

export default App;
