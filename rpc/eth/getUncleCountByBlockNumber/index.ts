import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getUncleCountByBlockNumber = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getUncleCountByBlockNumber",
      params: [192627],
    },
  });

export default eth_getUncleCountByBlockNumber;
