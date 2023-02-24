import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Items } from "../../constant/data";
import Button from "../../molecules/customButton/button";
import Header from "../Header/header";
import style from "./order.module.css";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import Footer from "../Footer/footer";
import {userOrder,UserDetail} from '../../recoil/atom'
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import {nanoid} from 'nanoid'


export default function Order() {
  const [orderedItem, setOrderedItem] = useState(Items);
  const [searchParam] = useSearchParams();
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState();
  const [amount, setAmount] = useState(0);
  const [small, setSmall] = useState(0);
  const [medium, setMedium] = useState(0);
  const [large, setLarge] = useState(0);
  const [order,setOrder]=useRecoilState(userOrder)
  const user=useRecoilValue(UserDetail)
  
 
 
 

  useEffect(() => {
    let clickedItem = orderedItem.filter(
      (ele) => ele.id == searchParam.get("id")
    );
    setOrderedItem(clickedItem);
  }, []);

  function handleAdd(item) {
    setQuantity(quantity + 1);
    let newPrice = item.price;
    setAmount(amount + newPrice + medium + large + small);
   
  }
  function handleSubstract(item) {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      let newPrice = item.price;
      setAmount(amount - newPrice - medium - large - small);
    }
    if (quantity === 0) {
      setAmount(0);
    }
  }

  function handleOrder(item){
    let flag=true
    console.log(order)
    for(let i=0 ; i<order.length;i++){
      console.log(order[i].itemKey.id)
      if(order[i].itemKey.id == item.id  ){
        flag=false
        console.log(typeof order[i].Size)
            if(typeof order[i].Size =="undefined"){
              const {Email , Quantity , Size, cartId,totalPrice,itemKey}=order[i]
              let data={Email , Quantity , Size, cartId,totalPrice,itemKey}
                 data.Quantity=data.Quantity+1
                //  setOrder([data])
                setOrder([...data,data])
            }
            else{
                 if(order[i].Size==item.Size){
                  // setOrder(order[i].Quantity+1) 
                 }
            }
      }
    }
   if(flag){
    if(quantity>0){
      setOrder([...order,{
        Email:user[0].Email,
        itemKey:item,
        totalPrice:amount,
        Quantity:quantity,
        Size:size,
        cartId:nanoid()
   }])
   Swal.fire(`${item.name} is added to your cart`)
    } 
  else{
    Swal.fire("Select Quantity")
  }
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

            <span className={style.price}> $ {item.price}</span>
            <Button text={`Total Amount : ${amount}`} className={style.btn} />
          </div>

          <div className={style.div2}>
            <p className={style.para}>Discription</p>
            <span>{item.discription}</span>
            <p className={style.para}> Select Quantity</p>
            <div className={style.count}>
              <span onClick={() => handleAdd(item)}>
                <GrAdd />
              </span>

              <span>{quantity}</span>
              <span onClick={() => handleSubstract(item)}>
                <AiOutlineMinus />
              </span>
            </div>
            {item.itemId == "pizza01" ? (
              <div className={style.div3}>
                <span
                  onClick={() => {
                    if(size!=="small"){
                      setQuantity(0)
                      setAmount(0)
                    }
                    setSize("small");
                    setSmall(orderedItem[0].price);
                    setMedium(0);
                    setLarge(0);
                  }}
                >
                  Small
                </span>
                <span
                  onClick={() => {
                    console.log(size)
                    if(size!=="medium"){
                      setQuantity(0)
                      setAmount(0)
                    }
                    setSize("medium");
                    setMedium(orderedItem[0].price / 2);
                    setLarge(0);
                    setSmall(0);
                  }}
                >
                  Medium
                </span>
                <span
                  onClick={() => {
                    if(size!=="large"){
                      setQuantity(0)
                      setAmount(0)
                    }
                    setSize("large");
                    setLarge(orderedItem[0].price);
                    setMedium(0);
                    setSmall(0);
                  }}
                >
                  Large
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          
          <Button text="Add to Cart " className={style.btn1} onClick={()=>handleOrder(item)} />
          
        </div>
        

      ))}
      
      <Footer />
    </div>
  );
}
