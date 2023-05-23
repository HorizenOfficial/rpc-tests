import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getTransactionByHash = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getTransactionByHash",
      params: ["0xcf72cfc4361966310bcc0e62da49fe71c14a0e4668a21fa0c821500607f9f295"],
    },
  });

export default eth_getTransactionByHash;
