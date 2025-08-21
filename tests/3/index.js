import {
  log,
  localOrRemote,
  getFileContent,
  fetchModuleFromURL,
} from "./utils.js"

const {
  single,
  double,
  default: replaceQuotes,
} = await fetchModuleFromURL("../../dist/index.js")

const { inspect } = await import(localOrRemote("node-inspect-extracted"))

const replace = replaceQuotes(
  // from
  single,
  [double, double, true],
  // to
  "~"
)

const expected = await getFileContent("files/expected.txt")

if (!expected) {
  throw new Error("Failed to load one or more required files")
}

const text = inspect(["it's a beautiful day", "hello world"])

log("is expected")
log(expected === text + "\n" + replace(text))
