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
        fromBlock: "0x34db3", 
        toBlock: "0x34db4", 
        address: "0xce695db1e37142a47108cf8019b63236f3298020"
      }],
    },
  });

export default eth_getLogs;
