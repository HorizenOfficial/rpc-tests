import { describe } from "@jest/globals";
import eth_getTransactionByBlockHashAndIndex from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getTransactionByBlockHashAndIndex", () => {
  it("Returns information about a transaction by block hash and transaction index position.", async () => {
    evaluateResponse({
      response: await eth_getTransactionByBlockHashAndIndex(), 
      pattern: await patternGenerator.buildMainPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/transaction.yaml",
        rpcName: "eth_getTransactionByBlockHashAndIndex",
      }),
    });
  });
});
