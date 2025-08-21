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
  const blob = new Blob([text], { type: "text/javascript" })
  const url = URL.createObjectURL(blob)
  const module = await import(url)
  URL.revokeObjectURL(url)
  return module
}

let packages = {}

if (isBrowser) {
  const packageLock = await getFileContent("../../package-lock.json")
  packages = JSON.parse(packageLock).packages || {}
}

function localOrRemote(name) {
  if (!isBrowser) return name
  const version = packages["node_modules/" + name]?.version || "latest"
  return "https://cdn.jsdelivr.net/npm/" + name + "@" + version + "/+esm"
}

async function fetchModuleFromURL(url) {
  if (!isBrowser) return await import(url)

  let text = await getFileContent(url)
  if (!text) throw new Error("Failed to load module from " + url)

  return await importFromText(
    text.replace(
      /from "(.*?)"/g,
      (match, group) => "from '" + localOrRemote(group) + "'"
    )
  )
}

export { log, localOrRemote, getFileContent, fetchModuleFromURL }
