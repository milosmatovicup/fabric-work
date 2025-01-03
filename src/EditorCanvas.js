import { forwardRef } from "react";

const EditorCanvas = forwardRef(({}, ref) => {
    return (
        <div className="canvasbox">
            <canvas ref={ref} width={1000} height={500}></canvas>
        </div>
    );
});

export default EditorCanvas;