import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getTransactionByBlockNumberAndIndex = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getTransactionByBlockNumberAndIndex",
      params: [process.env.BLOCK_NUMBER, "0x0"],
    },
  });

export default eth_getTransactionByBlockNumberAndIndex;
