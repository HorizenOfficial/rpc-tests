import { describe } from "@jest/globals";
import eth_getTransactionByHash from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getTransactionByHash", () => {
  it("Returns the information about a transaction requested by transaction hash.", async () => {
    evaluateResponse({
      response: await eth_getTransactionByHash(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/transaction.yaml",
        rpcName: "eth_getTransactionByHash",
      }),
    });
  });
});
