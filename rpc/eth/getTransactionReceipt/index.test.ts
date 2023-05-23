import { describe } from "@jest/globals";
import eth_getTransactionReceipt from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getTransactionReceipt", () => {
  it("Returns the receipt of a transaction by transaction hash.", async () => {
    evaluateResponse(await eth_getTransactionReceipt());
  });
});
