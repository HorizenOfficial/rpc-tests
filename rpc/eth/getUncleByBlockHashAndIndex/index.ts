import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getUncleByBlockHashAndIndex = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getUncleByBlockHashAndIndex",
      params: ["0xeb761e44cc6138294066bd78dd623d5e8f2b9cff31e30f4858adc73df6e80d8d", "0x0"],
    },
  });

export default eth_getUncleByBlockHashAndIndex;
