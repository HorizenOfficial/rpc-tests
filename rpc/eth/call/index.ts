import fetchAPI from "../../../utils/fetchAPI";
import { JSONRPC } from "../../../utils/types";
import fixtures from "../../../fixtures";

const eth_call = async ():
  Promise<JSONRPC> => await fetchAPI({
    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_call",
      params:[{
        from: "0xe33693548d5849845c9915342ac8ad932a4b2f36",
        to: "0x3d5f994c679244b3230d8c884f67752ff94e7aa5",
        gas: "0x38270",
        gasPrice: "0x35a4e900",
        value: "0x64",
        data: "0xbae0258ea212ab6411be224a8f1b3e169c9b3cd04a2b9bcabe0488a3f640a2fa",
      }, "latest"],
    },
  });

export default eth_call;
