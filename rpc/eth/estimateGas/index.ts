import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_estimateGas = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_estimateGas",
      params: [{
        from: process.env.ETH_FROM,
        to: process.env.ETH_TO,
        value: process.env.VALUE,
      }],
    },
  });

export default eth_estimateGas;
