import { describe, expect, } from "@jest/globals";
import blockNumber from "./index";

describe("eth_blockNumber", () => {
  it("returns the number of the most recent block", async () => {
    const { jsonrpc, id, result } = await blockNumber();

    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    expect(result).toMatch(/^0x([1-9a-f]+[0-9a-f]*|0)$/);
  });
});
