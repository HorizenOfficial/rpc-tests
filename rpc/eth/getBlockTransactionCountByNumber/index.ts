import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getBlockTransactionCountByNumber = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getBlockTransactionCountByNumber",
      params: [33414],
    },
  });

export default eth_getBlockTransactionCountByNumber;
