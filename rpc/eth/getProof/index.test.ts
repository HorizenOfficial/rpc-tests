import { describe } from "@jest/globals";
import eth_getProof from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getProof", () => {
  it("Returns the merkle proof for a given account and optionally some storage keys.", async () => {
    evaluateResponse({
      response: await eth_getProof(), 
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/state.yaml",
        rpcName: "eth_getProof",
      }),
    });
  });
});
