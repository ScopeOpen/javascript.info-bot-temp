import fs from "node:fs";
import chalk from "chalk";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const AsciiTable = require("ascii-table");

const table = new AsciiTable();
table.setHeading("Events", "Loaded").setBorder("║", "=", ".");

// export function buildCommandSet({ getFileTree }) {
//   const entries = getFileTree("./commands");
//   console.log(entries);
//   return {};
// }

export async function handler(client, { _import, getFileTree }) {
  const filepaths = getFileTree("./commands")
    .filter((entry) => entry.isFile)
    .map((entry) => entry.path);

  if (filepaths.length === 0) {
    console.log(chalk.red("Commands - 0"));
  } else {
    for (const filepath of filepaths) {
      console.log(filepath);
      const module = await _import(filepath);
      const command = module.default;

      if (command) {
        client.commands.set(command.NAME, command);
        client.all.set(command);

        if (command.ALIASES && Array.isArray(command.ALIASES)) {
          command.ALIASES.forEach((alias) => {
            client.aliases.set(alias, command.NAME);
          });
        }

        table.addRow(command.NAME, "✅");
      } else {
        table.addRow(file, "❌");
      }
    }

    console.log(chalk.blue(table.toString()));
  }
}
