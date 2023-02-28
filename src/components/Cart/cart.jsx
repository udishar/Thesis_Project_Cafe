import React, { useEffect, useState } from "react";
import Button from "../../molecules/customButton/button";
import Header from "../Header/header";
import style from "./cart.module.css";
import { userOrder } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/footer";

export default function Cart() {
  const [order, setOrder] = useRecoilState(userOrder);
  const [netAmount, setNetAmount] = useState(0);
 

  const navigate = useNavigate();
  useEffect(() => {
    const netAmount = order?.reduce((acc, item) => acc + item?.totalAmount, 0);
    setNetAmount(netAmount);
  }, [order]);

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

  async function displayRazorPay(netAmount) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      Swal.fire("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_VdGdvprTKB8u1w",
      currency: "INR",
      amount: netAmount * 100,
      name: " Udisha",
      description: "Thanks for purchasing",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: function (response) {
        Swal.fire(response.razorpay_payment_id);
        Swal.fire("Payment Successfull,Thanks for ordering ");
        navigate("/");
        setOrder([]);
        
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
                  <span> Rs {element.totalAmount}</span>
                  {element.category !== "pizza" ? (
                    <span> Quantity:{element.quantity}</span>
                  ) : (
                    <div>
                      <span>
                        {" "}
                        Small:
                        <span className={style.small}>
                          {element.quantityObj.small}
                        </span>{" "}
                        Medium:{" "}
                        <span className={style.medium}>
                          {element.quantityObj.medium}
                        </span>{" "}
                        Large:{" "}
                        <span className={style.large}>
                          {element.quantityObj.large}
                        </span>
                      </span>
                    </div>
                  )}

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
            <span>Price - {netAmount}</span>
            <span>Dilevery charges - Free Dilevery</span>
            <span>Net Amount - {netAmount}</span>
          </div>
          <span className={style.payment}>Safe and secure pay</span>
          <Button
            text="Check Out"
            onClick={() => displayRazorPay(netAmount)}
            className={style.paybtn}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
