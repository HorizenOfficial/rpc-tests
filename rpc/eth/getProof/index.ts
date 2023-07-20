import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_getProof = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getProof",
      params: [
        process.env.SMART_CONTRACT_ADDRESS,
        ["0x0000000000000000000000000000000000000000000000000000000000000000"],
        "latest"
      ],
    },
  });

export default eth_getProof;
