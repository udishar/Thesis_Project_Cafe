import React from "react";
import style from "./footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className={style.footer}>
      <span>ALL RIGHT RESERVED</span>
      <div className={style.social}>
        <a href="https://www.facebook.com/"><FaFacebook /></a>
        <a href="https://www.instagram.com/"><FaInstagram /></a>
        <a href="https://twitter.com/?logout=1677083041053"><FaTwitter /></a>
      </div>
      <div className={style.head}>
        <h1>Udisha's Flavor House</h1>
      </div>
    </div>
  );
}
