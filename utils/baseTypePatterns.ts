const baseTypePatterns = [
  // address - hex encoded address
  /^0x[0-9,a-f,A-F]{40}$/,

  // byte - hex encoded byte
  /^0x([0-9,a-f,A-F]?){1,2}$/,

  // bytes - hex encoded bytes
  /^0x[0-9a-f]*$/,

  // bytesMax32 - 32 hex encoded bytes
  /^0x[0-9a-f]{0,64}$/,

  // bytes8 - 8 hex encoded bytes
  /^0x[0-9a-f]{16}$/,

  // bytes32 - 32 hex encoded bytes
  /^0x[0-9a-f]{64}$/,

  // bytes256 - 256 hex encoded bytes
  /^0x[0-9a-f]{512}$/,

  // bytes65 - 65 hex encoded bytes
  /^0x[0-9a-f]{65}$/,

  // uint - hex encoded unsigned integer
  /^0x([1-9a-f]+[0-9a-f]*|0)$/,

  // uint64 - hex encoded 64 bit unsigned integer
  /^0x([1-9a-f]+[0-9a-f]{0,15})|0$/,

  // uint256 - hex encoded 256 bit unsigned integer
  /^0x([1-9a-f]+[0-9a-f]{0,31})|0$/,

  // hash32 - 32 byte hex value
  /^0x[0-9a-f]{64}$/,
];

export default baseTypePatterns;