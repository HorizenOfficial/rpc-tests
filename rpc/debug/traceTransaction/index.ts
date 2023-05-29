import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const debug_traceTransaction = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "debug_traceTransaction",
      params: ["0x5d094d1a3bcd65eb8955a66ef8554f106400779934aa6d94a68bd6043f19415d", {}],
    },
  });

export default debug_traceTransaction;
