import fs from "node:fs";

export function readJSONFromFile(path) {
  // https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
  return JSON.parse(fs.readFileSync(path));
}

// Tests
// https://jasmine.github.io/index.html
if (globalThis["describe"]) {
  describe("readJSONFromFile", function () {
    it("reads the json file and returns the contents as string", function () {
      const contents = readJSONFromFile("./test-directory/test-file.json");
      expect(contents.hello).toBe("world!");
    });
  });
}
