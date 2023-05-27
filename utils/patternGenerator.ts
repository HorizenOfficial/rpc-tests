import parseYaml from "../utils/parseYaml";

function getType($ref) {
  const $refDirName = $ref.split("/");
  return $refDirName[$refDirName.length - 1];
}

async function getRpcDefinition(rpcDefinitionPath, rpcName) {
  const contents = await parseYaml(rpcDefinitionPath);
  return contents.find(item => item.name === rpcName);
}

async function getSchema(schema) {
  return await parseYaml(`../execution-apis/src/schemas/${schema}.yaml`);
}

async function getBasePattern(name) {
  const baseTypes = await getSchema("base-types");
  const baseType = baseTypes[name];

  if(baseType) {
    return new RegExp(baseType.pattern);
  }

  const mainTypes = await getSchema(name.toLowerCase());
  const mainType = mainTypes[name];
  return await iterateObjectPattern({}, mainType.properties);
}

async function iterateObjectPattern(pattern, properties) {
  for (const key in properties) {
    const propertyValue = properties[key];
    const { items, type } = propertyValue;

    // object.string
    if (propertyValue.$ref) {
      pattern[key] = await getBasePattern(getType(propertyValue.$ref));
      continue;
    }
    
    // object.array
    if (items) {
      // object.array.array
      if (items.items) {
        pattern[key] = [[await getBasePattern(getType(propertyValue.items.items.$ref))]];
        continue;
      }

      pattern[key] = [await getBasePattern(getType(propertyValue.items.$ref))];
      continue;
    }
  }

  return pattern;
}

async function buildArrayPattern({ rpcDefinitionPath, rpcName }) {
  const rpcDefinition = await getRpcDefinition(rpcDefinitionPath, rpcName);
  return [await getBasePattern(getType(rpcDefinition.result.schema.items.$ref))];
}

async function buildObjectPattern({ rpcDefinitionPath, rpcName }) {
  const rpcDefinition = await getRpcDefinition(rpcDefinitionPath, rpcName);
  const { properties } = rpcDefinition.result.schema;
  return iterateObjectPattern({}, properties);
}

async function buildMainPattern({ rpcDefinitionPath, rpcName }) {
  const rpcDefinition = await getRpcDefinition(rpcDefinitionPath, rpcName);
  const { $ref } = rpcDefinition.result.schema;
  const typeSchemaName = getType($ref);
  const typeSchema = (await getSchema(getType(typeSchemaName)))[typeSchemaName];
  const { properties } = typeSchema;
  return iterateObjectPattern({}, properties);
}

async function buildStringPattern({ rpcDefinitionPath, rpcName }) {
  const rpcDefinition = await getRpcDefinition(rpcDefinitionPath, rpcName);
  return await getBasePattern(getType(rpcDefinition.result.schema.$ref));
}

export default {
  buildArrayPattern,
  buildObjectPattern,
  buildStringPattern,
  buildMainPattern,
};

