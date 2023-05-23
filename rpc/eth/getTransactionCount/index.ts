import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getTransactionCount = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getTransactionCount",
      params: ["0x2054ccE26be7B305dDA11d16E87a535258cD018E"],
    },
  });

export default eth_getTransactionCount;
