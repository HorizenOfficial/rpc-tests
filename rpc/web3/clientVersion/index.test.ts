import { describe } from "@jest/globals";
import web3_clientVersion from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("web3_clientVersion", () => {
  it("Returns the current client version.", async () => {
    evaluateResponse({
      response: await web3_clientVersion(), 
      pattern: null,
    });
  });
});
