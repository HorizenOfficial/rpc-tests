import { describe, expect, } from "@jest/globals";
import eth_getBalance from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_getBalance", () => {
  it("returns the balance of the account of given address", async () => {
    const { jsonrpc, id, result } = await eth_getBalance();
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
