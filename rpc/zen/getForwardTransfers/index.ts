import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const zen_getForwardTransfers = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "zen_getForwardTransfers",
      params: ["0x19552"],
    },
  });

export default zen_getForwardTransfers;
