import React, { useRef } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import "./header.css";
import { LoggedIn, UserDetail, userOrder } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navRef = useRef();
  const [login, setLogin] = useRecoilState(LoggedIn);
  const detail = useRecoilValue(UserDetail);
  const navigate = useNavigate();
  const addedElement = useRecoilValue(userOrder);

  function ShowNavbar() {
    navRef.current.classList.toggle("responsive-nav");
  }
  function HandleLogin() {
    if (btnName() == "Login") {
      navigate("/login");
    }
    if (
      btnName() == `Welcome, ${detail[0].FirstName + " " + detail[0].LastName}`
    ) {
      Swal.fire("Log Out");
      setLogin(false);
    }
  }
  function btnName() {
    if (login) {
      return `Welcome, ${detail[0].FirstName + " " + detail[0].LastName}`;
    } else {
      return "Login";
    }
  }

  return (
    <header>
      <h3 onClick={() => navigate("/")}>Flavor House</h3>
      <nav ref={navRef} className="nav">
        <a onClick={() => navigate("/")} className="home">
          Home
        </a>
        <a onClick={() => navigate("/menu")}>Menu</a>
        <a onClick={() => navigate("/contact")}>Contact</a>

        <h4 onClick={() => HandleLogin()}>{btnName()}</h4>

        <span className="icon2" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          <span className="badge">{addedElement.length}</span>
        </span>

        <button className="nav-btn nav-close-btn" onClick={ShowNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={ShowNavbar}>
        <FaBars />
      </button>
    </header>
  );
}
