import { describe, expect, } from "@jest/globals";
import eth_blockNumber from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_blockNumber", () => {
  it("returns the number of the most recent block", async () => {
    const { jsonrpc, id, result } = await eth_blockNumber();
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
