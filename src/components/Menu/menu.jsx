import React from "react";
import { MenuItems } from "../../constant/data";
import style from "./menu.module.css";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const Categories = MenuItems;
  const navigate = useNavigate();

  function HandleClick(item) {
    navigate(`/items?category=${item.category}`);
  }

  return (
    <div className={style.container} id="Menu">
      <div className={style.heading}>
        <span>Our Menu</span>
        <span>Menu That Always</span>
        <span>Make You Fall In Love</span>
      </div>
      <div className={style.mapContainer}>
        {Categories.map((items, index) => (
          <div
            className={style.data}
            key={items.itemId}
            onClick={() => HandleClick(items)}
          >
            <span>{items.name}</span>
            <img src={items.imgSrc} className={style.img} />
          </div>
        ))}
      </div>
    </div>
  );
}
