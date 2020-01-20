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
  const [currClass, setCurrClass] = useState('All');
  const [currAnnotClass, setCurrAnnotClass] = useState('');
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const promise1 = axios
      .get(`http://localhost:3007/api/train-data/`)
      .then(res => {
        if(res.data.data === []){
          alert("No images received! \n Check the querys entered");
        }
        setTrainImages(res.data.data);
      })
      .catch(err => {
        alert(`Error Occured: ${err}`);
      });
      const promise2 = axios
      .get(`http://localhost:3007/api/test-data/`)
      .then(res => {
        if(res.data.data === []){
          alert("No images received! \n Check the querys entered");
        }
        setTestImages(res.data.data);
      })
      .catch(err => {
        alert(`Error Occured: ${err}`);
      });

      Promise.all([promise1, promise2]).then((arr1, arr2) => {
        console.log("Preparing to merge arrays" + testImgs);
        setClassList(mergeArrays(testImgs, trainImgs));
        console.log(classList);
    });
  }, []);

  // Merge two arrays into one, discarding duplicates
  const mergeArrays = (arr1, arr2) => {
    return ['All', ...new Set(arr1.concat(arr2).map(img => img.label))];
  }

  // get images from server on query
  const handleSubmit = (e) => {
    
    e.preventDefault();

    // get all images from csv files
    console.log("Submitted query");

  }

  // update current class
  const onClassChange = (e) => {
    let selectedClass = e.target.value;
    setCurrClass(selectedClass);
  }

  // rerender the view
  const reRender = (trainImgs, testImgs) => {
    setTrainImages(trainImgs);    
    setTestImages(testImgs);    
  }

  return (
    <div className="App">
      <Query 
          classList={classList}
          onClassChange={onClassChange} 
          currClass={currClass}
          handleSubmit={handleSubmit} />
      <hr />

      <div className="Splitscreen">
        <Mosaic 
          title="Training:"
          images={trainImgs} 
          currClass="All"
          reRender={reRender}
        />
        <Mosaic 
          title="Testing:"
          images={testImgs} 
          currClass="All"
          reRender={reRender}
        />
      </div>
    </div>
  );
}

export default App;