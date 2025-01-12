import React from "react"

const ChildComponent = (props) =>{
    return(
        <div>
            <h3>Input Data:</h3>
            <input onChange={(e) => props.inputChange(e.target.value)}/>
        </div>
    );
    
};

export default ChildComponent