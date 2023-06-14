import { describe } from "@jest/globals";
import net_listening from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("net_listening", () => {
  it("Returns true if client is actively listening for network connections.", async () => {
    evaluateResponse({
      response: await net_listening(), 
      pattern: null,
    });
  });
});
