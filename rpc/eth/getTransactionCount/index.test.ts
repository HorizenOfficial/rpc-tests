import { describe } from "@jest/globals";
import eth_getTransactionCount from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getTransactionCount", () => {
  it("Returns the number of transactions sent from an address.", async () => {
    evaluateResponse({
      response: await eth_getTransactionCount(),
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/state.yaml",
        rpcName: "eth_getTransactionCount",
      }),
    });
  });
});
