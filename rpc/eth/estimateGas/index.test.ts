import { describe } from "@jest/globals";
import eth_estimateGas from "./index";
import evaluateResponse from "../../../utils/evaluateResult";

describe("eth_estimateGas", () => {
  it("Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.", async () => {
    evaluateResponse(await eth_estimateGas());
  });
});
