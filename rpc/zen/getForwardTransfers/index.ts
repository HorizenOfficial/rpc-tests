import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const zen_getForwardTransfers = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "zen_getForwardTransfers",
      params: [process.env.FORWARD_TRANSFER]
    },
  });

export default zen_getForwardTransfers;
