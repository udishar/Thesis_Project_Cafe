import React, { useEffect, useState } from "react";
import Button from "../../molecules/customButton/button";
import Header from "../Header/header";
import style from "./cart.module.css";
import { userOrder } from "../../recoil/atom";
import { useRecoilState } from "recoil";

export default function Cart() {
  const [order, setOrder] = useRecoilState(userOrder);
  const [netAmount, setNetAmount] = useState(0);

  useEffect(() => {
    const netAmount = order?.reduce((acc, item) => acc + item?.totalAmount, 0);
    setNetAmount(netAmount);
  }, [order]);

  console.log("netAmount ", netAmount);

  function handleRemove(cartId) {
    const filteredItem = order.filter((ele) => ele.cartId !== cartId);
    setOrder(filteredItem);
  }

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

  async function displayRazorPay() {
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
            {order.map((element, index) => (
              <div className={style.div} key={element?.id}>
                <div>
                  <img src={element.img} className={style.img} />
                </div>

                <div className={style.container}>
                  <span>{element?.name}</span>
                  <span> $ {element.totalAmount}</span>
                  <Button
                    text="Remove"
                    onClick={() => handleRemove(element.cartId)}
                    className={style.remove}
                  />
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
            <span>Net Amount - {netAmount}</span>
          </div>
          <span>Safe and secure pay</span>
          <Button text="Check Out" onClick={() => displayRazorPay()} />
        </div>
      </div>
    </div>
  );
}
