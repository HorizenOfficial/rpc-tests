import { describe } from "@jest/globals";
import eth_getBlockByNumber from "./index";
import evaluateResponse from "../../../utils/evaluateResponse";
import { baseTypePatterns } from "../../../utils/baseTypePatterns";

describe("eth_getBlockByNumber", () => {
  it("Returns information about a block by number.", async () => {
    evaluateResponse({
      response: await eth_getBlockByNumber(),
      pattern: {
        parentHash: baseTypePatterns.hash32,
        sha3Uncles: baseTypePatterns.hash32,
        miner: baseTypePatterns.address,
        stateRoot: baseTypePatterns.bytes32,
        transactionsRoot: baseTypePatterns.hash32,
        receiptsRoot: baseTypePatterns.hash32,
        logsBloom: baseTypePatterns.bytes256,
        difficulty: baseTypePatterns.bytes,
        number: baseTypePatterns.uint,
        hash: baseTypePatterns.hash32,
        gasLimit: baseTypePatterns.uint,
        gasUsed: baseTypePatterns.uint,
        timestamp: baseTypePatterns.uint,
        extraData: baseTypePatterns.bytes,
        mixHash: baseTypePatterns.hash32,
        nonce: baseTypePatterns.bytes8,
        totalDifficulty: baseTypePatterns.uint,
        baseFeePerGas: baseTypePatterns.uint,
        withdrawalsRoot: baseTypePatterns.hash32,
        size: baseTypePatterns.uint,
        uncles: [baseTypePatterns.bytes32],
        withdrawals: [{
          index: baseTypePatterns.uint64,
          validatorIndex: baseTypePatterns.uint64,
          address: baseTypePatterns.address,
          amount: baseTypePatterns.uint256,
        }],
        transactions: [{
          blockHash: baseTypePatterns.hash32,
          blockNumber: baseTypePatterns.uint,
          transactionIndex: baseTypePatterns.uint,
          hash: baseTypePatterns.hash32,
          type: baseTypePatterns.byte,
          nonce: baseTypePatterns.uint,
          from: baseTypePatterns.address,
          to: baseTypePatterns.address,
          gas: baseTypePatterns.uint,
          value: baseTypePatterns.uint,
          input: baseTypePatterns.bytes,
          gasPrice: baseTypePatterns.uint,
          maxPriorityFeePerGas: baseTypePatterns.uint,
          maxFeePerGas: baseTypePatterns.uint,
          chainId: baseTypePatterns.uint,
          yParity: baseTypePatterns.uint,
          r: baseTypePatterns.uint,
          s: baseTypePatterns.uint,
          v: baseTypePatterns.uint,
          accessList: [{
            address: baseTypePatterns.address,
            storageKeys: [baseTypePatterns.bytes32]
          }]
        }],
      }
    });
  });
});
