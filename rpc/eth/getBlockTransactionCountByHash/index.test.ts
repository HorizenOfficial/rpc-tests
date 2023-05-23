import { describe, expect, } from "@jest/globals";
import eth_getBlockTransactionCountByHash from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_getBlockTransactionCountByHash", () => {
  it("Returns the number of transactions in a block from a block matching the given block hash.", async () => {
    const { jsonrpc, id, result } = await eth_getBlockTransactionCountByHash();
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
