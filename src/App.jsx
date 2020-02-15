import React, {useState, useEffect} from 'react';
import './App.css';
import Mosaic from './components/MLMosaic';
import Query from './components/MLQuery';


// Used for react-bootstrap modal
// import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';

// parent component
// handles img state
// TODO add dynamic filter upon new annotation
// onFilterChange clear selected
const App = () => {

  // define image state
  const [testImgs, setTestImages] = useState([]);
  const [trainImgs, setTrainImages] = useState([]);
  const [currClass, setCurrClass] = useState('Hab');
  const [classList, setClassList] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`http://gpu2:3005/api/train-data/`),
      axios.get(`http://gpu2:3005/api/test-data/`)])
      .then(([trainRes, testRes]) => {
        if(trainRes.data.data === [] || testRes.data.data === []){
          alert("No images received! \n Check the querys entered");
        }
        setTrainImages(trainRes.data.data);
        setTestImages(testRes.data.data);

        setClassList(mergeArrays(trainRes.data.data, testRes.data.data));
        setCurrClass('All');
      })
      .catch(err => {
        alert(`Error Occured: ${err}`);
      });
  }, []);

  // Merge two arrays into one, discarding duplicates
  const mergeArrays = (arr1, arr2) => {
    return ['All', 'HAB', 'Other', 
      ...new Set(arr1.concat(arr2).map(img => img.label))]
      .filter((x) => x != null);
  }

  // get images from server on query
  const handleSubmit = (e) => {
    
    e.preventDefault();

    // Rerender images
    reRender(trainImgs, testImgs);

  }

  // update current class
  const onClassChange = (e) => {
    const selectedClass = e.target.value;
    setCurrClass(selectedClass);
  }

  // rerender the view
  const reRender = (trainImgs, testImgs) => {
    console.log("reRender");
    setCurrClass(currClass);
    setTrainImages(trainImgs);    
    setTestImages(testImgs);    
    setShowPredictions(showPredictions);
  }

  return (
    <div className="App">
      <Query 
          classList={classList}
          onClassChange={onClassChange} 
          currClass={currClass}
          setShowPredictions={setShowPredictions}
          handleSubmit={handleSubmit} 
	  reRender={reRender} />
      <hr />

      <div className="Splitscreen">
        <Mosaic 
          title="Training:"
          images={trainImgs} 
          currClass={currClass}
          showPredictions={showPredictions}
          reRender={reRender}
        />
        <Mosaic 
          title="Testing:"
          images={testImgs} 
          currClass={currClass}
          showPredictions={showPredictions}
          reRender={reRender}
        />
      </div>
    </div>
  );
}

export default App;
