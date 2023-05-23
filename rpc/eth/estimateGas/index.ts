import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_estimateGas = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_estimateGas",
      params: [{
        from: "0x10FEDe72EEd94284B8Aa7002A8D46b347D83B91B",
        to: "0xd3CdA913deB6f67967B99D67aCDFa1712C293601",
        value: "0x186a0",
      }],
    },
  });

export default eth_estimateGas;
