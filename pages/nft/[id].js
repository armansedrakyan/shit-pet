import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";

import Layout from "../../src/layout/Layout";
import {getNfts, getSingleNft} from "../../src/redux/actions/nfts";
import {fetchData} from "../../src/redux/data/dataActions";
// import {useSearchParams} from "react-router-dom";

const Nft = ({getSingleNft, nft, getNfts, nfts}) => {
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();
    const router = useRouter();

    const { id, referralId } = router.query;
    const [similarItem, setSimilarItem] = useState([]);
    const [refId, setRefId] = useState('');

    useEffect(() => {
        getSingleNft(id);
        getNfts();

        setRefId(referralId)
    }, [id]);

    useEffect(() => {
        if (nfts && nft) {
            setSimilarItem(
                nfts.filter(
                    (nft_) =>
                        nft_.type === nft.type ||
                        nft.special === nft_.special ||
                        nft.clothing == nft_.clothing
                )
            );
        }
    }, [nfts]);

    const blockchain = useSelector((state) => state.blockchain);
    const [feedback, setFeedback] = useState(null);
    const [claimingNft, setClaimingNft] = useState(false);
    const [mintAmount, setMintAmount] = useState(1);
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "0x39Cee6bA81f05F3E63f2219921b87E4689ECEc27",
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

    const claimNFTs = () => {
        let cost = CONFIG.WEI_COST;
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalCostWei = String(0.001 * cost);
        let totalGasLimit = String(gasLimit);

        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);

        setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);

        blockchain.smartContract.methods
            .mint(1, refId)
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


    return (
        <Layout pageTitle={"Minting"}>
            <div className="metaportal_fn_mintpage">
                <div className="container small">
                    {/* Mint Top */}
                    <div className="metaportal_fn_mint_top">
                        <div className="mint_left">
                            <div className="img">
                                <div
                                    className="img_in"
                                    style={{backgroundImage: `url(${nft && nft.image})`}}
                                >
                                    <img src="/img/1x1.jpg" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="mint_right">
                            <div className="metaportal_fn_share">
                                <h5 className="label">Share:</h5>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img
                                                src="/svg/social/twitter-1.svg"
                                                alt=""
                                                className="fn__svg"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img
                                                src="/svg/social/facebook-1.svg"
                                                alt=""
                                                className="fn__svg"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img
                                                src="/svg/social/instagram-1.svg"
                                                alt=""
                                                className="fn__svg"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img
                                                src="/svg/social/pinterest-1.svg"
                                                alt=""
                                                className="fn__svg"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img
                                                src="/svg/social/behance-1.svg"
                                                alt=""
                                                className="fn__svg"
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="metaportal_fn_breadcrumbs">
                                <p>
                                    <Link href="/">
                                        <a>Home</a>
                                    </Link>
                                    <span className="separator">/</span>
                                    <Link href="/collection">
                                        <a>Collection</a>
                                    </Link>
                                    <span className="separator">/</span>
                                    <span className="current">{nft && nft.title}</span>
                                </p>
                            </div>
                            <h3
                                className="fn__maintitle"
                                data-text={nft && nft.title}
                                data-align="left"
                            >
                                {nft && nft.title}
                            </h3>
                            <div className="desc">
                                <p>
                                    Suspendisse eu velit est. Cras nec vestibulum quam. Donec
                                    tincidunt purus nec enim tincidunt, sit amet facilisis massa
                                    laoreet. Integer mollis nec sapien eu lacinia. Nunc eu massa
                                    dictum, vulputate neque ac, porta mauris. Sed sollicitudin
                                    nisi augue, a gravida turpis elementum vel. Curabitur sagittis
                                    quis diam et rhoncus. Nam pellentesque imperdiet aliquet. Sed
                                    non ante malesuada, ultrices sem at, tempus libero.
                                </p>
                                <p>
                                    Duis eu lorem ut mauris pulvinar auctor. Maecenas et dapibus
                                    orci, eleifend euismod justo. Quisque luctus turpis eu
                                    tristique feugiat. Praesent ac magna feugiat, interdum lacus
                                    ac, interdum dui. Pellentesque id quam quis enim malesuada
                                    rutrum. Orci varius natoque penatibus et magnis dis
                                    parturient.
                                </p>
                            </div>
                            <div className="view_on">
                                <ul>
                                    <li>
                                        <span>View On:</span>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/svg/opensea.svg" alt="" className="fn__svg"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/svg/portal.svg" alt="" className="fn__svg"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* !Mint Top */}
                    {/* Mint Box */}

                    {!data.loading && data.totalSupply && data.totalSupply < id ?
                        <div className="metaportal_fn_mintbox">
                            <div className="mint_left">
                                <div className="mint_title">
                                    <span>Public Mint is Live</span>
                                </div>
                                <div className="mint_list">
                                    <ul>
                                        <li>
                                            <div className="item">
                                                <h4>Total Price</h4>
                                                <h3>
                                                    {nft && (
                                                        <span className="total_price">
                            {(Number(nft.price)).toFixed(
                                2
                            )}
                          </span>
                                                    )}
                                                    ETH + GAS
                                                </h3>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mint_desc">
                                    {!feedback ?
                                        <a rel="noreferrer"
                                        className="metaportal_fn_button"
                                        onClick={() => claimNFTs()}
                                        >
                                        <span>Mint Now</span>

                                    {
                                        claimingNft ?
                                        <span>Loading ...</span>

                                        : ''
                                    }
                                        </a>
                                        : feedback }

                                    <p>
                                        By clicking “MINT NOW” button, you agree to our{" "}
                                        <a href="#">Terms of Service</a> and our{" "}
                                        <a href="#">Privacy Policy</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                        : ''}
                    {/* !Mint Box */}

                    {/* Similar Items */}
                    <div className="metaportal_fn_similar">
                        <h3 className="fn__maintitle" data-text="Similar Items">
                            Similar Items
                        </h3>

                        <div className="fn_cs_divider">
                            <div className="divider">
                                <span/>
                                <span/>
                            </div>
                        </div>

                        <div className="metaportal_fn_drops">
                            <ul className="grid">
                                {nfts &&
                                    similarItem.map(
                                        (nft, i) =>
                                            nft.id < 8 && (
                                                <li key={nft.id}>
                                                    <div className="nft__item">
                                                        <div className="img_holder">
                                                            <img src={nft.image} alt=""/>
                                                            <Link href={`/nft/${nft.id}`}>
                                                                <a className="full_link"></a>
                                                            </Link>
                                                        </div>
                                                        <div className="title_holder">
                                                            <h3 className="fn_title">
                                                                <a href="#">{nft.title}</a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                    )}
                            </ul>
                        </div>
                    </div>
                    {/* !Similar Items */}
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    nft: state.nfts.nft,
    nfts: state.nfts.data,
});

export default connect(mapStateToProps, {getSingleNft, getNfts})(Nft);
