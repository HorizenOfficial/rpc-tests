import { describe } from "@jest/globals";
import eth_getBlockTransactionCountByNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import { baseTypePatterns } from "../../../utils/baseTypePatterns";

describe("eth_getBlockTransactionCountByNumber", () => {
  it("Returns the number of transactions in a block matching the given block number.", async () => {
    evaluateResponse({
      response: await eth_getBlockTransactionCountByNumber(),
      pattern: baseTypePatterns.uint,
    });
  });
});
