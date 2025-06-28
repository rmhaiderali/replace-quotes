import { z } from "zod"

const stringOrTuple = z.union([z.string(), z.tuple([z.string(), z.string()])])

type quote = string | [string, string]

export default function replaceQuotes(...args: quote[]) {
  //
  if (args.length < 2)
    throw new Error(
      'At least two arguments are required: try replaceQuotes("\'", ["‘", "’"])'
    )

  args.forEach((arg, index) => {
    if (!stringOrTuple.safeParse(arg).success)
      throw new Error(
        "Invalid argument at index " +
          index +
          " expected a string or a tuple of two strings"
      )
  })

  const sourceQuotesPairs = args.map((f) => (Array.isArray(f) ? f : [f, f]))
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

      const [matchedSourceStartQuote, matchedSourceEndQuote] =
        sourceQuotesPairs[groups.findIndex(Boolean)]

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
