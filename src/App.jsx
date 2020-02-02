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

  // States for the four query radio buttons
  const [trainFields, setTrainFields] = useState([]);
  const [testFields, setTestFields] = useState(['labels', 'ml_predictions']);
  const [imageFilter, setImageFilter] = useState({train: 'all', test: 'all'});

  useEffect(() => {
    Promise.all([
      axios.get(`http://gpu2:3005/api/train-data/`),
      axios.get(`http://gpu2:3005/api/test-data/`)])
      .then(([trainRes, testRes]) => {
        console.log("trainRes: " + trainRes.data.data)
        if(trainRes.data.data === [] || testRes.data.data === []){
          alert("No images received! \n Check the querys entered");
        }
        setTrainImages(trainRes.data.data);
        setTestImages(testRes.data.data);

        console.log("Preparing to merge arrays");
        setClassList(mergeArrays(trainRes.data.data, testRes.data.data));
        setCurrClass('All');
        console.log(classList);

        setTrainFields(trainRes.data.data[0]);
        setTestFields(testRes.data.data[0]);
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

  const getFields = (imgObject) => {
    return ["label", "ml_prediction"].filter((x) => x in imgObject);
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
    setCurrClass(currClass);
    setTrainImages(trainImgs);    
    setTestImages(testImgs);    
  }

  return (
    <div className="App">
      <Query 
          classList={classList}
          onClassChange={onClassChange} 
          currClass={currClass}
          trainFields={trainFields}
          testFields={testFields}
          setImageFilter={setImageFilter}
          handleSubmit={handleSubmit} />
      <hr />

      <div className="Splitscreen">
        <Mosaic 
          title="Training:"
          images={trainImgs} 
          currClass={currClass}
          reRender={reRender}
        />
        <Mosaic 
          title="Testing:"
          images={testImgs} 
          currClass={currClass}
          reRender={reRender}
        />
      </div>
    </div>
  );
}

export default App;
