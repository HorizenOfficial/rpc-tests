import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const zen_getFeePayments = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "zen_getFeePayments",
      params: [process.env.BLOCK_NUMBER]
    },
  });

export default zen_getFeePayments;
