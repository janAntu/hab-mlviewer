import React, {useState, useEffect} from 'react';
import Image from './MLImage';

/**
 * Component to deal with displaying images
 * 
 * 
 */
const Mosaic = (props) => {

	console.log("Rendering " + props.title + " for class " + props.currClass);

    // define state
    const [selectedImgs, addToImgs] = useState([]);
    const [imgsToRender, updateImgs] = useState([]);

    // add selected image to annotation list
    const selectImage = (e, selected) => {

        if(selected) {
            addToImgs(selectedImgs.concat([e.target.alt]));
        } else {
            addToImgs(selectedImgs.filter(img => img !== e.target.alt));
        }
    }

    useEffect(() => {
	const trainLabels = new Set([
        "Akashiwo",
        "Ceratium falcatiforme",
        "Ceratium furca",
        "Chattonella",
        "Cochlodium",
        "Gyrodinium",
        "Lingulodinium polyedra",
        "Prorocentrum micans",
        "Pseudo-nitzschia chain"
	]);

        const field = (img) => {
            if (props.showPrediction && 'ml_prediction' in img) {
                return img.ml_prediction;
            } else {
                return img.label;
            }
        }

        // filter images by current class
        if (props.onlyHab || props.currClass === "HAB") {
            updateImgs(props.images.filter((x) => trainLabels.has(field(x))));
	} else if (props.currClass === "All") {
            updateImgs(props.images);
	} else if (props.currClass === "Other") {
            updateImgs(props.images.filter((x) => !trainLabels.has(field(x))));
        } else {
            updateImgs(props.images.filter((img) => {
                if (field(img) != null && field(img) === props.currClass) return true;
                else return false;
            }));
        }
    }, [props.currClass, props.images, props.showPrediction]);

    return(
        <div className="Mosaic" key={"props.title + props.currClass"}>
            <label>{props.title}</label>        
            { imgsToRender.map((img) => {
                    return <Image key={img.images} image={img} 
                            onClick={selectImage}/>
                })
            }
        </div>
    );

};

export default Mosaic;
