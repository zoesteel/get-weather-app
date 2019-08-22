import React from 'react';

function ResultMessage(props){
    return (
        <div>
            {/* if no error message exists then display the weather message */}
            { props.error === undefined &&
                <div className="result">
                    <h2>{props.description}</h2>                    
                    <p>{props.message}</p>     
                </div>
            }

            {/* if error exists then display it */}
            { props.error !== undefined && 
                <div className="result">
                    <p>{props.error}</p>
                </div>
            }
        </div>
    )
}

export default ResultMessage;