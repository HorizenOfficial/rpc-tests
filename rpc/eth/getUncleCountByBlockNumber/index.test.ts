import { describe } from "@jest/globals";
import eth_getUncleCountByBlockNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getUncleCountByBlockNumber", () => {
  it("Returns the number of transactions in a block matching the given block number.", async () => {
    evaluateResponse(await eth_getUncleCountByBlockNumber());
  });
});
