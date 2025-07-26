const isBrowser = typeof window !== "undefined"

if (!isBrowser) process.chdir(import.meta.dirname)

function documentWrite(content) {
  const pre = document.createElement("pre")
  pre.textContent = content
  if (typeof content === "boolean") {
    pre.style.color = content ? "#26a269" : "#c01c28"
  }
  document.body.appendChild(pre)
}

const log = isBrowser ? documentWrite : console.log

function normalizeLineEnd(text) {
  return text.replaceAll(/(\r\n|\n|\r)/g, "\n")
}

async function getFileContent(filePath) {
  if (isBrowser) {
    const response = await fetch(filePath)
    if (!response.ok) {
      log("Failed to load " + response.url)
      return null
    }
    return normalizeLineEnd(await response.text())
  }
  try {
    const { readFileSync } = await import("node:fs")
    return normalizeLineEnd(readFileSync(filePath, "utf-8"))
  } catch (error) {
    log("Failed to load " + filePath)
    return null
  }
}

async function importFromText(text) {
  if (isBrowser) {
    const blob = new Blob([text], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const module = await import(url)
    URL.revokeObjectURL(url)
    return module
  }
  const { writeFileSync, unlinkSync } = await import("node:fs")
  const { randomUUID } = await import("node:crypto")
  const modulePath = "module" + randomUUID() + ".js"
  writeFileSync(modulePath, text)
  const module = await import(modulePath)
  unlinkSync(modulePath)
  return module
}

async function fetchModuleFromURL(url) {
  if (!isBrowser) return import(url)

  let text = await getFileContent(url)
  if (!text) {
    throw new Error("Failed to load module from " + url)
  }
  return await importFromText(
    text.replace(/from "(.*?)"/g, 'from "https://cdn.jsdelivr.net/npm/$1/+esm"')
  )
}

export { isBrowser, log, getFileContent, fetchModuleFromURL }
