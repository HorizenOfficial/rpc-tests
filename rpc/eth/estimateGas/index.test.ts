import { describe, expect, } from "@jest/globals";
import eth_estimateGas from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_estimateGas", () => {
  it("Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.", async () => {
    const { jsonrpc, id, result } = await eth_estimateGas();
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
