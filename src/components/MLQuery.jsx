import React, {useState, useEffect} from 'react';

/**
 * Component to deal with sending a user query
 *  
 */
const Query = (props) => {

    const [onlyHab, setOnlyHab] = useState(false);

    const showTrain = (props.trainImg && 
        'ml_prediction' in props.trainImg[0] && 'label' in props.trainImg[0]);
    const showTest = (props.testImg && 
        'ml_prediction' in props.testImg[0] && 'label' in props.testImg[0]);

    if (props.trainImg && !('label' in props.trainImg[0])) {
        props.setTrainPredictions(true)
    }
    if (props.testImg && !('label' in props.testImg[0])) {
        props.setTestPredictions(true)
    }

    const classList = props.classList.concat(onlyHab ? ['Other'] : []);
    const habLabels = new Set([
        "Akashiwo",
        "Ceratium falcatiforme",
        "Ceratium furca",
        "Chattonella",
        "Cochlodium",
        "Gyrodinium",
        "Lingulodinium polyedra",
        "Prorocentrum micans",
        "Pseudo-nitzschia chain",
	"Other"
	]);

    const updateTrain = (e) => {
        props.setTrainPredictions(e.target.checked);
    }

    const updateTest = (e) => {
        props.setTestPredictions(e.target.checked);
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
                    {classList.filter(x => !onlyHab || habLabels.has(x)).map(classStr => 
                        <option key={classStr} value={classStr}>{classStr}</option>
                    )}
                </select>
            </label>

            {showTrain ? (
            <label>
                Show Train Predictions:
                <input type="checkbox"
                    onChange={updateTrain}/>
            </label>
            ) : (null)}

            {showTest ? (
            <label>
                Show Test Predictions:
                <input type="checkbox"
                    onChange={updateTest}/>
            </label>
            ) : (null)}

            <label>
                Show only HAB classes:
                <input type="checkbox"
                    onChange={updateHab}/>
            </label>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );

};

export default Query;
