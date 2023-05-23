import { describe, expect, } from "@jest/globals";
import eth_getBlockByHash from "./index";
import evaluateResult from "../../../utils/evaluateResult";

describe("eth_getBlockByHash", () => {
  it("returns information about a block by hash", async () => {
    const { jsonrpc, id, result } = await eth_getBlockByHash();
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    evaluateResult(result);
  });
});
