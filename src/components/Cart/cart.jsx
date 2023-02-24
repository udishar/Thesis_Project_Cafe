import React from "react";
import Button from "../../molecules/customButton/button";
import Header from "../Header/header";
import style from "./cart.module.css";
import { userOrder } from "../../recoil/atom";
import { useRecoilState } from "recoil";

export default function Cart() {
  const[order,setOrder] = useRecoilState(userOrder);
  console.log(order);
 
  function handleRemove(cartId){
    
    const filteredItem=order.filter((ele=>ele.cartId !== cartId))

         setOrder(filteredItem)
  }
  // var formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "INR",

  //   // These options are needed to round to whole numbers if that's what you want.
  //   minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //   //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  // });

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };


  async function displayRazorPay(){
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_VdGdvprTKB8u1w",
      currency: "INR",
      amount: amount * 100,
      name: " Udisha",
      description: "Thanks for purchasing",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment Successfully");
      },
      prefill: {
        name: "Udisha",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  
  }


  return (
    <div>
      <Header />
      <div className={style.main}>
        <div className={style.div1}>
          <div className={style.items}>
            <span>Items</span>
          </div>
          <div className={style.div2}>
            {order.map((element , index) => (
              <div className={style.div} key={element.itemKey.id}>
                <div>
                  <img src={element.itemKey.imgSrc} className={style.img} />
                </div>

                <div className={style.container}>
                  <span>{element.itemKey.name}</span>
                  <span> $ {element.totalPrice}</span>
                  <span>Quantity: {element.Quantity}</span>
                  {element.Size !== "undefined" ? (
                    <span>{element.Size}</span>
                  ) : (
                    ""
                  )}
                  <Button text="Remove"  onClick={()=>handleRemove(element.cartId)} className={style.remove}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={style.div3}>
          <span>PRICE DETAILS</span>
          <div className={style.div4}>
            <span>Price</span>
            <span>discount</span>
            <span>Dilevery charges</span>
            <span>Total</span>
          </div>
          <span>Safe and secure pay</span>
          <Button text="Check Out"  onClick={()=>displayRazorPay()}/>
        </div>
      </div>
    </div>
  );
}
