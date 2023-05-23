import { describe } from "@jest/globals";
import eth_getBlockTransactionCountByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getBlockTransactionCountByHash", () => {
  it("Returns the number of transactions in a block from a block matching the given block hash.", async () => {
    evaluateResponse(await eth_getBlockTransactionCountByHash());
  });
});
