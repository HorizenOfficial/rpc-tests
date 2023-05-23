import { describe } from "@jest/globals";
import eth_getTransactionCount from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getTransactionCount", () => {
  it("Returns the number of transactions sent from an address.", async () => {
    evaluateResponse(await eth_getTransactionCount());
  });
});
