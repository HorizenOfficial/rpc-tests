import { describe } from "@jest/globals";
import zen_getForwardTransfers from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("zen_getForwardTransfers", () => {
  it("Returns the list of Forward Transfers (Zen coming from the Horizen Mainchain) at a specified block.", async () => {
    const schema = await patternGenerator.getSchema();
    evaluateResponse({
      response: await zen_getForwardTransfers(), 
      pattern: {
        forwardTransfers: [{
          to: new RegExp(schema.address.pattern),
          value: new RegExp(schema.uint.pattern),
        }],
      },
    });
  });
});
