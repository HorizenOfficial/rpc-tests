import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";

const eth_getBlockTransactionCountByHash = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_getBlockTransactionCountByHash",
      params: ["0xef4c45f27c708c46daf9887150d8ee4f771ef79f863e252e450842cb365a0071"],
    },
  });

export default eth_getBlockTransactionCountByHash;
