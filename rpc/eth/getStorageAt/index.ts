import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getStorageAt = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getStorageAt",
      params: ["0x2054ccE26be7B305dDA11d16E87a535258cD018E", "0x1", "latest"],
    },
  });

export default eth_getStorageAt;
