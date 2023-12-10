// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import {fetchData} from "../data/dataActions";

const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    };
};

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    };
};

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    };
};

const updateAccountRequest = (payload) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload,
    };
};

const totalSupply = (payload) => {
    return {
        type: "TOTAL_SUPPLY",
        payload: payload,
    };
};

export const updateTotalSupply = (account) => {
    return async (dispatch) => {
        const {dogSmartContract, referralSmartContract, web3} = await getSmartContracts()

        // dispatch(updateAccountRequest({
        //     account: account,
        //     smartContract: dogSmartContract,
        //     referralContract: referralSmartContract,
        //     web3
        //
        // }));
        dispatch(connectWallet());
        dispatch(fetchData(account));
    };
};

export const connectWallet = () => {
    return async (dispatch) => {
        dispatch(connectRequest());
        const abiResponse = await fetch("/config/abi.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const referralAbiResponse = await fetch("/config/referral-abi.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const abi = await abiResponse.json();
        const referralAbi = await referralAbiResponse.json();
        const configResponse = await fetch("/config/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const CONFIG = await configResponse.json();
        const {ethereum} = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;

        if (metamaskIsInstalled) {
            Web3EthContract.setProvider(ethereum);
            let web3 = new Web3(ethereum);

            try {

                await ethereum.request({
                    method: "eth_requestAccounts",
                })

                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });


                const networkId = await ethereum.request({
                    method: "net_version",
                });

                if (networkId == CONFIG.NETWORK.ID) {
                    const SmartContractObj = new Web3EthContract(
                        abi,
                        CONFIG.COLLECTIONS[0].CONTRACT_ADDRESS
                    );
                    const ReferralContractObj = new Web3EthContract(
                        referralAbi,
                        CONFIG.COLLECTIONS[1].CONTRACT_ADDRESS
                    );
                    dispatch(
                        connectSuccess({
                            account: accounts[0],
                            smartContract: SmartContractObj,
                            referralContract: ReferralContractObj,
                            web3: web3
                        })
                    );
                    // Add listeners start
                    ethereum.on("accountsChanged", (accounts) => {
                        dispatch(updateAccount(accounts[0]));
                    });
                    ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });
                    // Add listeners end
                } else {
                    dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
                }
            } catch (err) {
                console.log(err)
                dispatch(connectFailed("Something went wrong."));
            }
        } else {
            dispatch(connectFailed("Install Metamask."));
        }
    };
};

export const updateAccount = (account) => {
    return async (dispatch) => {
        const {dogSmartContract, referralSmartContract, web3} = await getSmartContracts()

        // dispatch(updateAccountRequest({
        //     account: account,
        //     smartContract: dogSmartContract,
        //     referralContract: referralSmartContract,
        //     web3
        //
        // }));
        dispatch(connectWallet());
        dispatch(fetchData(account));
    };
};


const getSmartContracts = async () => {
    const abiResponse = await fetch("/config/abi.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    const referralAbiResponse = await fetch("/config/referral-abi.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    const abi = await abiResponse.json();
    const referralAbi = await referralAbiResponse.json();

    const configResponse = await fetch("/config/config.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    const CONFIG = await configResponse.json();

    const SmartContractObj = new Web3EthContract(
        abi,
        CONFIG.COLLECTIONS[0].CONTRACT_ADDRESS
    );
    const ReferralContractObj = new Web3EthContract(
        referralAbi,
        CONFIG.COLLECTIONS[1].CONTRACT_ADDRESS
    );

    const {ethereum} = window;

    Web3EthContract.setProvider(ethereum);

    let web3 = new Web3(ethereum);

    return {
        dogSmartContract: SmartContractObj,
        referralSmartContract: ReferralContractObj,
        web3
    }
}
