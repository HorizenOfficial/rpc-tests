import { describe } from "@jest/globals";
import debug_traceBlockByNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("debug_traceBlockByNumber", () => {
  it("Returns the full stack trace of all invoked opcodes of all transactions that were included in the specified block.", async () => {
    evaluateResponse({
      response: await debug_traceBlockByNumber(), 
      pattern: null,
    });
  });
});
