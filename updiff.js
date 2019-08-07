#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const dnstreamPath = path.normalize(__dirname)
const upstreamPath = path.normalize(path.join(__dirname, '..', 'mdme'))

const dnstreamCode = fs.readFileSync('mdme.js', 'utf8')
const upstreamCode = fs.readFileSync('../texme/texme.js', 'utf8')

const replacePatterns = [
  ['mdme', 'texme'],
  ['MdMe', 'TeXMe'],
]

function main() {
  const paths = [path.join(dnstreamPath, 'texme.js')]
  for (const path of paths) {
    console.log(path)
  }
}

if (require.main == module) {
  main()
}
