import { isBrowser, log, getFileContent, fetchModuleFromURL } from "./utils.js"

const {
  single,
  double,
  backtick,
  default: replaceQuotes,
} = await fetchModuleFromURL("../../dist/index.js")

const { inspect } = await import(
  isBrowser
    ? "https://cdn.jsdelivr.net/npm/node-inspect-extracted/+esm"
    : "node-inspect-extracted"
)

const curly = ["‘", "’"]

const toCurlyQuotes = replaceQuotes(
  // from
  single,
  double,
  backtick,
  // to
  curly
)

const fromCurlyToDoubleQuotes = replaceQuotes(
  // from
  curly,
  // to
  double
)

const fromDoubleToCurlyQuotes = replaceQuotes(
  // from
  double,
  // to
  curly
)

function example() {}

const array = [
  single,
  double,
  backtick,
  backtick + double + single,
  "hello\\‘hi\\’world",
  123,
  123n,
  null,
  NaN,
  true,
  Infinity,
  undefined,
  Symbol("hello\"'world"),
  example,
  class {},
  function () {},
  new RegExp(),
  new Map([["hello\"'world", "hello\"'world"]]),
  new Set([1, 2, 3]),
  new WeakMap(),
  new WeakSet(),
  new Promise(() => {}),
]

const object = {
  "hello\"'world": example,
  "hello\"'class": class {},
  "hello\"'function": function () {},
}

const mixed = inspect(array) + "\n" + inspect(object)

const mixedCurly = toCurlyQuotes(mixed)
const mixedCurlyDouble = fromCurlyToDoubleQuotes(mixedCurly)
const mixedCurlyDoubleCurly = fromDoubleToCurlyQuotes(mixedCurlyDouble)
const mixedCurlyDoubleCurlyDouble = fromCurlyToDoubleQuotes(
  mixedCurlyDoubleCurly
)

const mixedQuotesExpected = await getFileContent("files/mixed.txt")
const doubleQuotesExpected = await getFileContent("files/double.txt")
const curlyQuotesExpected = await getFileContent("files/curly.txt")

if (!mixedQuotesExpected || !doubleQuotesExpected || !curlyQuotesExpected) {
  throw new Error("Failed to load one or more required files")
}

// const { writeFileSync } = await import("node:fs")
// writeFileSync("files/mixed.txt", mixed)
// writeFileSync("files/curly.txt", mixedCurly)
// writeFileSync("files/double.txt", mixedCurlyDouble)

log("mixed == expected")
log(mixed === mixedQuotesExpected)

log("mixed > curly == expected")
log(mixedCurly === curlyQuotesExpected)

log("mixed > curly > double == expected")
log(mixedCurlyDouble === doubleQuotesExpected)

log("mixed > curly > double > curly == expected")
log(mixedCurlyDoubleCurly === curlyQuotesExpected)

log("mixed > curly > double > curly > double == expected")
log(mixedCurlyDoubleCurlyDouble === doubleQuotesExpected)
