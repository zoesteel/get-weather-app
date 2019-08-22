import React from 'react';

function ResultMessage(props){
    return (
        <div>
            {/* if no error message exists then display the weather message */}
            { props.error === undefined &&
                <div className="weather-result">
                    <h2>{props.description}</h2>                    
                    <p>{props.message}</p>     
                </div>
            }

            {/* if error exists then display it */}
            { props.error !== undefined && 
                <p>{props.error}</p>
            }
        </div>
    )
}

export default ResultMessage;