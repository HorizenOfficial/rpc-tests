import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const debug_traceBlockByHash = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "debug_traceBlockByHash",
      params: [process.env.BLOCK_HASH, {}],
    },
  });

export default debug_traceBlockByHash;
