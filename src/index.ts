import { z } from "zod"
import { inspect } from "node-inspect-extracted"

const matchSchema = z.union([
  z.string(),
  z.tuple([z.string(), z.string()]),
  z.tuple([z.string(), z.string(), z.boolean()]),
])
const replaceSchema = z.union([z.string(), z.tuple([z.string(), z.string()])])

type match = string | [string, string] | [string, string, boolean]
type replace = string | [string, string]

const matchString = "string | [string, string] | [string, string, boolean]"
const replaceString = "string | [string, string]"

export const double = String.fromCharCode(34)
export const single = String.fromCharCode(39)
export const backtick = String.fromCharCode(96)

export function lineByLine(
  fn: (line: string, index: number, array: string[]) => string
) {
  return (text: string) => text.split("\n").map(fn).join("\n")
}

export default function replaceQuotes(...quotes: [...replace[], match]) {
  //
  if (quotes.length < 2) throw new Error("At least two arguments are required")

  quotes.forEach((quote, index) => {
    const isLast = index + 1 === quotes.length
    const result = (isLast ? replaceSchema : matchSchema).safeParse(quote)
    if (!result.success) {
      const toDoubleQuotes = lineByLine(
        replaceQuotes(single, double, backtick, double)
      )
      throw new Error(
        "Invalid argument at index " +
          index +
          "\nExpected: " +
          (isLast ? replaceString : matchString) +
          "\nGot: " +
          toDoubleQuotes(inspect(quote))
      )
    }
  })

  const sourceQuotesPairs = quotes.map((f) => (Array.isArray(f) ? f : [f, f]))
  const [targetStartQuote, targetEndQuote] = sourceQuotesPairs.pop() as [
    string,
    string
  ]

  const getLiteralsRegex = new RegExp(
    sourceQuotesPairs
      .map(
        // to match string literal
        ([start, end]) =>
          "(" + start + "(?:[^" + end + "\\\\]|\\\\.)*" + end + ")"
      )
      .concat(
        // to match regex literal
        "/(?:[^/\\\\]|\\\\.)*/",
        "\\[Function:? .*?\\]",
        "\\[class .*?\\]",
        "Symbol\\(.*?\\)"
      )
      .join("|"),
    "g"
  )

  // regex to match all target end quotes that are not escaped by odd number of backslashes
  const getUnescapedTargetEndQuotesRegex = new RegExp(
    "(?<!\\\\)(?:\\\\\\\\)*" + targetEndQuote,
    "g"
  )

  return (text: string) =>
    text.replaceAll(getLiteralsRegex, (...match) => {
      const groups = match.slice(1, sourceQuotesPairs.length + 1)

      // if no group matched, return the original match
      if (!groups.some(Boolean)) return match[0]

      const [matchedSourceStartQuote, matchedSourceEndQuote, onlyForContext] =
        sourceQuotesPairs[groups.findIndex(Boolean)]

      if (onlyForContext) return match[0]

      let newString = match[0]
        .slice(1, -1)
        // unescape all escaped source[end] quotes
        .replaceAll(
          new RegExp("\\\\" + matchedSourceEndQuote, "g"),
          matchedSourceEndQuote
        )
        // escape all unescaped target[end] quotes
        .replaceAll(getUnescapedTargetEndQuotesRegex, (m) => "\\" + m)

      return targetStartQuote + newString + targetEndQuote
    })
}
