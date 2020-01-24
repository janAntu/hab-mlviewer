import React, {useState, useEffect} from 'react';
import Image from './MLImage';
import axios from 'axios';

/**
 * Component to deal with displaying images
 * 
 * 
 */
const Mosaic = (props) => {

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

        // filter images by current class
        if (props.currClass === "All") {
            updateImgs(props.images);
	} else if (props.currClass === "HAB") {
            updateImgs(props.images.filter((x) => trainLabels.has(x.label)));
	} else if (props.currClass === "Other") {
            updateImgs(props.images.filter((x) => !trainLabels.has(x.label)));
        } else {
            updateImgs(props.images.filter((img) => {
                if (img.label != null && img.label === props.currClass) return true;
                else return false;
            }));
        }
    }, [props.currClass]);

    return(
        <div className="Mosaic">
            <label>{props.title}</label>        
            { imgsToRender.map((img) => {
                    return <Image key={img.image_id} image={img} 
                            onClick={selectImage}/>
                })
            }
        </div>
    );

};

export default Mosaic;
