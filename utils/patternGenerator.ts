import parseYaml from "../utils/parseYaml";

function getType($ref) {
  const $refDirName = $ref.split("/");
  return $refDirName[$refDirName.length - 1];
}

function getRpcDefinition(rpcDefinitionPath, rpcName) {
  const contents = parseYaml(rpcDefinitionPath);
  return contents.find(item => item.name === rpcName);
}

function getSchema() {
  const baseTypes = parseYaml(`../execution-apis/src/schemas/base-types.yaml`);
  const block = parseYaml(`../execution-apis/src/schemas/block.yaml`);
  const client = parseYaml(`../execution-apis/src/schemas/client.yaml`);
  const filter = parseYaml(`../execution-apis/src/schemas/filter.yaml`);
  const receipt = parseYaml(`../execution-apis/src/schemas/receipt.yaml`);
  const state = parseYaml(`../execution-apis/src/schemas/state.yaml`);
  const transaction = parseYaml(`../execution-apis/src/schemas/transaction.yaml`);
  const withdrawal = parseYaml(`../execution-apis/src/schemas/withdrawal.yaml`);

  return {
    ...baseTypes,
    ...block,
    ...client,
    ...filter,
    ...receipt,
    ...state,
    ...transaction,
    ...withdrawal,
  }
}

function isMainType(type) {
  return type.charAt(0) === type.charAt(0).toUpperCase();
}

function getPattern(type) {
  const schema = getSchema();
  const schemaType = schema[type];
  if (!isMainType(type) && schemaType) return new RegExp(schemaType.pattern);

  const { properties } = schemaType;
  if (properties) return iterateObjectPattern({}, properties);

  const { allOf } = schemaType;
  if (allOf) {
    let allOfProperties = {};
    allOf.forEach((item) => {
      if (item.properties) allOfProperties = { ...iterateObjectPattern({}, item.properties) }
    })
    return allOfProperties;
  };
}

function iterateObjectPattern(pattern, properties) {
  for (const key in properties) {
    const propertyValue = properties[key];
    const { items, anyOf } = propertyValue;

    // object.string
    if (propertyValue.$ref) {
      pattern[key] = getPattern(getType(propertyValue.$ref));
      continue;
    }
    
    // object.array
    if (items) {
      // object.array.array
      if (items.items) {
        pattern[key] = [[getPattern(getType(propertyValue.items.items.$ref))]];
        continue;
      }

      pattern[key] = [getPattern(getType(propertyValue.items.$ref))];
      continue;
    }

    // object.array[any]
    if (anyOf) {
      pattern[key] = { any: [] };
      anyOf.forEach((item) => {
        if (item.items) {
          const anyOfItemType = getType(item.items.$ref);
          const anyOfItemTypePattern = getPattern(anyOfItemType);
          if (!isMainType(anyOfItemType) && anyOfItemTypePattern) {
            pattern[key].any.push(anyOfItemTypePattern);
          }

          const schema = getSchema();
          const { oneOf } = schema[anyOfItemType];
          if (oneOf) {
            let oneOfProperties = {};
            oneOf.forEach((item) => {
              const oneOfItemType = getType(item.$ref);
              oneOfProperties = { ...oneOfProperties, ...getPattern(oneOfItemType) };
            })
            pattern[key].any.push(oneOfProperties);
          }
        }
      });
      continue;
    }
  }

  // console.log(pattern)

  return pattern;
}

async function buildArrayPattern({ rpcDefinitionPath, rpcName }) {
  const rpcDefinition = getRpcDefinition(rpcDefinitionPath, rpcName);
  return [getPattern(getType(rpcDefinition.result.schema.items.$ref))];
}

async function buildObjectPattern({ rpcDefinitionPath, rpcName }) {
  const rpcDefinition = getRpcDefinition(rpcDefinitionPath, rpcName);
  const { properties } = rpcDefinition.result.schema;
  return iterateObjectPattern({}, properties);
}

async function buildMainPattern({ rpcDefinitionPath, rpcName }) {
  const rpcDefinition = getRpcDefinition(rpcDefinitionPath, rpcName);
  const { $ref } = rpcDefinition.result.schema;
  const mainTypeName = getType($ref);
  return getPattern(mainTypeName);
}

async function buildStringPattern({ rpcDefinitionPath, rpcName }) {
  const rpcDefinition = getRpcDefinition(rpcDefinitionPath, rpcName);
  return getPattern(getType(rpcDefinition.result.schema.$ref));
}

export default {
  buildArrayPattern,
  buildObjectPattern,
  buildStringPattern,
  buildMainPattern,
};

