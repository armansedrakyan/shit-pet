import { GET_DATA, GET_SINGLE_NFT } from "../actions/type";

const referral = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DATA:
      return {
        ...state,
        data: payload,
      };
    case GET_SINGLE_NFT:
      return {
        ...state,
        nft: payload,
      };

    default:
      return state;
  }
};
export default referral;
