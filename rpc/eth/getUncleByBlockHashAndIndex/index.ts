import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getUncleByBlockHashAndIndex = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getUncleByBlockHashAndIndex",
      params: [process.env.BLOCK_HASH, "0x0"],
    },
  });

export default eth_getUncleByBlockHashAndIndex;
