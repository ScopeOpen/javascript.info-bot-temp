import fs from "node:fs";
import chalk from "chalk";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const AsciiTable = require("ascii-table");

const table = new AsciiTable();
table.setHeading("Events", "Loaded").setBorder("║", "=", ".");

export function handler() {
  fs.readdirSync("./util/events/").filter((file) => file.endsWith(".js"))
    .forEach((event) => {
      try {
        require(`../util/events/${event}`);
        table.addRow(event, "✅");
      } catch (_) {
        table.addRow(event, "❌");
      }
    });
  console.log(chalk.cyan(table.toString()));
}
