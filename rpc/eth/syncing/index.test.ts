import { describe } from "@jest/globals";
import eth_syncing from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import patternGenerator from "../../../utils/patternGenerator";

describe("eth_syncing", () => {
  it("Returns an object with data about the sync status or false.", async () => {
    evaluateResponse({
      response: await eth_syncing(),
      pattern: await patternGenerator.buildMainPattern({
        rpcDefinitionPath: "../execution-apis/src/eth/client.yaml",
        rpcName: "eth_syncing",
      }),
    });
  });
});
