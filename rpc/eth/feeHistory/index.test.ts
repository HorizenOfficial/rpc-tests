import { describe } from "@jest/globals";
import eth_feeHistory from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_feeHistory", () => {
  it("Transaction fee history", async () => {
    evaluateResponse(await eth_feeHistory());
  });
});
