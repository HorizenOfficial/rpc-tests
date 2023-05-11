import { describe, expect, } from "@jest/globals";
import gasPrice from "./index";
import baseTypes from "../../../utils/baseTypes";

describe("eth_gasPrice", () => {
  it("returns the current price per gas in wei", async () => {
    const { jsonrpc, id, result } = await gasPrice();
    
    expect(jsonrpc).toBe("2.0");
    expect(id).toBe(1);
    expect(result).toMatch(baseTypes.uint.pattern);
  });
});
