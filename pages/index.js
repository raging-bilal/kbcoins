import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import { ICOContext } from "../context/ERC20ICO";
import Style from "../styles/index.module.css";
import banner from "../assets/home-banner.png";
import Bitcoin from "../assets/Bitcoin.jpg";
import User from "../components/User/User/User";
import Transfer from "../components/User/User/Transfer/Transfer";

const Home = () => {
  const [myAccount, setMyAccount] = useState("");
  const [ammount, setAmmount] = useState(0);
  const {
    EROKBCoins,
    transferToken,
    checkIfWalletConnected,
    tokenHolderData,
    kbcoins,
    NoOfToken,
    TokenName,
    TokenStandard,
    TokenSymbol,
    TokenOwner,
    holderArray,
    account,
    accountBallanc,
    TokenOwnerBal,
  } = useContext(ICOContext);

  useEffect(() => {
    // checkConnection();
    EROKBCoins();
    checkIfWalletConnected();
    tokenHolderData();
  }, []);

  return (
    <div className={Style.home}>
      <div className={Style.heroSection}>
        <div className={Style.heroSection_left}>
          <h1>ICO Launching KBCoins (KB)</h1>
          <p>
          Welcome to [KBCoins]! Discover cutting-edge ICO projects, connect with global investors, and stay updated with the latest trends. Your gateway to the future of finance and technology. Join us now!
            
          </p>

          <div className={Style.heroSection_left_btn}>
            <button className={Style.btn}>Whitepaper</button>
            <button className={Style.btn}>product intro</button>
          </div>
        </div>
        <div className={Style.heroSection_right}>
          <Image
            src={Bitcoin}
            alt="banner"
            width={300}
            height={300}
            className={Style.heroSection_right_img_one}
          />
          <Image
            src={Bitcoin}
            alt="banner"
            width={200}
            height={200}
            className={Style.heroSection_right_img}
          />
          <Image
            src={Bitcoin}
            alt="banner"
            width={100}
            height={100}
            className={Style.heroSection_right_img}
          />
          <Image
            src={Bitcoin}
            alt="banner"
            width={50}
            height={50}
            className={Style.heroSection_right_img}
          />
          <Image
            src={Bitcoin}
            alt="banner"
            width={20}
            height={20}
            className={Style.heroSection_right_img}
          />
        </div>
      </div>
      <Transfer
        NoOfToken={NoOfToken}
        TokenName={TokenName}
        TokenStandard={TokenStandard}
        TokenSymbol={TokenSymbol}
        TokenOwnerBal={TokenOwnerBal}
        transferToken={transferToken}



        // kbcoins={kbcoins}
        // TokenOwner={TokenOwner}
        // account={account}
        // accountBallanc={accountBallanc}

      />
      <User holderArray={holderArray} />
    </div>
  );
};

export default Home;
