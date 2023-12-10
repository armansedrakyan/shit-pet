import Link from "next/link";
import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import {getNfts} from "../src/redux/actions/nfts";

const getSplitData = (type) => {
    return type.split(" ").join("-");
};

const Collection = ({getNfts, nfts, referralNft}) => {

    const blockchain = useSelector((state) => state.blockchain);
    const [myNfts, setMyNfts] = useState([]);
    const [isClimbing, setIsClimbing] = useState(false);


    const [referralInfo, setReferralInfo] = useState([]);

    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "0x982544CecACba2019548a71B4ddD2d95D2172F78",
        SCAN_LINK: "",
        NETWORK: {
            NAME: "Rinkeby",
            SYMBOL: "",
            ID: 4,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        WEI_COST: 1000000000000000000,
        DISPLAY_COST: 0,
        GAS_LIMIT: 5500000,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
    });

    useEffect(() => {
        getNft()
    }, [blockchain.account])

    useEffect(() => {
        getNfts();
    }, []);

    const getNft = async () => {

        if (blockchain.account) {

           await Promise.all([
               getReferralNfts(),
               getDogNfts()
           ]);

        }
    };

    const getReferralNfts = async () => {
        const referral = await blockchain.referralContract.methods
            .walletOfOwner(blockchain.account)
            .call();

        if (referral && referral.length > 0) {
            const referralInfo = referral.map((i) => {
                return blockchain.smartContract.methods
                    .getRewards(referral[0])
                    .call();
            })

            const refInfo = await Promise.all([...referralInfo]);

            const infoToShow = referral.map((i, k) => {
                return {
                    ...referralNft,
                    referral: true,
                    dogContractAmount: refInfo[k],
                    id: i
                }
            })

            setReferralInfo(infoToShow)
        }
    }

    const getDogNfts = async () => {
        const dogs = await blockchain.smartContract.methods
            .walletOfOwner(blockchain.account)
            .call();

        setMyNfts(dogs)

    }

    const claimDogReward = async () => {
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalGasLimit = String(gasLimit);
        setIsClimbing(true)

        blockchain.smartContract.methods
            .claim()
            .send({
                gasLimit: String(totalGasLimit),
                //TODO: dog contract address
                to: '0x258a0c406b2D37A89A49CaC4D6Eb99E9d1C37Cb8',
                from: blockchain.account,
            })
            .once("error", (err) => {
                console.log('err');
                console.log(err);
                setIsClimbing(false)

            })
            .then((receipt) => {
                getReferralNfts();
                setIsClimbing(false)
            });


    }
    return (
        <Layout pageTitle={"Collection"}>
            <PageBanner pageName={"Collection"}/>
            {/* Collection Page */}
            <div className="metaportal_fn_collectionpage">
                <div className="container">
                    <div className="metaportal_fn_collection">
                        {/* Filters */}

                        {/* !Filters */}
                        <div className="metaportal_fn_clist">
                            {/* Result Box */}

                            {/* !Result Box */}
                            {/* Result List */}
                            <div className="metaportal_fn_result_list">
                                <div className="metaportal_fn_drops">
                                    <ul className="grid">
                                        { referralInfo.map((i, index) => (
                                                <li
                                                    key={i}
                                                >
                                                    <div className="nft__item">
                                                        <div className="img_holder">
                                                            <img src={i.image} alt=""/>
                                                            {/*<Link href={`/nft/${i}`}>*/}
                                                            {/*    <a className="full_link"/>*/}
                                                            {/*</Link>*/}
                                                        </div>
                                                        <div className="title_holder">
                                                            <h3 className="fn_title">
                                                                {`${i.title} #${i.id}`}
                                                            </h3>
                                                            <h3 className="fn_title">
                                                                claim - {i.dogContractAmount}
                                                            </h3>

                                                            { isClimbing ? 'loading...' :
                                                                <h3 className="fn_title" onClick={claimDogReward}>
                                                                    claim
                                                                </h3>
                                                            }
                                                            <h3 className="fn_title">
                                                                referal url {i.id}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}

                                        {myNfts &&
                                            myNfts.map((i, index) => (
                                                <li
                                                    className={
                                                        getSplitData(nfts[i - 1].type) +
                                                        " " +
                                                        getSplitData(nfts[i - 1].special) +
                                                        " " +
                                                        getSplitData(nfts[i - 1].clothing)
                                                    }
                                                    key={i}
                                                >
                                                    <div className="nft__item">
                                                        <div className="img_holder">
                                                            <img src={nfts[i - 1].image} alt=""/>
                                                            <Link href={`/nft/${nfts[i - 1].id}`}>
                                                                <a className="full_link"/>
                                                            </Link>
                                                        </div>
                                                        <div className="title_holder">
                                                            <h3 className="fn_title">
                                                                <Link
                                                                    href={`/nft/${nfts[i - 1].id}`}>{nfts[i - 1].title}</Link>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                            {/* !Result List */}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    nfts: state.nfts.data,
    referralNft: {
        "image": "/img/collection/2.webp",
        "title": "Referral",
        "price": "0.07",
        "quantity": 1,
        "type": "spirit",
        "special": "fox fire",
        "clothing": "light kimono"
    }

});

export default connect(mapStateToProps, {getNfts})(Collection);
