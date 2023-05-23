import baseTypePatterns from "./baseTypes";

function testAssertion(result) {
  expect(baseTypePatterns.some(baseTypePattern => result.match(baseTypePattern))).toEqual(true);
}

function evaluateResult(result) {
  if (typeof result === "string") {
    return testAssertion(result);
  }

  if (typeof result === "object") {
    for (const key in result) {
      const value = result[key];
  
      if (typeof value === "object") {
        if (value instanceof Array) {
          value.forEach(innerValue => evaluateResult(innerValue));
        }
  
        return evaluateResult(value);
      }
      
      if (typeof value === "string") {
        testAssertion(value);
      }
    }
  }
}

export default evaluateResult;