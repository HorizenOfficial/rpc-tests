import { expect } from "@jest/globals";
import baseTypePatterns from "./baseTypes";
import fixtures from "../fixtures";

function type(value) {
  if (value === null) {
    return "null";
  }

  const baseType = typeof value;
  if (!["object", "function"].includes(baseType)) {
    return baseType;
  }

  const tag = value[Symbol.toStringTag];
  if (typeof tag === "string") {
    return tag;
  }

  if (
    baseType === "function" &&
    Function.prototype.toString.call(value).startsWith("class")
  ) {
    return "class";
  }

  const className = value.constructor.name;
  if (typeof className === "string" && className !== "") {
    return className;
  }

  return baseType;
}

function testAssertion(result) {
  expect(
    baseTypePatterns.some(baseTypePattern => result
      .toString()
      .match(baseTypePattern)
    )
  ).toEqual(true);
}

function iterateObjectProperties(result) {
  for (const key in result) {
    const value = result[key];
    switch(type(value)) {
      case "Array":
      case "Object":
        return reduceResult(value);

      case "string":
      default:
        testAssertion(value);
    }
  }
}

function reduceResult(result) {
  switch(type(result)) {
    case "Array":
      return result.forEach(innerResult => reduceResult(innerResult));

    case "Object":
      return iterateObjectProperties(result);

    case "string":
      return testAssertion(result);

    default:
      throw new Error(`unsupported type detected. expected "string", "object", or "array" type but encountered: "${type(result)}".`);
  }
}

function evaluateResponse(response) {
  const { jsonrpc, id, result, error } = response;
  if (error) {
    throw new Error(`Error: ${JSON.stringify(error)}`);
  }

  expect(jsonrpc).toBe(fixtures.jsonrpc);
  expect(id).toBe(fixtures.id);
  reduceResult(result);
}

export default evaluateResponse;
