# 📦 Replace Quotes

**`replace-quotes`** is a lightweight JavaScript utility for replacing straight, curly, or custom quotes with your desired quote style. It’s great for maintaining consistent formatting, improving typography (like using curly quotes), or cleaning up mixed quote styles in text.

## ✨ Features

- **Requires at least two arguments**:

  - One or more **quote styles to match** (called _match quotes_)
  - A **target quote** style to replace them with (called _replace quote_)

- **Supports**:

  - Straight quotes (like `'` or `"`)
  - Paired quotes (like `["‘", "’"]` or `["“", "”"]`)
  - Multiple quote formats at once

- **Flexible matching**:

  - Match quotes can be:

    - A single quote character (e.g. `'`)
    - A pair `[start, end]` (e.g. `["‘", "’"]`)
    - Or a pair with a third flag: `[start, end, true]` — tells the function to **only consider these quotes for context**, not replace them

- **Replace quote**:

  - Can be a single character or a pair `[start, end]`

- **Returns**:

  - A function that takes a `string` input and returns the text with quotes replaced as specified

## 🧑‍💻 Usage

```js
import replaceQuotes, { single, double } from "replace-quotes"
import { inspect } from "node-inspect-extracted"

const toDoubleQuotes = replaceQuotes(
  single,
  double,
  double // Replace all with double quotes
)

const toCurlyQuotes = replaceQuotes(
  single,
  double,
  ["‘", "’"] // Replace all with curly quotes
)

const text = inspect(["it's a beautiful day", "hello world"])

console.log(text)                 // [ "it's a beautiful day", 'hello world' ]
console.log(toDoubleQuotes(text)) // [ "it's a beautiful day", "hello world" ]
console.log(toCurlyQuotes(text))  // [ ‘it's a beautiful day’, ‘hello world’ ]
```

## 🎯 Context-Aware Matching

If you want to replace only **single quotes** with curly quotes, but leave single quotes **inside double-quoted strings** untouched, use the _context flag_.

```js
import replaceQuotes, { single, double } from "replace-quotes"
import { inspect } from "node-inspect-extracted"

const toCurlyWithoutContext = replaceQuotes(
  single,
  ["‘", "’"]
)

const toCurlyWithContext = replaceQuotes(
  single,
  [double, double, true], // Use double quotes for context only
  ["‘", "’"]
)

const text = inspect(["it's a beautiful day", "hello world"])

console.log(text)                        // [ "it's a beautiful day", 'hello world' ]
console.log(toCurlyWithoutContext(text)) // [ "it‘s a beautiful day", ’hello world' ] ❌ Incorrect
console.log(toCurlyWithContext(text))    // [ "it's a beautiful day", ‘hello world’ ] ✅ Correct
```

## ⚠️ Notes

- Input must be a **string**. You can pass strings from utilities like `util.inspect` or `node-inspect-extracted`.
