import { describe } from "@jest/globals";
import eth_getBlockByNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getBlockByNumber", () => {
  it("Returns information about a block by number.", async () => {
    evaluateResponse(await eth_getBlockByNumber());
  });
});
