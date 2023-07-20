import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const debug_traceCall = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "debug_traceCall",
      params: [{
        from: process.env.ETH_TO,
        gas: process.env.TRACE_GAS,
        gasPrice: process.env.GAS_PRICE,
        value: "0x0",
        nonce: "0x1",
        input: process.env.TRACE_CALL_INPUT
      }, "latest", {}],
    },
  });

export default debug_traceCall;
