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

function testString(result) {
  console.log(result)
  expect(
    baseTypePatterns.some(baseTypePattern => 
      result
        .match(baseTypePattern)
    )
  ).toEqual(true);
}

function testNumber(result) {
  expect(type(result)).toBe("number");
}

function testNull(result) {
  expect(type(result)).toBe("null");
}

function testUndefined(result) {
  expect(type(result)).toBe("undefined");
}

function testBoolean(result) {
  expect(type(result)).toBe("boolean");
}

function unsupportedType(result) {
  throw new Error(
    `Unsupported type detected. Expected "string", "number", "null", "undefined", "boolean", "object", or "array" but encountered: "${type(result)}".`
  );
}

function iterateObjectProperties(result) {
  for (const key in result) {
    const value = result[key];

    switch(type(value)) {
      case "Array":
      case "Object":
        return reduceResult(value);

      case "string":
        testString(value);
        break;

      case "number":
        testNumber(value);
        break;

      case "null":
        testNull(value);
        break;

      case "undefined":
        testUndefined(value);
        break;

      case "boolean":
        testBoolean(value);
        break;

      default:
        unsupportedType(value);
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
      testString(result);
      break;

    case "number":
      testNumber(result);
      break;

    case "null":
      testNull(result);
      break;

    case "undefined":
      testUndefined(result);
      break;

    case "boolean":
      testBoolean(result);
      break;

    default:
      unsupportedType(result);
  }
}

function evaluateResponse(response) {
  const { jsonrpc, id, result, error } = response;
  if (error) {
    throw new Error(`Error: ${JSON.stringify(error, null, 2)}`);
  }

  expect(jsonrpc).toBe(fixtures.jsonrpc);
  expect(id).toBe(fixtures.id);
  reduceResult(result);
}

export default evaluateResponse;
