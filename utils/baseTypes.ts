const baseTypes = {
  address: {
    title: "hex encoded address",
    pattern: /^0x[0-9,a-f,A-F]{40}$/,
  },
  byte: {
    title: "hex encoded byte",
    pattern: /^0x([0-9,a-f,A-F]?){1,2}$/,
  },
  bytes: {
    title: "hex encoded bytes",
    pattern: /^0x[0-9a-f]*$/,
  },
  bytesMax32: {
    title: "32 hex encoded bytes",
    pattern: /^0x[0-9a-f]{0,64}$/,
  },
  bytes8: {
    title: "8 hex encoded bytes",
    pattern: /^0x[0-9a-f]{16}$/,
  },
  bytes32: {
    title: "32 hex encoded bytes",
    pattern: /^0x[0-9a-f]{64}$/,
  },
  bytes256: {
    title: "256 hex encoded bytes",
    pattern: /^0x[0-9a-f]{512}$/,
  },
  bytes65: {
    title: "65 hex encoded bytes",
    pattern: /^0x[0-9a-f]{65}$/,
  },
  uint: {
    title: "hex encoded unsigned integer",
    pattern: /^0x([1-9a-f]+[0-9a-f]*|0)$/,
  },
  uint64: {
    title: "hex encoded 64 bit unsigned integer",
    pattern: /^0x([1-9a-f]+[0-9a-f]{0,15})|0$/,
  },
  uint256: {
    title: "hex encoded 256 bit unsigned integer",
    pattern: /^0x([1-9a-f]+[0-9a-f]{0,31})|0$/,
  },
  hash32: {
    title: "32 byte hex value",
    pattern: /^0x[0-9a-f]{64}$/,
  },
}

export default baseTypes;
