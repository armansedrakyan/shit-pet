import {Fragment, useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {walletToggle} from "../redux/actions/siteSettings";
import {fetchData} from "../redux/data/dataActions";
import {connectWallet, updateAccount} from "../redux/blockchain/blockchainActions";

const WalletPopUp = ({walletToggle, wallet}) => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [claimingNft, setClaimingNft] = useState(false);
    const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
    const [mintAmount, setMintAmount] = useState(1);
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "",
        SCAN_LINK: "",
        NETWORK: {
            NAME: "Rinkeby",
            SYMBOL: "",
            ID: 4,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        WEI_COST: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
    });


    const claimNFTs = () => {
        let cost = CONFIG.WEI_COST;
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalCostWei = String(cost * mintAmount);
        let totalGasLimit = String(gasLimit * mintAmount);
        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);
        setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods
            .mint(mintAmount)
            .send({
                gasLimit: String(totalGasLimit),
                to: CONFIG.CONTRACT_ADDRESS,
                from: blockchain.account,
                value: totalCostWei,
            })
            .once("error", (err) => {
                console.log(err);
                setFeedback("Sorry, something went wrong please try again later.");
                setClaimingNft(false);
            })
            .then((receipt) => {
                console.log(receipt);
                setFeedback(
                    `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
                );
                setClaimingNft(false);
                dispatch(fetchData(blockchain.account));
            });
    };

    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
            newMintAmount = 1;
        }
        setMintAmount(newMintAmount);
    };

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > 10) {
            newMintAmount = 10;
        }
        setMintAmount(newMintAmount);
    };

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

    const getConfig = async () => {
        const configResponse = await fetch("/config/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const config = await configResponse.json();
        SET_CONFIG(config);
    };

    useEffect(() => {
        getConfig();
    }, []);

    useEffect(() => {
        getData();
    }, [ blockchain.account]);

    useEffect(() => {
        if(window.ethereum && window.ethereum.selectedAddress) {
            dispatch(updateAccount(window.ethereum.selectedAddress))
        }
    },[])

    return (
        <Fragment>
            <div
                className={`metaportal_fn_wallet_closer ${wallet ? "active" : ""}`}
                onClick={() => walletToggle(false)}
            />
            <div className={`metaportal_fn_walletbox ${wallet ? "active" : ""}`}>
                <a href="#" className="fn__closer" onClick={() => walletToggle(false)}>
                    <span/>
                </a>
                <div className="walletbox">
                    <div className="title_holder">
                        <h3>Connect Wallet</h3>
                        <p>
                            Connect with one of our available wallet providers or create a new
                            one.
                        </p>
                    </div>
                    <div className="list_holder">
                        <ul className="metaportal_fn_items">
                            <li>
                                <div className="item">
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(connectWallet());
                                        getData();
                                        walletToggle(false)
                                    }}/>
                                    <span className="icon">
                    <img src="/img/wallet/metamask.png" alt=""/>
                  </span>
                                    <span className="text">Metamask</span>
                                </div>
                            </li>
                            <li>
                                <div className="item">
                                    <a href="#"/>
                                    <span className="icon">
                    <img src="/img/wallet/coinbase.png" alt=""/>
                  </span>
                                    <span className="text">Coinbase</span>
                                </div>
                            </li>
                            <li>
                                <div className="item">
                                    <a href="#"/>
                                    <span className="icon">
                    <img src="/img/wallet/walletconnect.png" alt=""/>
                  </span>
                                    <span className="text">WalletConnect</span>
                                </div>
                            </li>
                            <li>
                                <div className="item">
                                    <a href="#"/>
                                    <span className="icon">
                    <img src="/img/wallet/venly.png" alt=""/>
                  </span>
                                    <span className="text">Venly</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    wallet: state.site.wallet,
});

export default connect(mapStateToProps, {walletToggle})(WalletPopUp);
