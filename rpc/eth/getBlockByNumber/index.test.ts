import { describe, expect, } from "@jest/globals";
import eth_getBlockByNumber from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_getBlockByNumber", () => {
  it("Returns information about a block by number.", async () => {
    const { jsonrpc, id, result } = await eth_getBlockByNumber();
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
