import { describe } from "@jest/globals";
import eth_getBlockTransactionCountByNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResult";

describe("eth_getBlockTransactionCountByNumber", () => {
  it("Returns the number of transactions in a block matching the given block number.", async () => {
    evaluateResponse(await eth_getBlockTransactionCountByNumber());
  });
});
