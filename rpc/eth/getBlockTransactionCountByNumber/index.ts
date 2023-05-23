import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";

const eth_getBlockTransactionCountByNumber = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_getBlockTransactionCountByNumber",
      params: [33414],
    },
  });

export default eth_getBlockTransactionCountByNumber;
