import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getBlockTransactionCountByHash = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getBlockTransactionCountByHash",
      params: ["0xef4c45f27c708c46daf9887150d8ee4f771ef79f863e252e450842cb365a0071"],
    },
  });

export default eth_getBlockTransactionCountByHash;
