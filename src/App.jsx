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
  const [imgs, setImages] = useState([]);
  const [imagePath, setImagePath] = useState('');
  const [label, setLabel] = useState('');

  // get images from server on query
  const handleQuerySubmit = (e) => {
    
    e.preventDefault();
    // get query and time range
    const QueryStr = 
      imagePath + " " +
      label;

    // get all images from that query, and time
    axios
      .get(`http://localhost:3002/api/imgs/${QueryStr}`)
      .then(res => {
        if(res.data.data === []){
          alert("No images received! \n Check the querys entered");
        }
        setImages(res.data.data);
      })
      .catch(err => {
        alert(`Error Occured: ${err}`);
      });
  }

  // upquery query
  const onQueryChange = (e) => {
    let queryStr = e.target.value;
    
    if(e.target.name === "query-start"){    
      setImagePath(queryStr);
    } else {
      setLabel(queryStr);
    }
  }

  // rerender the view
  const reRender = (imgs) => {
    setImages(imgs);    
  }

  return (
    <div className="App">
      <Query 
          onQueryChange={onQueryChange} 
          handleQuerySubmit={handleQuerySubmit} />
      <hr />

      <Mosaic 
        images={imgs} 
        currClass="All"
        reRender={reRender}
        />
    </div>
  );
}

export default App;