import { describe } from "@jest/globals";
import debug_traceCall from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("debug_traceCall", () => {
  it(`
    Lets you run an eth_call within the context of the given block execution 
    using the final state of parent block as the base.
    `, async () => {
    evaluateResponse({
      response: await debug_traceCall(), 
      pattern: null,
    });
  });
});
