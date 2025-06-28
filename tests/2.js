import fs from "node:fs"
import boxenOrginal from "boxen"
import replaceQuotes from "../dist/index.mjs"

function boxen(content, title) {
  const box = boxenOrginal(content, { title, padding: { left: 1, right: 1 } })
  return box.replaceAll("\r", "")
}

const single = "'"
const double = '"'
const backtick = "`"

const toCurlyQuotes = replaceQuotes(
  // from
  single,
  double,
  backtick,
  // to
  ["‘", "’"]
)

const toSingleQuotes = replaceQuotes(
  // from
  single,
  double,
  backtick,
  // to
  single
)

const toDoubleQuotes = replaceQuotes(
  // from
  single,
  double,
  backtick,
  // to
  double
)

const toBacktickQuotes = replaceQuotes(
  // from
  single,
  double,
  backtick,
  // to
  backtick
)

const fromCurlyToSingleQuotes = replaceQuotes(
  // from
  ["‘", "’"],
  // to
  single
)

const fromCurlyToDoubleQuotes = replaceQuotes(
  // from
  ["‘", "’"],
  // to
  double
)

const fromCurlyToBacktickQuotes = replaceQuotes(
  // from
  ["‘", "’"],
  // to
  backtick
)

const singleLine = (func, text) => text.split("\n").map(func).join("\n")

const orignalQuotes = fs.readFileSync("./tests/code.txt", "utf-8")

const curryQuotes = singleLine(toCurlyQuotes, orignalQuotes)

const singleQuotes = singleLine(toSingleQuotes, orignalQuotes)
const doubleQuotes = singleLine(toDoubleQuotes, orignalQuotes)
const backtickQuotes = singleLine(toBacktickQuotes, orignalQuotes)

const singleQuotes2 = singleLine(fromCurlyToSingleQuotes, curryQuotes)
const doubleQuotes2 = singleLine(fromCurlyToDoubleQuotes, curryQuotes)
const backtickQuotes2 = singleLine(fromCurlyToBacktickQuotes, curryQuotes)

console.log(boxen(orignalQuotes, "Orignal Quotes"))
console.log(boxen(singleQuotes, "Single Quotes"))
console.log(boxen(doubleQuotes, "Double Quotes"))
console.log(boxen(backtickQuotes, "Backtick Quotes"))
console.log(boxen(curryQuotes, "Curly Quotes"))

console.log(singleQuotes === singleQuotes2)
console.log(doubleQuotes === doubleQuotes2)
console.log(backtickQuotes === backtickQuotes2)
