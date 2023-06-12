import { describe } from "@jest/globals";
import zen_getFeePayments from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("zen_getFeePayments", () => {
  it("Returns the list of the forger rewards (recipients and values) distributed at the specified block.", async () => {
    const schema = await patternGenerator.getSchema();
    evaluateResponse({
      response: await zen_getFeePayments(), 
      pattern: {
        forwardTransfers: [{
          to: new RegExp(schema.address.pattern),
          value: new RegExp(schema.uint.pattern),
        }],
      },
    });
  });
});
