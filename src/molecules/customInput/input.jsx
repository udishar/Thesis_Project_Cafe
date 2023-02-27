import React from "react";



export default function Input(props){
return(
    <input placeholder={props.placeholder} onChange={(e)=>props.onChange(e.target.value.trim())} value={props.value} className={props.className} type={props.type}/>
)
}