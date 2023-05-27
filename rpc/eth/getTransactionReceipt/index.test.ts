import { describe } from "@jest/globals";
import eth_getTransactionReceipt from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getTransactionReceipt", () => {
  it("Returns the receipt of a transaction by transaction hash.", async () => {
    evaluateResponse({
      response: await eth_getTransactionReceipt(),
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/state.yaml",
        rpcName: "eth_getTransactionReceipt",
      }),
    });
  });
});
