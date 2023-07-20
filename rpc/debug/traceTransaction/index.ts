import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const debug_traceTransaction = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "debug_traceTransaction",
      params: [process.env.TX_HASH, {}],
    },
  });

export default debug_traceTransaction;
