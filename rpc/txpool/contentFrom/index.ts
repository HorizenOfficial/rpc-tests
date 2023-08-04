import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const txpool_contentFrom = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "txpool_contentFrom",
      params: [process.env.ETH_FROM]
    },
  });

export default txpool_contentFrom;
