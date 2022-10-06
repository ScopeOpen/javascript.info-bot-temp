import fs from "node:fs";
import path from "node:path";

// path.sep
// https://nodejs.org/api/path.html#pathsep
// Provides the platform-specific path segment separator.

function makeDirectoryEntry(origin, name) {
  return {
    path: `${origin}${path.sep}${name}`,
    isDirectory: true,
    isFile: false,
  };
}

function makeFileEntry(origin, name) {
  return {
    path: `${origin}${path.sep}${name}`,
    isDirectory: false,
    isFile: true,
  };
}

// Returns array of entry objects:
// Entry {
//   path: String,
//   isDirectory: Boolean,
//   isFile: Boolean,
// }
export function getFileTree(directory_path /*string*/) {
  const tree = [];

  // fs.readdirSync
  // https://nodejs.org/api/fs.html#fsreaddirsyncpath-options
  // https://nodejs.org/api/fs.html#class-fsdirent
  // Reads the contents of the directory.
  const entries /*dirent[]*/ = fs.readdirSync(directory_path, {
    withFileTypes: true,
  });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const dirEntry = makeDirectoryEntry(directory_path, entry.name);
      tree.push(dirEntry, ...getFileTree(dirEntry.path));
    } else {
      tree.push(makeFileEntry(directory_path, entry.name));
    }
  }

  return tree;
}

// Tests
// https://jasmine.github.io/index.html
if (globalThis['describe']) {
  describe("readJSONFromFile", function () {
    it("reads the json file and returns the contents as string", function () {
      const entries = getFileTree("test-directory");
      expect(entries[0].path).toBe(`test-directory${path.sep}test-file.json`);
    });
  });
}