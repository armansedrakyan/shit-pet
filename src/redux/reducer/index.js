import {combineReducers} from "redux";
import nfts from "./nfts";
import site from "./siteSettings";
import blockchainReducer from "../blockchain/blockchainReducer";
import dataReducer from "../data/dataReducer";
import referral from "./referral";

export default combineReducers({nfts, site, blockchain: blockchainReducer, data: dataReducer, referral: referral});
