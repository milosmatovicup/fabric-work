import { forwardRef, useEffect } from "react";

const EditorCanvas = forwardRef(({ canvas, setCurrentFilter }, ref) => {

    useEffect(() => {
        if(!canvas) return;
        function handleSection(e) {
            const obj = e.selected?.length === 1 ? e.selected[0] : null;
            const filter = obj?.filters?.at(0);
            setCurrentFilter(filter ? filter.type.toLowerCase() : null);
        }

        function handleKeyDown(e) {
            if(e.key === 'Delete') {
                for(const obj of canvas.getActiveObjects()) {
                    canvas.remove(obj);
                    canvas.discardActiveObject();
                }
            }
        }

        canvas.on({
            'selection:created': handleSection,
            'selection:updated': handleSection,
            'selection:cleared': handleSection
        });

        document.addEventListener('keydown', handleKeyDown, false);

        return () => {
            canvas.off({
                'selection:created': handleSection,
                'selection:updated': handleSection,
                'selection:cleared': handleSection
            });
            document.removeEventListener('keydown', handleKeyDown, false);
        }
    }, [canvas, setCurrentFilter]);

    return (
        <div className="canvasbox">
            <canvas ref={ref} width={1000} height={500}></canvas>
        </div>
    );
});

export default EditorCanvas;