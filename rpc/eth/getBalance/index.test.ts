import { describe } from "@jest/globals";
import eth_getBalance from "./index";
import evaluateResponse from "../../../utils/evaluateResult";

describe("eth_getBalance", () => {
  it("Returns the balance of the account of given address.", async () => {
    evaluateResponse(await eth_getBalance());
  });
});
