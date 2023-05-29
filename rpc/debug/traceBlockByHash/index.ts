import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const debug_traceBlockByHash = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "debug_traceBlockByHash",
      params: ["0x33d2ffd2ff96dce5352e166f5dba9873ef8ee761df626bd998cb9f12b3de35a1", {}],
    },
  });

export default debug_traceBlockByHash;
