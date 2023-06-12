import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const web3_sha3 = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "web3_sha3",
      params: ["0x10FEDe72EEd94284B8Aa7002A8D46b347D83B91B"],
    },
  });

export default web3_sha3;
