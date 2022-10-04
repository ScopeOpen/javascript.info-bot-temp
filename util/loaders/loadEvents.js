const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  console.log("hi");
  fs.readdir(path.join(__dirname, "../../", "events"), (_err, files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const event = require(`../../events/${file}`);
      const eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`../../events/${file}`)];
    });
  });
};
