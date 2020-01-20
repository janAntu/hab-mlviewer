import React, {useState} from 'react';
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

    // add selected image to annotation list
    const selectImage = (e, selected) => {

        if(selected) {
            // console.log(`selected image ${e.target}`);
            addToImgs(selectedImgs.concat([e.target.alt]));
        } else {
            // console.log(`deselected image ${e.target}`);
            addToImgs(selectedImgs.filter(img => img !== e.target.alt));
        }
    }

    // filter images by current class
    let imgsToRender = [];
    if (props.currClass !== "All") {
        imgsToRender = props.images.filter((img) => {
            if (img.ml_user_labels != null && img.ml_user_labels === props.currClass) return true;
            else if (img.ml_user_labels == null && img.ml_prediction === props.currClass) return true;
            else return true;
        });
    } else {
        imgsToRender = props.images;
    }

    // console.log("imgsToRender: " + props.images);

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