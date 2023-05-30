import { expect } from "@jest/globals";
import fixtures from "../fixtures";
require("dotenv").config();

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

function testString(value, pattern) {
  if (process.env.DEV_MODE) {
    console.log(`performing test on:\n-------------------\nvalue:   ${value}\npattern: ${pattern}`);
  }
  
  // for a property that exists outside of the schema definition
  // and does not have a pattern to use for assertion, test for null
  pattern
    ? expect(value).toMatch(pattern)
    : testNull(pattern);
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

function iterateObjectProperties(value, pattern) {
  for (const key in value) {
    reduceValue(value[key], (pattern && pattern[key]) || null);
  }
}

function reduceValue(value, pattern) {
  switch(type(value)) {
    case "Array":
      value.forEach(item => {
        if (pattern && pattern.any) {
          pattern.any.forEach((anyPattern) =>
            (type(anyPattern) === "Object")
              ? reduceValue(item, anyPattern)
              : null
          );
        }
        return reduceValue(item, (pattern && pattern[0]) || null);
      });
      break;

    case "Object":
      iterateObjectProperties(value, pattern);
      break;
    
    case "string":
      testString(value, pattern);
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

function evaluateResponse({ response, pattern }) {
  const { jsonrpc, id, result: value, error } = response;
  if (error) throw new Error(`Error: ${JSON.stringify(error, null, 2)}`);

  expect(jsonrpc).toBe(fixtures.jsonrpc);
  expect(id).toBe(fixtures.id);
  reduceValue(value, pattern);

  if (process.env.DEV_MODE) {
    console.log("response:", response, "\n", "pattern:",pattern);
  }
}

export default evaluateResponse;
