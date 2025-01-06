import { FabricImage, IText, filters } from "fabric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Toolbox = ({ canvas, currentFilter, setCurrentFilter }) => {
    const [drawingMode, setDrawingMode] = useState(false);

    useEffect(() => {
        if(!canvas || 
          !canvas.getActiveObject() || 
          !canvas.getActiveObject().isType('image')) return;
      
        function getSelectedFilter() {
          switch(currentFilter) {
            case 'sepia':
              return new filters.Sepia();
            case 'vintage':
              return new filters.Vintage();
            case 'invert':
              return new filters.Invert();
            case 'polaroid':
              return new filters.Polaroid();
            case 'grayscale':
              return new filters.Grayscale();
            default:
              return null;
          }
        }
        const filter = getSelectedFilter();
        const img = canvas.getActiveObject();
      
        img.filters=filter ? [filter] : [];
        img.applyFilters();
        canvas.renderAll();
      }, [currentFilter, canvas]);

    function fileHandler(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            const image = await FabricImage.fromURL(e.target.result);
            image.scale(0.5);
            canvas.add(image);
            canvas.centerObject(image);
            canvas.setActiveObject(image);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    }

    function addText() {
        const text = new IText('Edit this text');
        canvas.add(text);
        canvas.centerObject(text);
        canvas.setActiveObject(text);
    };

    function toggleDrawingMode() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        setDrawingMode(canvas.isDrawingMode);
    }

    return (
        <div className="toolbox">
            <button title="Add image">
                <FontAwesomeIcon icon="image" />
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={fileHandler} />
            </button>
            <button title="Add text" onClick={addText}>
                <FontAwesomeIcon icon="font" />
            </button>
            <button title="Toggle drawing mode" onClick={toggleDrawingMode} className={drawingMode ? 'active' : ''}>
                <FontAwesomeIcon icon="pencil" />
            </button>
            <button title="Filters"
                onClick={() => setCurrentFilter(currentFilter ? null : 'sepia')}
                className={currentFilter ? 'active' : ''}>
                <FontAwesomeIcon icon="filter" />
            </button>
            {currentFilter && <select onChange={(e) => setCurrentFilter(e.target.value)} value={currentFilter}>
                <option value="sepia">Sepia</option>
                <option value="vintage">Vintage</option>
                <option value="invert">Invert</option>
                <option value="polaroid">Polaroid</option>
                <option value="grayscale">Grayscale</option>
            </select>
            }
        </div>
    );
};

export default Toolbox;