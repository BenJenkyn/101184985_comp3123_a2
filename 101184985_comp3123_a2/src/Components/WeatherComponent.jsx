import React from "react";

const Weather =(props)=>{
    return (
        
        <div className="container">
        <div className="cards pt-4">
        <h1>{props.city}</h1>
        <h5 className="py-4">
            <i className={`wi ${props.icon} display-1`}></i>
        </h5>

    {props.curTemp?(<h1 className="py-2">The temperature is: {props.curTemp}&deg;</h1>):null}
    {props.feelsLike?(<h3 className="py-2">Today It Feels Like : {props.feelsLike}&deg;</h3>):null}
        {props.min && props.max ?(minMax(props.min, props.max)):null}
    <h4 className="py-3">{props.description}</h4>
        </div>
        </div>
    );
};

function minMax(min, max){
    return(
        <h3>
            <span className="px-4">There's a low of : {min} &deg;</span>
            <span className="px-4">There's a high of : {max}&deg;</span>
        </h3>
    )
}

export default Weather;