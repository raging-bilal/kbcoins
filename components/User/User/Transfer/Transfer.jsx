import React, { useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Transfer.module.css";
import kbcoins from "../../../../assets/funtoken.png";

const Transfer = ({
  NoOfToken,
  TokenName,
  TokenStandard,
  TokenSymbol,
  TokenOwnerBal,
  transferToken,
}) => {
  const [transferAccount, setTransferAccount] = useState("");
  const [tokenNumber, setTokenNumber] = useState(0);

  return (
    <>
    <div className={Style.transfer}>
      <div className={Style.transfer_box}>
        <div className={Style.transfer_box_left}>
          <h2>Token Analytic</h2>
          <div className={Style.transfer_box_left_box}>
            <p>
              Token Name
              <span>{TokenName}</span>
            </p>
            <p>
              Token Supply<span>{NoOfToken}</span>
            </p>
            <p>
              TokenSymbol{" "}
              <span className={Style.kbcoins}>
                <Image
                  className={Style.funToken_img}
                  src={kbcoins}
                  alt="symbol"
                  width={70}
                  height={70}
                  objectFit="cover"
                />
              </span>
            </p>
            <p>
              Token Left <span>{TokenOwnerBal}</span>
            </p>
          </div>
        </div>
        <div className={Style.transfer_box_right}>
          <h2>Transfer Token</h2>
          <input
            placeholder="Address"
            type="text"
            onChange={(e) => setTransferAccount(e.target.value)}
          />

          <input
            placeholder="1"
            type="number"
            min={1}
            onChange={(e) => setTokenNumber(e.target.value)}
          />
          <div className={Style.transfer_box_right_btn}>
            <button onClick={() => transferToken(transferAccount, tokenNumber)}>
              Send Token
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer className={Style.footerdistributed}>
        <div className={Style.footerleft}>
            <h3>KB Coins</h3>
            {/* <p className={Style.footerlinks}>
                <a href="#" className={Style.link1}>Home</a>
                <a href="#">Features</a>
                <a href="#">Resources</a>
                <a href="#">Faq</a>
                <a href="#">Contact Us</a>
            </p> */}

            <p className={Style.footercompanyname}>KBCoins © 2023</p>
        </div>
        <div className={Style.footercenter}>
            <div>
                <i className="fa fa-map-marker"></i>
                <p><span>Lorem ipsum dolor sit amet.</span> Lorem, ipsum.</p>
            </div>

            <div>
                <i className="fa fa-phone"></i>
                <p>+91 45678989</p>
            </div>

            <div>
                <i className="fa fa-envelope"></i>
                <p><a href="mailto:@company.com">khushnood@company.com</a></p>
            </div>
        </div>

        <div className={Style.footerright}>

            <p className={Style.footercompanyabout}>
                <span>About the company</span>
                Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus
                vehicula sit amet.
            </p>

            <div className={Style.footericons}>

                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-github"></i></a>

            </div>
        </div>
    </footer>
    </>

  );
};

export default Transfer;
