import { describe } from "@jest/globals";
import eth_getUncleCountByBlockHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getUncleCountByBlockHash", () => {
  it("Returns the number of uncles in a block from a block matching the given block hash.", async () => {
    evaluateResponse(await eth_getUncleCountByBlockHash());
  });
});
