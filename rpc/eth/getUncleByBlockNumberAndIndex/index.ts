import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getUncleByBlockNumberAndIndex = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getUncleByBlockNumberAndIndex",
      params: [192633, "0x0"],
    },
  });

export default eth_getUncleByBlockNumberAndIndex;
