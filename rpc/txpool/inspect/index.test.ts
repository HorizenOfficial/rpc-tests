import { describe } from "@jest/globals";
import txpool_inspect from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("txpool_inspect", () => {
  // This is a method specifically tailored to developers to quickly see the transactions in the pool 
  // and find any potential issues. The result is an object with two fields pending and queued. 
  // Each of these fields are associative arrays, in which each entry maps an origin-address to a batch of scheduled transactions.
  // These batches themselves are maps associating nonces with transactions summary strings. Please note, there may be 
  // multiple transactions associated with the same account and nonce. This can happen if the user broadcast mutliple ones 
  // with varying gas allowances (or even completely different transactions).
  it("Returns a textual summary of all the transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future execution only.", async () => {
    evaluateResponse({
      response: await txpool_inspect(), 
      pattern: null,
    });
  });
});
