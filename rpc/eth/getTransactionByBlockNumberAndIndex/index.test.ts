import { describe } from "@jest/globals";
import eth_getTransactionByBlockNumberAndIndex from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getTransactionByBlockNumberAndIndex", () => {
  it("Returns information about a transaction by block number and transaction index position.", async () => {
    evaluateResponse({
      response: await eth_getTransactionByBlockNumberAndIndex(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/transaction.yaml",
        rpcName: "eth_getTransactionByBlockNumberAndIndex",
      }),
    });
  });
});
