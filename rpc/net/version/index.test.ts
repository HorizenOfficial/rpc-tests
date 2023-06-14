import { describe } from "@jest/globals";
import net_version from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("net_version", () => {
  it("Returns a list of addresses owned by client.", async () => {
    evaluateResponse({
      response: await net_version(), 
      pattern: null,
    });
  });
});
