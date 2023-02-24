import React from "react";
import style from './contact.module.css'

export default function Contact(){
    return(
        <div className={style.main}>
            <div className={style.second}>
            <h2>To Get To Know More About Us</h2>
            <h3>You Can Follow Us On the Underlying Social Media Sites</h3>
            <div className={style.link}>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.youtube.com/"> Youtube</a>
            <a href="https://www.facebook.com/">Facebook</a>
            </div>
            
            </div>


        </div>
    )
}