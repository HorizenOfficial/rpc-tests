import { describe } from "@jest/globals";
import eth_getBlockTransactionCountByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import { baseTypePatterns } from "../../../utils/baseTypePatterns";

describe("eth_getBlockTransactionCountByHash", () => {
  it("Returns the number of transactions in a block from a block matching the given block hash.", async () => {
    evaluateResponse({
      response: await eth_getBlockTransactionCountByHash(),
      pattern: baseTypePatterns.uint,
    });
  });
});
