import React, { useState, useContext } from "react";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { ICOContext } from "../../../../context/ERC20ICO";
import Image from "next/image";
import loader from "../../../../assets/loder.gif";
import kbcoins from "../../../../assets/funtoken.png";

const NavBar = () => {
  const { account, accountBallance, userId, completed } = useContext(ICOContext);
  return (
    <div className={Style.navBar}>
      {completed && (
        <div className={Style.loder}>
          <div className={Style.loder_box}>
            <Image src={loader} alt="loder" width={200} height={200} />
          </div>
        </div>
      )}

      <div className={Style.navBar_box}>
        <div className={Style.navBar_box_left}>
          <h1>KB Coins</h1>
        </div>
        <div className={Style.navBar_box_right}>
          <p>
            Account Balance &nbsp; &nbsp;
            <span>{accountBallance}</span>

            {/* <span>Account Balance# {accountBallance}</span> &nbsp; &nbsp; */}
            
            

          </p>
          <p>
            <span>UserId #{userId}</span> &nbsp; &nbsp;
            {account}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
