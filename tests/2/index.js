import { log, getFileContent, fetchModuleFromURL } from "./utils.js"

const {
  single,
  double,
  backtick,
  default: replaceQuotes,
} = await fetchModuleFromURL("../../dist/index.js")

const curly = ["‘", "’"]

const processLinesAndJoin = (func) => (text) =>
  text.split("\n").map(func).join("\n")

const toCurlyQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    single,
    double,
    backtick,
    // to
    curly
  )
)

const toSingleQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    single,
    double,
    backtick,
    // to
    single
  )
)

const toDoubleQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    single,
    double,
    backtick,
    // to
    double
  )
)

const toBacktickQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    single,
    double,
    backtick,
    // to
    backtick
  )
)

const fromSingleToDoubleQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    single,
    // to
    double
  )
)

const fromSingleToBacktickQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    single,
    // to
    backtick
  )
)

const fromSingleToCurlyQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    single,
    // to
    curly
  )
)

const fromDoubleToSingleQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    double,
    // to
    single
  )
)

const fromDoubleToBacktickQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    double,
    // to
    backtick
  )
)

const fromDoubleToCurlyQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    double,
    // to
    curly
  )
)

const fromBacktickToSingleQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    backtick,
    // to
    single
  )
)

const fromBacktickToDoubleQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    backtick,
    // to
    double
  )
)

const fromBacktickToCurlyQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    backtick,
    // to
    curly
  )
)

const fromCurlyToSingleQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    curly,
    // to
    single
  )
)

const fromCurlyToDoubleQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    curly,
    // to
    double
  )
)

const fromCurlyToBacktickQuotes = processLinesAndJoin(
  replaceQuotes(
    // from
    curly,
    // to
    backtick
  )
)

const mixedQuotes = await getFileContent("files/mixed.txt")
const singleQuotesExpected = await getFileContent("files/single.txt")
const doubleQuotesExpected = await getFileContent("files/double.txt")
const backtickQuotesExpected = await getFileContent("files/backtick.txt")
const curlyQuotesExpected = await getFileContent("files/curly.txt")

if (
  !mixedQuotes ||
  !singleQuotesExpected ||
  !doubleQuotesExpected ||
  !backtickQuotesExpected ||
  !curlyQuotesExpected
) {
  throw new Error("Failed to load one or more required files")
}

const singleQuotes = toSingleQuotes(mixedQuotes)
const doubleQuotes = toDoubleQuotes(mixedQuotes)
const backtickQuotes = toBacktickQuotes(mixedQuotes)
const curlyQuotes = toCurlyQuotes(mixedQuotes)

log("mixed > single == expected")
log(singleQuotes === singleQuotesExpected)
log("mixed > double == expected")
log(doubleQuotes === doubleQuotesExpected)
log("mixed > backtick == expected")
log(backtickQuotes === backtickQuotesExpected)
log("mixed > curly == expected")
log(curlyQuotes === curlyQuotesExpected)
log()
log("mixed > single > double == expected")
log(fromSingleToDoubleQuotes(singleQuotes) === doubleQuotesExpected)
log("mixed > single > backtick == expected")
log(fromSingleToBacktickQuotes(singleQuotes) === backtickQuotesExpected)
log("mixed > single > curly == expected")
log(fromSingleToCurlyQuotes(singleQuotes) === curlyQuotesExpected)
log()
log("mixed > double > single == expected")
log(fromDoubleToSingleQuotes(doubleQuotes) === singleQuotesExpected)
log("mixed > double > backtick == expected")
log(fromDoubleToBacktickQuotes(doubleQuotes) === backtickQuotesExpected)
log("mixed > double > curly == expected")
log(fromDoubleToCurlyQuotes(doubleQuotes) === curlyQuotesExpected)
log()
log("mixed > backtick > single == expected")
log(fromBacktickToSingleQuotes(backtickQuotes) === singleQuotesExpected)
log("mixed > backtick > double == expected")
log(fromBacktickToDoubleQuotes(backtickQuotes) === doubleQuotesExpected)
log("mixed > backtick > curly == expected")
log(fromBacktickToCurlyQuotes(backtickQuotes) === curlyQuotesExpected)
log()
log("mixed > curly > single == expected")
log(fromCurlyToSingleQuotes(curlyQuotes) === singleQuotesExpected)
log("mixed > curly > double == expected")
log(fromCurlyToDoubleQuotes(curlyQuotes) === doubleQuotesExpected)
log("mixed > curly > backtick == expected")
log(fromCurlyToBacktickQuotes(curlyQuotes) === backtickQuotesExpected)
