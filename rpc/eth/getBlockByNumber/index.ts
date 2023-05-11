import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";

const getBlockByNumber = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_getBlockByNumber",
      params: [33414, true],
    },
  });

export default getBlockByNumber;
