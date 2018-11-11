var assert = require('assert')
var mdme = require('../mdme.js')

describe('render', function () {
  before(function () {
    // Ensure that commonmark is loaded.
    mdme.main()
  })

  it('markdown', function () {
    var input = '*Foo* **Bar** `Baz`'
    var expected = '<p><em>Foo</em> <strong>Bar</strong> <code>Baz</code></p>\n'
    assert.deepStrictEqual(mdme.render(input), expected)
  })
})
