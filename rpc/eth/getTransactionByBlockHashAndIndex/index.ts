import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getTransactionByBlockHashAndIndex = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getTransactionByBlockHashAndIndex",
      params: ["0xd3a8160f362a2ca191fec47476ff318526e098bcc36ff4c02d2e6e42b2d681c4", "0x0"],
    },
  });

export default eth_getTransactionByBlockHashAndIndex;
