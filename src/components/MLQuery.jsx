import React from 'react';

/**
 * Component to deal with sending a user query
 *  
 */
const Query = (props) => {

    return(
        <div className="Query">
            <form onSubmit={props.handleSubmit}>
            <label>
                Filter by Class:
                <select value={props.currClass} onChange={props.onClassChange}>
                    {props.classList.map(classStr => <option key={classStr} value={classStr}>{classStr}</option>)}
                </select>
            </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );

};

export default Query;