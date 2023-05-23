import { describe } from "@jest/globals";
import eth_accounts from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_accounts", () => {
  it("Returns a list of addresses owned by client.", async () => {
    evaluateResponse(await eth_accounts());
  });
});
