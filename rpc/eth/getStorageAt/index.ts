import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getStorageAt = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getStorageAt",
      params: [process.env.SMART_CONTRACT_ADDRESS, "0x1", "latest"],
    },
  });

export default eth_getStorageAt;
