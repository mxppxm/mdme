var assert = require('assert')
var jsdom = require('jsdom')
var sinon = require('sinon')
var mdme = require('../mdme.js')

describe('renderPage', function () {
  before(function () {
    // Ensure that commonmark is loaded.
    mdme.main()
  })

  it('content in textarea', function () {
    var html = '<textarea>Foo'

    global.window = new jsdom.JSDOM(html).window
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.renderPage()
    assert.strictEqual(global.window.document.body.innerHTML,
      '<main><p>Foo</p>\n</main>')

    delete global.window
  })

  it('content in body', function () {
    var html = 'Foo'

    global.window = new jsdom.JSDOM(html).window
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.renderPage()
    assert.strictEqual(global.window.document.body.innerHTML,
      '<main><p>Foo</p>\n</main>')

    delete global.window
  })

  it('implicit title from content', function () {
    var html = '<!DOCTYPE html><textarea>Foo\nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Foo')
  })

  it('remove leading and trailing spaces in implicit title', function () {
    var html = '<!DOCTYPE html><textarea> \n \tFoo\t \nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Foo')
  })

  it('remove leading and trailing hashes in implicit title', function () {
    var html = '<!DOCTYPE html><textarea>### Foo ###\nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Foo')
  })

  it('explicit title intact', function () {
    var html = '<!DOCTYPE html><title>Qux</title><textarea>Foo\nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Qux')
  })

  it('spaces and hashes intact in explicit title', function () {
    var html = '<!DOCTYPE html><title>### Qux ###</title><textarea>Foo'

    global.window = new jsdom.JSDOM(html).window

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, '### Qux ###')
  })

  it('explicit title intact', function () {
    var html = '<!DOCTYPE html><title>Qux</title><textarea>Foo\nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Qux')
  })

  it('on render page', function () {
    var html = '<textarea>Foo'
    var renderPageCallback = sinon.fake()

    global.window = new jsdom.JSDOM(html).window
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.setOption('onRenderPage', renderPageCallback)
    mdme.renderPage()

    delete global.window

    assert(renderPageCallback.called)
  })
})
