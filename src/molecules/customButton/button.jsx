import React from "react";

export default function Button(props){
    return(
        <div>
            <button className={props.className} onClick={props.onClick} >{props.text}</button>
        </div>
    )
}