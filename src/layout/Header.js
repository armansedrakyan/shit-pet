import Link from "next/link";
import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
import { stickyNav } from "../utilits";

const Header = ({ walletToggle, navigationToggle }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    stickyNav();
    const closePopup=(e)=>{
      if(e.srcElement.currentSrc!="http://localhost:3000/img/account.png"){
        setShowPopup(false)
      }
    }
    document.body.addEventListener("click",closePopup);

    return () => document.body.removeEventListener("click",closePopup)
  }, []);

  return (
    <header id="header">
      <div className="header">
        <div className="header_in">
          <div className="trigger_logo">
            {/*<div className="trigger" onClick={() => navigationToggle(true)}>*/}
            {/*  <span />*/}
            {/*</div>*/}
            <div className="logo">
              <Link href="/">
                <a>
                  <img src="/img/logo.png" alt="" />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav" style={{ opacity: 1 }}>
            <ul>
              <li>
                <Link href="/#home">
                  <a className="creative_link">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="creative_link">About</a>
                </Link>
              </li>
              <li>
                <Link href="/#collection">
                  <a className="creative_link">Collection</a>
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <a className="creative_link">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="wallet">
            {blockchain?.account ?
                <div className={"navbar_parent"}>
                  <div className="trigger" onClick={()=>setShowPopup(!showPopup)} >
                    <img src="/img/account.png" alt="" />
                  </div>
                  <div className={showPopup?"navbar_profile":"navbar_profile hide_popup"} >
                      <div className={"navbar_address"}>
                        {blockchain?.account}
                      </div>
                      <div className={"navbar_items"}>
                        <div className={"navbar_item"}>
                          <Link href="/my-collection">
                            <a className="creative_link">My NFTs</a>
                          </Link>
                        </div>
                        <div className={"navbar_item"}>
                          <Link href="/logout">
                            <a className="creative_link">Logout</a>
                          </Link>
                        </div>
                      </div>
                  </div>
                </div>
                : (
                    <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          walletToggle(true);
                        }}
                        className="metaportal_fn_button wallet_opener"
                    >
                      <span>Connect To Wallet</span>
                    </a>
                )
            }

          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { walletToggle, navigationToggle })(
  Header
);
