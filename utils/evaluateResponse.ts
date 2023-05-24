import { expect } from "@jest/globals";
import baseTypePatterns from "./baseTypePatterns";
import fixtures from "../fixtures";

// A robust version of the "typeof" operator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#custom_method_that_gets_a_more_specific_type
function type(value) {
  if (value === null) {
    return "null";
  }

  const baseType = typeof value;
  // Primitive types
  if (!["object", "function"].includes(baseType)) {
    return baseType;
  }

  // Symbol.toStringTag often specifies the "display name" of the
  // object's class. It's used in Object.prototype.toString().
  const tag = value[Symbol.toStringTag];
  if (typeof tag === "string") {
    return tag;
  }

  // If it's a function whose source code starts with the "class" keyword
  if (
    baseType === "function" &&
    Function.prototype.toString.call(value).startsWith("class")
  ) {
    return "class";
  }

  // The name of the constructor; for example `Array`, `GeneratorFunction`,
  // `Number`, `String`, `Boolean` or `MyCustomClass`
  const className = value.constructor.name;
  if (typeof className === "string" && className !== "") {
    return className;
  }

  // At this point there's no robust way to get the type of value,
  // so we use the base implementation.
  return baseType;
}

function testString(value) {
  const patternFound = baseTypePatterns
    .find(baseTypePattern => 
      value
        .match(baseTypePattern)
    );

  console.log(`Value to test: ${value}\nPattern found: ${patternFound}`)
  
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
    `Unsupported type. Expected "array", "object", "string", "number", "null", or "boolean" but received: "${type.toLowerCase()}".`
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
