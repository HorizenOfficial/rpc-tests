import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getTransactionByBlockHashAndIndex = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getTransactionByBlockHashAndIndex",
      params: [process.env.BLOCK_HASH, "0x0"],
    },
  });

export default eth_getTransactionByBlockHashAndIndex;
