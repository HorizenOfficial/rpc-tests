import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";

const getBalance = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: ["0x024C75b76b5c82D23729a4e34F822fEC63A4f092"],
    },
  });

export default getBalance;
