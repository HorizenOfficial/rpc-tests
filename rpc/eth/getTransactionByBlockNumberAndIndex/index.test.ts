import { describe } from "@jest/globals";
import eth_getTransactionByBlockNumberAndIndex from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getTransactionByBlockNumberAndIndex", () => {
  it("Returns information about a transaction by block number and transaction index position.", async () => {
    evaluateResponse(await eth_getTransactionByBlockNumberAndIndex());
  });
});
