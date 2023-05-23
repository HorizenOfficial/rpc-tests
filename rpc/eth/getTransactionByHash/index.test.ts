import { describe } from "@jest/globals";
import eth_getTransactionByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getTransactionByHash", () => {
  it("Returns the information about a transaction requested by transaction hash.", async () => {
    evaluateResponse(await eth_getTransactionByHash());
  });
});
