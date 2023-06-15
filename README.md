# Test suite for the EON node RPC interface

Untested:

These methods require an account with _zen_ and it will need to make use of a javascript library such as [web3.js](https://github.com/web3/web3.js) to build, sign, and send transactions:

- eth_sendTransaction
- eth_sendRawTransaction
- eth_sign

## Installation

Issue the following commands:

    git clone git@github.com:HorizenOfficial/rpc-tests.git;
    cd rpc-tests;
    git submodule add --force git@github.com:ethereum/execution-apis.git;
    git submodule update --init;
    npm install;
    cp .env.local.example .env;

### Running the tests

To run the tests, simply issue:

    npm run test;

### Running test for a specific namespace

You can run tests for a specific RPC namespace such as `rpc/eth` by issuing the following command:

    npm run test rpc/eth

### Running test for a specific RPC method

You can run tests for a specific RPC method such as `rpc/eth/feeHistory` by issuing the following command:

    npm run test rpc/eth/feeHistory

Have a look at the `rpc/eth` directory for the list of supported RPC methods that can be tested.

### Modifying the test parameters

You can modify the test parameters and use your own values by modifying the `options.params` property. For example for the `rpc/eth/getBlockByHash` method, you will add your parameters like so:

    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getBlockByHash",
      params: ["0x4a390501c77e6f943a4f8cf69e4c76b426918f357583257df89878a8ef2caa39", true], // add parameters here
    },