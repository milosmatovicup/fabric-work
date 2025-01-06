import { FabricImage } from "fabric";
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


    return (
        <div className="toolbox">
            <button title="Add image">
                <FontAwesomeIcon icon="image" />
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={fileHandler} />
            </button>
        </div>
    );
};

export default Toolbox;