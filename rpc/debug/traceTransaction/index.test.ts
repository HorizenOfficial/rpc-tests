import { describe } from "@jest/globals";
import debug_traceTransaction from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("debug_traceTransaction", () => {
  it(`
    Attempts to run the transaction in the exact same manner as it was executed on the network.
    It will replay any transaction that may have been executed prior to this one before it will 
    finally attempt to execute the transaction that corresponds to the given hash.
    `, async () => {
    evaluateResponse({
      response: await debug_traceTransaction(), 
      pattern: null,
    });
  });
});
