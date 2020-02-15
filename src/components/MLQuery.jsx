import React from 'react';

/**
 * Component to deal with sending a user query
 *  
 */
const Query = (props) => {

    const classList = [...new Set(props.classList)];

    const updateCheckbox = (e) => {
        props.setShowPredictions(e.target.checked);
	props.reRender();
    }

    return(
        <div className="Query">
            <form onSubmit={props.handleSubmit}>

            <label>
                Filter by Class:
                <select value={props.currClass} onChange={props.onClassChange}>
                    {classList.map(classStr => <option key={classStr} value={classStr}>{classStr}</option>)}
                </select>
            </label>

            <label>
                Show ML Predictions:
                <input type="checkbox"
                       onChange={updateCheckbox}/>
            </label>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );

};

export default Query;
