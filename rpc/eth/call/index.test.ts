import { describe } from "@jest/globals";
import eth_call from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_call", () => {
  it("Executes a new message call immediately without creating a transaction on the blockchain.", async () => {
    evaluateResponse({
      response: await eth_call(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/execute.yaml",
        rpcName: "eth_call",
      }),
    });
  });
});
