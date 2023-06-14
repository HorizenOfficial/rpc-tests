import { describe } from "@jest/globals";
import web3_sha3 from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";

describe("web3_sha3", () => {
  it("Returns Keccak-256 (not the standardized _SHA3_-256) hash of the given data.", async () => {
    evaluateResponse({
      response: await web3_sha3(), 
      pattern: null,
    });
  });
});
