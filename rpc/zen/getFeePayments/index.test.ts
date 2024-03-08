import { describe } from "@jest/globals";
import zen_getFeePayments from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("zen_getFeePayments", () => {
  it("Returns the list of the forger rewards (recipients and values) distributed at the specified block.", async () => {
    // TODO:  1.3.0 returns empty array instead of null, update this each time we deploy to an env and remove once live on EON.
    const expectNull = !(process.env.BLOCKSCOUT_API && process.env.BLOCKSCOUT_API.includes('gobi'))
    const schema = await patternGenerator.getSchema();
    evaluateResponse({
      response: await zen_getFeePayments(), 
      pattern: {
        forwardTransfers: [{
          to: new RegExp(schema.address.pattern),
          value: new RegExp(schema.uint.pattern),
        }],
      },
      expectNullResult: expectNull
    });
  });
});
