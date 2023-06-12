import { describe } from "@jest/globals";
import net_peerCount from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("net_peerCount", () => {
  it("Returns number of peers currently connected to the client.", async () => {
    const schema = await patternGenerator.getSchema();
    evaluateResponse({
      response: await net_peerCount(), 
      pattern: new RegExp(schema.uint.pattern),
    });
  });
});
