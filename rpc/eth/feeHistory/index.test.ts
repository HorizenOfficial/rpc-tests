import { describe } from "@jest/globals";
import eth_feeHistory from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_feeHistory", () => {
  it("Transaction fee history", async () => {
    evaluateResponse({
      response: await eth_feeHistory(),
      pattern: await patternGenerator.buildObjectPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/fee_market.yaml",
        rpcName: "eth_feeHistory",
      }),
    });
  });
});
