import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_chainId = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_chainId",
      params: [],
    },
  });

export default eth_chainId;
