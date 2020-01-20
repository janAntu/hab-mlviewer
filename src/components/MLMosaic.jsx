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

        // filter images by current class
        if (props.currClass !== "All") {
            updateImgs(props.images.filter((img) => {
                if (img.ml_user_labels != null && img.ml_user_labels === props.currClass) return true;
                else if (img.ml_user_labels == null && img.ml_prediction === props.currClass) return true;
                else return true;
            }));
        } else {
            updateImgs(props.images);
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