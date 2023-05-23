import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getBalance = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getBalance",
      params: ["0xB0B376f61da13a3295190699a24CbC5201165430"],
    },
  });

export default eth_getBalance;
