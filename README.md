# 📦 Replace Quotes

The `replace-quotes` package is a lightweight JavaScript utility to replace single, double, or custom quote styles with a desired quote format — perfect for consistent formatting, smart typography (like curly quotes), or cleaning up mixed quote inputs.

## ✨ Features

- **At least two arguments required**:

  - One or more **source quotes** (strings or pairs)
  - The final argument is the **target quote** (string or pair)

- **Supports**:

  - **Single quote styles** (e.g. `'`, `"`)
  - **Directional quotes** (e.g. `["‘", "’"]`, `["“", "”"]`)
  - **Multiple source formats** at once

- Returns a **reusable transformer function**

- Handles **escaped quotes** properly

## 🧠 API

```ts
type qoute = string | [string, string]
replaceQuotes(...source: qoute[], target: qoute): (text: string) => string
```

- **Arguments**:

  - One or more `source` quotes and one `target` quote (last argument)
  - A quote can be a single string or a pair `[start, end]`

- **Returns**: A function that takes a `string` and returns a modified string with replaced quotes

## 🧑‍💻 Usage

```js
import replaceQuotes from "replace-quotes"
import { inspect } from "node-inspect-extracted"

const toDoubleQuotes = replaceQuotes(
  // from
  "'",
  '"',
  // to
  '"'
)

const toCurlyQuotes = replaceQuotes(
  // from
  "'",
  '"',
  // to
  ["‘", "’"]
)

const text = inspect(["hello world", "it's a beautiful day"])

console.log(text)                 // [ 'hello world', "It's a beautiful day" ]
console.log(toDoubleQuotes(text)) // [ "hello world", "It's a beautiful day" ]
console.log(toCurlyQuotes(text))  // [ ‘hello world’, ‘It's a beautiful day’ ]
```

## ⚠️ Notes

- Input must be a **string** (e.g. from `util.inspect` or `node-inspect-extracted` etc.)
