import React from "react";
import style from "./services.module.css";
import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";
import s3 from "../../assets/s3.png";

export default function Service() {
  return (
    <>
      <div className={style.heading}>
        <span>WHAT WE SERVE</span>
        <span>Your Favourite Food</span>
        <span>Delivery Partner</span>
      </div>

      <div className={style.Services}>
        <div className={style.features}>
          <div >
            <img src={s1} className={style.imageWrapper}/>
          </div>
          <span>Easy to order</span>
          <span>You only need few steps in food ordering</span>
        </div>
        <div className={style.features}>
          <div >
            <img src={s2} className={style.imageWrapper}/>
          </div>
          <span>Easy to order</span>
          <span>You only need few steps in food ordering</span>
        </div>
        <div className={style.features}>
          <div >
            <img src={s3} className={style.imageWrapper}/>
          </div>
          <span>Easy to order</span>
          <span>You only need few steps in food ordering</span>
        </div>
      </div>
    </>
  );
}
