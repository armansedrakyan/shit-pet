const initialState = {
  loading: false,
  account: null,
  smartContract: null,
  referralContract: null,
  web3: null,
  errorMsg: "",
  totalSupply: 0
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":

      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        referralContract:action.payload.referralContract,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
        smartContract: action.payload.smartContract,
        referralContract:action.payload.referralContract,
        web3: action.payload.web3,
      };
      case "TOTAL_SUPPLY":
      return {
        ...state,
        totalSupply: action.payload.totalSupply,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
