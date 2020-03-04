import React from 'react';

/**
 * Component to deal with sending a user query
 *  
 */
const Query = (props) => {

    const [onlyHab, setOnlyHab] = useState(false);

    const classList = props.classList + (onlyHab ? ['Other'] : []);
    const habLabels = new Set([
        "Akashiwo",
        "Ceratium falcatiforme",
        "Ceratium furca",
        "Chattonella",
        "Cochlodium",
        "Gyrodinium",
        "Lingulodinium polyedra",
        "Prorocentrum micans",
        "Pseudo-nitzschia chain"
	]);

    const updateCheckbox = (e) => {
        props.setShowPredictions(e.target.checked);
    }

    const updateHab = (e) => {
        setOnlyHab(e.target.checked);
    }

    return(
        <div className="Query">
            <form onSubmit={props.handleSubmit}>

            <label>
                Filter by Class:
                <select value={props.currClass} onChange={props.onClassChange}>
                    {classList.filter((x) => !onlyHab || habLabels.has(x)).map(classStr => 
                        <option key={classStr} value={classStr}>{classStr}</option>
                    )}
                </select>
            </label>

            <label>
                Show Train Predictions:
                <input type="checkbox"
                    onChange={updateCheckbox}/>
            </label>

            <label>
                Show Test Predictions:
                <input type="checkbox"
                    onChange={updateCheckbox}/>
            </label>

            <label>
                Show only HAB classes:
                <input type="checkbox"
                    onChange={updateCheckbox}/>
            </label>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );

};

export default Query;
