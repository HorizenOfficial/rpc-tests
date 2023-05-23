import { describe } from "@jest/globals";
import eth_getStorageAt from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_getStorageAt", () => {
  it("Returns the value from a storage position at a given address.", async () => {
    evaluateResponse(await eth_getStorageAt());
  });
});
