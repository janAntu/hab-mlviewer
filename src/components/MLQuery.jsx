import React from 'react';

/**
 * Component to deal with sending a user query
 *  
 */
const Query = (props) => {

    return(
        <div className="Query">
            <form onSubmit={props.handleQuerySubmit}>
                <label>
                    Images:
                    <input type="string" name="image-path" onChange={props.onQueryChange}/>
                </label>
                <label>
                    Label:
                    <input type="string" name="label" onChange={props.onQueryChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );

};

export default Query;