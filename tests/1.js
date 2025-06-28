import { inspect } from "node-inspect-extracted"
import replaceQuotes from "../dist/index.mjs"

const single = "'"
const double = '"'
const backtick = "`"

const fromSingleDoubleBacktickToCurlyQuotes = replaceQuotes(
  // from
  single,
  double,
  backtick,
  // to
  ["‘", "’"]
)
const fromCurlyToDoubleQuotes = replaceQuotes(
  // from
  ["‘", "’"],
  // to
  double
)

const fromDoubleToCurlyQuotes = replaceQuotes(
  // from
  double,
  // to
  ["‘", "’"]
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
  new Date(),
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

const arr = inspect(array, { colors: true })
const obj = inspect(object, { colors: true })

const r0 = arr + "\n" + obj

const r1 = fromSingleDoubleBacktickToCurlyQuotes(r0)
const r2 = fromCurlyToDoubleQuotes(r1)
const r3 = fromDoubleToCurlyQuotes(r2)

console.log(r0)
console.log(r1)
console.log(r2)
console.log(r3)
console.log(r1 === r3)
