import { describe, expect, } from "@jest/globals";
import getBalance from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_getBalance", () => {
  it("returns the balance of the account of given address", async () => {
    const { jsonrpc, id, result } = await getBalance();
    
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
