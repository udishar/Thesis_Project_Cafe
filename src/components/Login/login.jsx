import React, { useState } from "react";
import Button from "../../molecules/customButton/button";
import Input from "../../molecules/customInput/input";
import style from './login.module.css'
import {BiUser,BiLockAlt} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { UserDetail,LoggedIn } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";


export default function Login(){
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const[userData,setUserData]=useRecoilState(UserDetail)
    const[login,setLogin]=useRecoilState(LoggedIn)

   
    const navigate = useNavigate()

   function HandleRegister(){
    
    navigate("/register")

   }
   function HandleLogin(e){
    e.preventDefault();
     
    let flag=true;
    for(let i=0 ;i<userData.length ; i++){
        if(email){
         if(userData[i].Email == email){
           flag=false;
           if(userData[i].Password == password){
             setLogin(true)
             Swal.fire("Flavour House Welcomes You")
             navigate("/")
             
           }
           else{
            Swal.fire("Opss The Password is incorrect")
            break;
           }
         }
        }
    }
    if(flag){
        Swal.fire(" Oh Noo, User Not Found")
    }
     
   }
   console.log(login,"after")

 return(
    <div className={style.main}>
       
        <form className={style.form}>
        <h2 className={style.heading}>Login</h2>
            <section className={style.input}>
                <BiUser className={style.icon}/>
              <Input placeholder="Your email here..." className={style.field} onChange={(inputEmail)=>setEmail(inputEmail)}/>
            </section>
            <section className={style.input}>
                <BiLockAlt className={style.icon}/>
                <Input placeholder="Your password here..." className={style.field} onChange={(inputPassword)=>setPassword(inputPassword)} type="password"/>
            </section>
            <section className={style.btn}>
                <Button text="Login" className={style.btns} onClick={HandleLogin}/>
                <Button text = "Register" className={style.btns} onClick={HandleRegister}/>
            </section>
        </form>
    </div>
 )
}