import { useRef, useEffect, useState } from 'react';
import Toolbox from './Toolbox';
import EditorCanvas from './EditorCanvas';
import './App.css';
import { Canvas } from 'fabric';

function App() {

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, { backgroundColor: 'white' });
    canvas.setDimensions({ width: 1000, height: 500 });
    setCanvas(canvas);

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
