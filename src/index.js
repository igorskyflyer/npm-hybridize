const { writeFileSync, accessSync, mkdirSync } = require('fs')
const { join } = require('path')

function pathExists(path) {
  try {
    accessSync(path)
    return true
  } catch {
    return false
  }
}

/**
 * @param {string} outDirectory
 * @param {string} packageModule
 * @param {boolean} overwrite
 */
function hybridize(outDirectory, packageModule, overwrite = false) {
  console.log(`✨ Hybridizing, please wait...\n`)

  if (!pathExists(outDirectory)) {
    try {
      mkdirSync(outDirectory, { recursive: true })
    } catch {
      console.log("❌ Couldn't create the output directory.")
      process.exit(1)
    }
  }

  if (packageModule === 'cjs') {
    packageModule = 'commonjs'
  } else {
    packageModule = 'module'
  }

  try {
    const packagePath = join(outDirectory, 'package.json')

    if (pathExists(packagePath) && !overwrite) {
      console.log(`❌ A package.json file already exists at the destination directory.\nPass --overwrite to always overwrite it.`)
      process.exit(1)
    }

    writeFileSync(packagePath, `{ "type": "${packageModule}" }`)
    console.log(`🧬 Successfully wrote package.json to ${outDirectory}.`)
    process.exit(0)
  } catch {
    console.log("❌ Couldn't write the package.json file to the output directory.")
    process.exit(1)
  }
}

module.exports = {
  hybridize,
}
