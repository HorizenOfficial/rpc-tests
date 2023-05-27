import { readFile } from "node:fs/promises";
import path from "path";
import yaml from "yaml";

async function parseYaml(file: string) {
  try {
    const contents = await readFile(
      path.resolve(__dirname, file),
      { encoding: "utf8" },
    );
    return yaml.parse(contents);
  } catch(error) {
    throw new Error(`Error: ${JSON.stringify(error, null, 2)}`)
  }
}

export default parseYaml;
