import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getLogs = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getLogs",
      params: [{
        fromBlock: process.env.FROM_BLOCK,
        toBlock: process.env.TO_BLOCK,
        address: process.env.SMART_CONTRACT_ADDRESS
      }],
    },
  });

export default eth_getLogs;
