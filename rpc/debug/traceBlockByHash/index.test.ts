import { describe } from "@jest/globals";
import debug_traceBlockByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("debug_traceBlockByHash", () => {
  it("Returns the full stack trace of all invoked opcodes of all transactions that were included in the specified block.", async () => {
    evaluateResponse({
      response: await debug_traceBlockByHash(), 
      pattern: null,
    });
  });
});
