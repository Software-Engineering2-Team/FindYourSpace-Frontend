import React from "react"
import ChildComponent from "./ChildComponent"
const parentComponent = () =>{
    [message,setMessage] = useState(null)
    const handleMessage = (text) =>{
        setMessage(text);
    }
    return (
    <div>
        <h1>Message data:{message}</h1>
        <ChildComponent inputChange={handleMessage}/>
    </div>
    );

};

export default parentComponent