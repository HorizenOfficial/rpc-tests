import { describe } from "@jest/globals";
import eth_getCode from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_getCode", () => {
  it("Returns code at a given address.", async () => {
    evaluateResponse({
      response: await eth_getCode(),
      pattern: await patternGenerator.buildStringPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/state.yaml",
        rpcName: "eth_getCode",
      }),
    });
  });
});
