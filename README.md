# Test suite for EVM node RPC interface

Untested:

- eth_sendTransaction
- eth_sign

## Installation

Issue the following commands:

    git clone git@github.com:HorizenOfficial/rpc-tests.git;
    cd rpc-tests;


    git submodule add --force git@github.com:ethereum/execution-apis.git;
    git submodule update --init;
    npm install;
    cp .env.gobi .env;

### Adding new environment

Create a new .env file in named in the format:

    .env.myenvironment

Add all required values, see existing the existing env.template

### Running the tests

To run the tests, ensure a .env file exists that matches the TEST_ENV passed in e.g. for `.env.local`:

    TEST_ENV=local npm run test

- This will search for a file called .env.local, and it will run everything apart from the transaction and debug tests.

### Running with Docker

    docker build -t rpc-tests .
    docker run -v $(pwd)/reports:/usr/src/app/reports -e TEST_ENV=gobi rpc-tests npm run test

### Running Custom Tests

If your EVM nodes have custom endpoints (e.g. like the zen ones), ensure they are in the `rpc/custom` directory and add them as comma separated values to `CUSTOM_RPC_TESTS`:

    TEST_ENV=local CUSTOM_RPC_TESTS=zen,another npm test

### Running test for a specific namespace

You can run tests for a specific RPC namespace such as `rpc/eth` by issuing the following command:

    TEST_ENV=local npm run test rpc/eth;

### Running test for a specific RPC method

You can run tests for a specific RPC method such as `rpc/eth/feeHistory` by issuing the following command:

    npm run test rpc/eth/feeHistory

Have a look at the `rpc/eth` directory for the list of supported RPC methods that can be tested.

### debug_* calls

These tests require basic auth username and password to be set:

    RPC_USERNAME=
    RPC_PASSWORD=

And can be included in the test run by setting `ENABLE_DEBUG_TESTS` to `true`:

    TEST_ENV=local ENABLE_DEBUG_TESTS=true npm run test

### Transaction Tests

These tests require adding 2 Private Keys (PKs) of the sending wallets as environment variables:

    SEND_FROM_PK=
    SEND_FROM_PK2=

This should not be committed.  We use multiple wallets so that nonce values are not confused during parallel testing.

To run EOA to EOA test `ENABLE_TRANSACTION_TESTS` must be set to `true`:

    TEST_ENV=local ENABLE_TRANSACTION_TESTS=true npm run test rpc/transactions/eoa

### Using recent data from block explorers

There is one example test in `getTransactionByHash` that uses `BLOCKSCOUT_API` to retrieve a recent transaction.

### Modifying the test parameters

You can modify the test parameters and use your own values by modifying the `options.params` property. For example for the `rpc/eth/getBlockByHash` method, you will add your parameters like so:

    options: {
      id: fixtures.id,
      jsonrpc: fixtures.jsonrpc,
      method: "eth_getBlockByHash",
      params: ["0x4a390501c77e6f943a4f8cf69e4c76b426918f357583257df89878a8ef2caa39", true], // add parameters here
    },