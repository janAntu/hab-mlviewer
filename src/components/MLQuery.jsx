import React from 'react';

/**
 * Component to deal with sending a user query
 *  
 */
const Query = (props) => {

    // Remove duplicates from class list
    const classList = [...new Set(props.classList)];

    const updateFields = (e) => {};

    const selectClass = (
      <select value={props.currClass} onChange={props.onClassChange}>
          {classList.map(classStr => <option key={classStr} value={classStr}>{classStr}</option>)}
      </select>
    );

    const trainCheckBoxes = (props.trainFields.length > 1) ? (
      <label>Training fields:
        {props.trainFields.map(field => 
          <input name={field} 
                 defaultChecked={true} 
                 onChange={updateFields} />)}
      </label>
    ) : null;

    const testCheckBoxes = (props.testFields.length > 1) ? (
      <label>Testing fields:
        {props.testFields.map(field => 
          <input name={field} 
                 defaultChecked={true} 
                 onChange={updateFields} />)}
      </label>
    ) : null;

    return(
        <div className="Query">
            <form onSubmit={props.handleSubmit}>
            <label>
                Filter by Class: {selectClass}
            </label>
            {trainCheckBoxes}
            {testCheckBoxes}
            <input type="submit" value="Submit" />
            </form>
        </div>
    );

};

export default Query;
