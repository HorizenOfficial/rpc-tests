import { describe } from "@jest/globals";
import eth_getBalance from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getBalance", () => {
  it("Returns the balance of the account of given address.", async () => {
    evaluateResponse({
      response: await eth_getBalance(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/state.yaml",
        rpcName: "eth_getBalance",
      }),
    });
  });
});
