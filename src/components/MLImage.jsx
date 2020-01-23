import React, {useState} from 'react';

/**
 * Component to render a single image, and handle it's state
 * 
 */
const Image = (props) => {

	const imageDir = ".";

        return(
        <div className="Image">
	    <img src={imageDir + props.image.images} alt={props.image.label}/>
        </div>
    );

};

export default Image;
