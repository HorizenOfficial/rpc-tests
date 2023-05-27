import { describe } from "@jest/globals";
import eth_getUncleByBlockNumberAndIndex from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getUncleByBlockNumberAndIndex", () => {
  it("Returns the uncle by block number and index.", async () => {
    evaluateResponse({
      response: await eth_getUncleByBlockNumberAndIndex(),
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/state.yaml",
        rpcName: "eth_getUncleByBlockNumberAndIndex",
      }),
    });
  });
});
