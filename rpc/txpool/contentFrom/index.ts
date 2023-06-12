import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const txpool_contentFrom = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "txpool_contentFrom",
      params: ["0xA8416AbBf1291a0aF73B4B3852C44284e7Bb5cca"],
    },
  });

export default txpool_contentFrom;
