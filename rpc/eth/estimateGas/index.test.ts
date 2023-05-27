import { describe } from "@jest/globals";
import eth_estimateGas from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_estimateGas", () => {
  it("Generates and returns an estimate of how much gas is necessary to allow the transaction to complete.", async () => {
    evaluateResponse({
      response: await eth_estimateGas(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/execute.yaml",
        rpcName: "eth_estimateGas",
      }),
    });
  });
});
