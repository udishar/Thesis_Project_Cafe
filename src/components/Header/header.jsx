import React, { useState } from "react";
import style from "./header.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { LoggedIn, UserDetail, userOrder } from "../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function Header() {
  const [login, setLogin] = useRecoilState(LoggedIn);
  const detail = useRecoilValue(UserDetail);
  const [anchorEl, setAnchorEl] = useState(null);
  const addedElement = useRecoilValue(userOrder);

  const navigate = useNavigate();
  function HandleLogo() {
    navigate("/");
  }
  function HandleHome() {
    navigate("/");
  }
  function HandleLogin(e) {
    if (btnName() == "Login") {
      navigate("/login");
    }
    if (
      btnName() == `Welcome, ${detail[0].FirstName + " " + detail[0].LastName}`
    ) {
      setAnchorEl(e.currentTarget);
    }
  }
  const open = Boolean(anchorEl);

  function btnName() {
    if (login) {
      return `Welcome, ${detail[0].FirstName + " " + detail[0].LastName}`;
    } else {
      return "Login";
    }
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function handleContact() {
    navigate("/contact");
  }
  function handleClick() {
    navigate("/cart");
  }

  //  function HandleMenu(){
  //   navigate("/menu")

  // }
  return (
    <nav className={style.header}>
      <div className={style.head} onClick={HandleLogo}>
        <h1>Udisha's Flavor House</h1>
      </div>
      <ul className={style.middle}>
        <a onClick={HandleHome}>
          {" "}
          <AiFillHome /> Home
        </a>
        <a href="#Menu">
          {" "}
          <BiFoodMenu /> Menu
        </a>
        <a onClick={handleContact}>
          {" "}
          <BsTelephoneFill /> Contact
        </a>
      </ul>

      <div className={style.right}>
        <div className={style.icon}>
          {/* <h4 onClick={() => HandleLogin()}>{btnName()}</h4> */}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Log Out</Typography>
          </Popover>

          <FaShoppingCart onClick={handleClick} />
          <div className={style.badge}>{addedElement.length}</div>
        </div>
        {/* <div className={style.badge}>1</div> */}
      </div>
    </nav>
  );
}
