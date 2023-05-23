import { describe, expect, } from "@jest/globals";
import eth_call from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_call", () => {
  it("executes a new message call immediately without creating a transaction on the block chain.", async () => {
    const { jsonrpc, id, result } = await eth_call();
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
