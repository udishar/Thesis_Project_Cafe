import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Items } from "../../constant/data";
import Button from "../../molecules/customButton/button";
import Header from "../Header/header";
import style from "./order.module.css";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import Footer from "../Footer/footer";
import { userOrder, UserDetail } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";

export default function Order() {
  const [orderedItem, setOrderedItem] = useState([]);
  const [searchParam] = useSearchParams();
  const [quantity, setQuantity] = useState(0);
  const [quantityObj, setQuantityObj] = useState({
    small: 0,
    medium: 0,
    large: 0,
  });
  const [order, setOrder] = useRecoilState(userOrder);
  const [amount, setAmount] = useState(0);
  const [amountObj, setAmountObj] = useState({ small: 0, medium: 0, large: 0 });
  const [totalAmount, setTotalAmount] = useState(0);

  //fetching queried item
  useEffect(() => {
    let clickedItem = Items?.filter((ele) => ele.id == searchParam.get("id"));
    setOrderedItem(clickedItem);
  }, []);

  //calculating total amount of an item
  useEffect(() => {
    const totalAmount =
      Object.values(amountObj).reduce((acc, val) => acc + val, 0) + amount;
    console.log("totalAmount - ", totalAmount);
    setTotalAmount(totalAmount);
  }, [amount, amountObj]);

  console.log(order);

  function handleAdd(item, size) {
    switch (size) {
      case "small":
        setQuantityObj({ ...quantityObj, small: quantityObj?.small + 1 });
        {
          const newPrice = (quantityObj?.small + 1) * item?.price?.small;
          setAmountObj({ ...amountObj, small: newPrice });
        }
        break;
      case "medium":
        setQuantityObj({ ...quantityObj, medium: quantityObj?.medium + 1 });
        {
          const newPrice = (quantityObj?.medium + 1) * item?.price?.medium;
          setAmountObj({ ...amountObj, medium: newPrice });
        }
        break;
      case "large":
        setQuantityObj({ ...quantityObj, large: quantityObj?.large + 1 });
        {
          const newPrice = (quantityObj?.large + 1) * item?.price?.large;
          setAmountObj({ ...amountObj, large: newPrice });
        }
        break;
      case "general":
        setQuantity(quantity + 1);
        const newPrice = (quantity + 1) * item?.price;
        setAmount(newPrice);
        break;
      default:
        break;
    }
  }

  function handleSubstract(item, size) {
    switch (size) {
      case "small":
        if (quantityObj?.small > 0) {
          setQuantityObj({ ...quantityObj, small: quantityObj?.small - 1 });
          {
            const newPrice = (quantityObj?.small - 1) * item?.price?.small;
            setAmountObj({ ...amountObj, small: newPrice });
          }
        }
        break;
      case "medium":
        if (quantityObj?.medium > 0) {
          setQuantityObj({ ...quantityObj, medium: quantityObj?.medium - 1 });
          {
            const newPrice = (quantityObj?.medium - 1) * item?.price?.medium;
            setAmountObj({ ...amountObj, medium: newPrice });
          }
        }
        break;
      case "large":
        if (quantityObj?.large > 0) {
          setQuantityObj({ ...quantityObj, large: quantityObj?.large - 1 });
          {
            const newPrice = (quantityObj?.large - 1) * item?.price?.large;
            setAmountObj({ ...amountObj, large: newPrice });
          }
        }
        break;
      case "general":
        if (quantity > 0) {
          setQuantity(quantity - 1);
          const newPrice = (quantity - 1) * item?.price;
          setAmount(newPrice);
        }
        break;
      default:
        break;
    }
  }

  // console.log("orders - ", order);
  function handleOrder(item) {
    const itemIndex = order.findIndex((key) => key?.itemId == item?.id);

    //checking if item existed in cart
    if (itemIndex !== -1) {
      if (item?.category === "pizza") {
        const newOrder = [...order];
        newOrder[itemIndex] = {
          ...order[itemIndex],
          amountObj: amountObj,
          quantityObj: quantityObj,
          totalAmount: totalAmount,
        };

        setOrder(newOrder);
      } else {
        const newOrder = [...order];
        newOrder[itemIndex] = {
          ...order[itemIndex],
          amount: amount,
          quantity: quantity,
          totalAmount: totalAmount,
        };
        setOrder(newOrder);
      }
      Swal.fire(`${item.name} has updated in your cart`);
    } else {
      //if item not found in cart
      if (item?.category === "pizza") {
        setOrder([
          ...order,
          {
            category: item?.category,
            name: item?.name,
            img: item?.imgSrc,
            itemId: item?.id,
            totalAmount: totalAmount,
            quantityObj: quantityObj,
            amountObj: amountObj,
            cartId: nanoid(),
          },
        ]);
      } else {
        setOrder([
          ...order,
          {
            category: item?.category,
            name: item?.name,
            img: item?.imgSrc,
            itemId: item?.id,
            totalAmount: totalAmount,
            quantity: quantity,
            amount: amount,
            cartId: nanoid(),
          },
        ]);
      }
      Swal.fire(`${item.name} is added to your cart`);
    }
  }

  return (
    <div className={style.main}>
      <Header />
      {orderedItem.map((item, i) => (
        <div className={style.mainContainer}>
          <div className={style.div1}>
            <h2>{item.name}</h2>
            <img src={item.imgSrc} className={style.img} />

            <span className={style.price}>
              ${" "}
              {typeof item.price === "object" ? item?.price.small : item?.price}
            </span>
            <Button
              text={`Total Price  : ${totalAmount}`}
              className={style.btn}
            />
          </div>

          <div className={style.div2}>
            <p className={style.para}>Description</p>
            <span>{item.description}</span>
            <p className={style.para}> Select Quantity</p>

            {item?.category === "pizza" ? (
              <>
                <div>
                  <b>Small</b>
                  <div className={style.count}>
                    <span onClick={() => handleAdd(item, "small")}>
                      <GrAdd />
                    </span>
                    <span>{quantityObj?.small}</span>
                    <span onClick={() => handleSubstract(item, "small")}>
                      <AiOutlineMinus />
                    </span>
                  </div>
                </div>
                <div>
                  <b>Medium</b>
                  <div className={style.count}>
                    <span onClick={() => handleAdd(item, "medium")}>
                      <GrAdd />
                    </span>
                    <span>{quantityObj?.medium}</span>
                    <span onClick={() => handleSubstract(item, "medium")}>
                      <AiOutlineMinus />
                    </span>
                  </div>
                </div>
                <div>
                  <b>Large</b>
                  <div className={style.count}>
                    <span onClick={() => handleAdd(item, "large")}>
                      <GrAdd />
                    </span>
                    <span>{quantityObj?.large}</span>
                    <span onClick={() => handleSubstract(item, "large")}>
                      <AiOutlineMinus />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <b>General</b>
                <div className={style.count}>
                  <span onClick={() => handleAdd(item, "general")}>
                    <GrAdd />
                  </span>
                  <span>{quantity}</span>
                  <span onClick={() => handleSubstract(item, "general")}>
                    <AiOutlineMinus />
                  </span>
                </div>
              </div>
            )}
          </div>

          <Button
            text="Add to Cart "
            className={style.btn1}
            onClick={() => handleOrder(item)}
          />
        </div>
      ))}

      <Footer />
    </div>
  );
}
