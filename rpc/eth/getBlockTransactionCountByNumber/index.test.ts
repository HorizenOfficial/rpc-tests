import { describe, expect, } from "@jest/globals";
import eth_getBlockTransactionCountByNumber from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_getBlockTransactionCountByNumber", () => {
  it("returns the number of transactions in a block matching the given block number", async () => {
    const { jsonrpc, id, result } = await eth_getBlockTransactionCountByNumber();
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
