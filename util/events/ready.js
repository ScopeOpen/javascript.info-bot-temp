const config = require("../../config.json"),
  client = require("../../index.js");

client.on("ready", async (message) => {
  console.log(config.Configuration.Messages.STARTUP);
});
