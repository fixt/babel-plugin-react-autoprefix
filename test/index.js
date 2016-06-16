import assert from 'assert'
import fs from 'fs'
import path from 'path'

import * as Babel from 'babel-core'

function trim(str) {
  return str.replace(/^\s+|\s+$/, '')
}

describe('Autoprefix', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')

  fs.readdirSync(fixturesDir).map((caseName) => {
    it(caseName, () => {
      const fixtureDir = path.join(fixturesDir, caseName)
      const actualPath = path.join(fixtureDir, 'actual.js')
      const actual = Babel.transformFileSync(actualPath).code

      const expected = fs.readFileSync(
        path.join(fixtureDir, 'expected.js')
      ).toString()

      assert.equal(trim(actual), trim(expected))
    })
  })
})
