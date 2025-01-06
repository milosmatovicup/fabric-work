import { FabricImage, IText } from "fabric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Toolbox = ({ canvas }) => {
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
        </div>
    );
};

export default Toolbox;