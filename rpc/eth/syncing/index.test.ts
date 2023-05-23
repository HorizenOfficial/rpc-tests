import { describe } from "@jest/globals";
import eth_syncing from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("eth_syncing", () => {
  it("Returns an object with data about the sync status or false.", async () => {
    evaluateResponse(await eth_syncing());
  });
});
