# Test suite for the EON node RPC interface

Untested:

These methods require an account with _zen_ and it will need to make use of a javascript library such as [web3.js](https://github.com/web3/web3.js) to build, sign, and send transactions:

- eth_sendTransaction
- eth_sendRawTransaction
- eth_sign

## Installation

Issue the following commands in succession:

    git clone git@github.com:HorizenOfficial/rpc-tests.git
    cd rpc-tests
    git submodule update --init
    npm install
    cp .env.local.example .env

### Running the tests

To run the tests, simply issue:

    npm run test

### Running test only for specific namespace

You can run tests only for specific RPC namespace such as `rpc/eth` by issuing the following command:

    npm run test rpc/eth

### Running test only for specific RPC method

You can run tests only for specific RPC method such as as `rpc/eth/feeHistory` by issuing the following command:

    npm run test rpc/eth/feeHistory/index.test.ts

Have a look at the `rpc/eth` directory for the list of supported RPC methods that can be tested.

### Modifying the test parameters

You can modify the test parameters and use your own values by modifying the `options.params`. For example for `rpc/eth/blockNumber` method, you will perform your updates like so:

    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_blockNumber",
      params: [], // add your parameters inside this array
    },