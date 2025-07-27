import { log, getFileContent, fetchModuleFromURL } from "./utils.js"

const {
  single,
  double,
  backtick,
  lineByLine,
  default: replaceQuotes,
} = await fetchModuleFromURL("../../dist/index.js")

const curly = ["‘", "’"]

const toCurlyQuotes = lineByLine(
  replaceQuotes(
    // from
    single,
    double,
    backtick,
    // to
    curly
  )
)

const toSingleQuotes = lineByLine(
  replaceQuotes(
    // from
    single,
    double,
    backtick,
    // to
    single
  )
)

const toDoubleQuotes = lineByLine(
  replaceQuotes(
    // from
    single,
    double,
    backtick,
    // to
    double
  )
)

const toBacktickQuotes = lineByLine(
  replaceQuotes(
    // from
    single,
    double,
    backtick,
    // to
    backtick
  )
)

const fromSingleToDoubleQuotes = lineByLine(
  replaceQuotes(
    // from
    single,
    // to
    double
  )
)

const fromSingleToBacktickQuotes = lineByLine(
  replaceQuotes(
    // from
    single,
    // to
    backtick
  )
)

const fromSingleToCurlyQuotes = lineByLine(
  replaceQuotes(
    // from
    single,
    // to
    curly
  )
)

const fromDoubleToSingleQuotes = lineByLine(
  replaceQuotes(
    // from
    double,
    // to
    single
  )
)

const fromDoubleToBacktickQuotes = lineByLine(
  replaceQuotes(
    // from
    double,
    // to
    backtick
  )
)

const fromDoubleToCurlyQuotes = lineByLine(
  replaceQuotes(
    // from
    double,
    // to
    curly
  )
)

const fromBacktickToSingleQuotes = lineByLine(
  replaceQuotes(
    // from
    backtick,
    // to
    single
  )
)

const fromBacktickToDoubleQuotes = lineByLine(
  replaceQuotes(
    // from
    backtick,
    // to
    double
  )
)

const fromBacktickToCurlyQuotes = lineByLine(
  replaceQuotes(
    // from
    backtick,
    // to
    curly
  )
)

const fromCurlyToSingleQuotes = lineByLine(
  replaceQuotes(
    // from
    curly,
    // to
    single
  )
)

const fromCurlyToDoubleQuotes = lineByLine(
  replaceQuotes(
    // from
    curly,
    // to
    double
  )
)

const fromCurlyToBacktickQuotes = lineByLine(
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
