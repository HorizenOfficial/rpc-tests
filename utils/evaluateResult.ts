import baseTypePatterns from "./baseTypes";

function testAssertion(result) {
  expect(baseTypePatterns.some(baseTypePattern => result.match(baseTypePattern))).toEqual(true);
}

function iterateObjectProperties(result) {
  for (const key in result) {
    const value = result[key];
    switch(Object.prototype.toString.call(value)) {
      case "[object Array]":
        return value.forEach(innerValue => evaluateResult(innerValue));

      case "[object Object]":
        return evaluateResult(value);

      case "[object String]":
      default:
        testAssertion(value);
    }
  }
}

function evaluateResult(result) {
  switch(typeof result) {
    case "string":
      return testAssertion(result);

    case "object":
      return iterateObjectProperties(result);

    default:
      throw new Error(`unsupported type detected. expected "string" or "object" type. type encountered: "${result}".`);
  }
}

export default evaluateResult;