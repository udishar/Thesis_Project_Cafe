import React from "react";
import style from "./middle.module.css";
import { BsLightningFill, BsTelephoneFill } from "react-icons/bs";
import Button from "../../molecules/customButton/button";
import { LoggedIn} from "../../recoil/atom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

export default function Middle() {
  const Login = useRecoilValue(LoggedIn);
  const navigate = useNavigate();
 
  
  function handleClick() {
    if (buttonText() == "Get Started") {
      navigate("/login");
    }
    if (buttonText() == "Order Now") {
      navigate("/menu");
    }
  }

  function buttonText(){
  if (Login) {
    return "Order Now";
  } else {
    return "Get Started";
  }}



  return (
    
    <div className={style.container}>
        <div className={style.left}>
          <div className={style.midTop}>
            <span>Believe It. Or Not. ITS THE FASTEST</span>
            <div className={style.icon}>
              {" "}
              <BsLightningFill />
            </div>
          </div>

          <div className={style.text}>
            <span> Nothing Brings People</span>
            <span style={{ color: " red" }}>Together</span>
            <span>Like a Good Food</span>
          </div>
          <span className={style.miniText}>
            Our mission is to fill your tummy with delicious food and with free
            & fast delivery
          </span>
 <Button
            className={style.btn}
            text={buttonText()}
            onClick={() => handleClick()}
          /> 
        </div>

        <div className={style.right}>
          <img
            src="https://www.freepnglogos.com/uploads/food-png/fast-food-transparent-png-pictures-icons-and-png-18.png"
            className={style.img}
            alt=""
          />
        </div>
      </div>
    
  );
}
