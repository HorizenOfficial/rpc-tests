import { expect } from "@jest/globals";
import baseTypePatterns from "./baseTypePatterns";
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

function testString(value) {
  const patternFound = baseTypePatterns
    .find(baseTypePattern => 
      value
        .match(baseTypePattern)
    );

  console.log(`Value to test: ${value}\nPattern found: :${patternFound}`)
  
  expect(patternFound).toBeDefined();
}

function testNumber(value) {
  expect(value).not.toBeNaN();
}

function testNull(value) {
  expect(value).toBeNull();
}

function testBoolean(type) {
  expect(type).toBe("boolean");
}

function unsupportedType(type) {
  throw new Error(
    `Unsupported type. Expected "string", "number", "null", "undefined", "boolean", "object", or "array" but received: "${type.toLowerCase()}".`
  );
}

function iterateObjectProperties(value) {
  for (const key in value) {
    reduceValue(value[key])
  }
}

function reduceValue(value) {
  switch(type(value)) {
    case "Array":
      value.forEach(item => reduceValue(item));
      break;

    case "Object":
      iterateObjectProperties(value);
      break;
    
    case "string":
      testString(value);
      break;

    case "number":
      testNumber(value);
      break;

    case "null":
      testNull(value);
      break;

    case "boolean":
      testBoolean(type(value));
      break;

    default:
      unsupportedType(type(value));
  }
}

function evaluateResponse(response) {
  const { jsonrpc, id, result: value, error } = response;
  if (error) {
    throw new Error(`Error: ${JSON.stringify(error, null, 2)}`);
  }

  expect(jsonrpc).toBe(fixtures.jsonrpc);
  expect(id).toBe(fixtures.id);
  reduceValue(value);
}

export default evaluateResponse;
