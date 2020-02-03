import React, {useState, useEffect} from 'react';
const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="


/**
 * Component to render a single image
 * 
 */
const Image = (props) => {

	const [imageSrc, setImageSrc] = useState(placeHolder)
	const [imageRef, setImageRef] = useState();
	const src = "." + props.image.images;

	// Handle lazy loading by giving images a temporary
	// blank image until they are in the viewframe.
	  useEffect(() => {
    let observer
    let didCancel = false

    if (imageRef && imageSrc === placeHolder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              // when image is visible in the viewport + rootMargin
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src)
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: "600px",
          }
        )
        observer.observe(imageRef)
      } else {
        // Old browsers fallback
        setImageSrc(src)
      }
    }
    return () => {
      didCancel = true
      // on component unmount, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef)
      }
    }
  }, [src, imageSrc, imageRef])


        return(
        <div className="Image">
	    <img ref={setImageRef} 
	         src={imageSrc} 
		 alt={props.image.label}/>
        </div>
    );

};

export default Image;
