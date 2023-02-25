import React, { useEffect, useState } from "react";
import { Items } from "../../constant/data";
import { useSearchParams } from "react-router-dom";
import style from "./foodItems.module.css";
import { AiFillStar } from "react-icons/ai";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useNavigate } from "react-router-dom";
import { LoggedIn } from "../../recoil/atom";
import { useRecoilValue } from "recoil";

export default function FoodItems() {
  const [searchItems] = useSearchParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const Login = useRecoilValue(LoggedIn);

  useEffect(() => {
    let clickedIndex = Items.filter(
      (ele) => ele.category == searchItems.get("category")
    );
    setData(clickedIndex);
  }, []);

  function handleClick(item, index) {
    if (Login) {
      navigate(`/order?id=${item.id}`);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className={style.container}>
      <Header />
      {data.map((item, index) => (
        <div
          key={item.id}
          className={style.data}
          onClick={() => handleClick(item, index)}
        >
          <img src={item.imgSrc} className={style.img} />

          <span> {item.name}</span>
          <span>
            {" "}
            <span style={{ color: "red" }}>$</span>{" "}
            {typeof item.price === "object" ? item?.price?.small : item?.price}
          </span>
          <span>
            {item.ratings} <AiFillStar />{" "}
          </span>
        </div>
      ))}
      <Footer />
    </div>
  );
}
