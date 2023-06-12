import { describe } from "@jest/globals";
import txpool_status from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("txpool_status", () => {
  it("The status inspection property can be queried to know how many transactions are currently pending for inclusion in the next block(s), and how many are being scheduled for future execution. The result is an object with two fields pending and queued.", async () => {
    evaluateResponse({
      response: await txpool_status(), 
      pattern: null,
    });
  });
});
