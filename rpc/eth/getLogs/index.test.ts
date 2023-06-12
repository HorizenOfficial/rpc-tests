import { describe } from "@jest/globals";
import eth_getLogs from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getLogs", () => {
  it("Returns the balance of the account of given address.", async () => {
    evaluateResponse({
      response: await eth_getLogs(), 
      pattern: null,
    });
  });
});
