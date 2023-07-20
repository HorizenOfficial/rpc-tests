import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_call = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_call",
      params:[{
        from: process.env.ETH_FROM,
        to: process.env.ETH_TO,
        gas: process.env.GAS,
        gasPrice: process.env.GAS_PRICE,
        value: process.env.VALUE,
        data: process.env.DATA,
      }, "latest"],
    },
  });

export default eth_call;
