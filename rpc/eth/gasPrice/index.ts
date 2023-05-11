import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";

const gasPrice = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_gasPrice",
    },
  });

export default gasPrice;
