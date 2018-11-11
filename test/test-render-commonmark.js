var assert = require('assert')
var mdme = require('../mdme.js')

describe('renderCommonMark', function () {
  before(function () {
    // Ensure that commonmark is loaded.
    mdme.main()
  })

  it('simple', function () {
    var input = '*Foo* **Bar** `Baz`'
    var expected = '<p><em>Foo</em> <strong>Bar</strong> <code>Baz</code></p>\n'
    assert.deepStrictEqual(mdme.render(input), expected)
  })
})
