import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const debug_traceBlockByNumber = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "debug_traceBlockByNumber",
      params: [process.env.BLOCK_NUMBER, {}],
    },
  });

export default debug_traceBlockByNumber;
