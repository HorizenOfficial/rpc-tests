import { describe } from "@jest/globals";
import eth_getTransactionByBlockHashAndIndex from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getTransactionByBlockHashAndIndex", () => {
  it("Returns information about a transaction by block hash and transaction index position.", async () => {
    evaluateResponse(await eth_getTransactionByBlockHashAndIndex());
  });
});
