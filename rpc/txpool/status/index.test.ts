import { describe } from "@jest/globals";
import txpool_status from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("txpool_status", () => {
  // The result is an object with two fields pending and queued.
  it("Returns the number of transactions that are currently pending for inclusion in the next block(s), and ones that are being scheduled for future execution.", async () => {
    evaluateResponse({
      response: await txpool_status(), 
      pattern: null,
    });
  });
});
