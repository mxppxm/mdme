var assert = require('assert')
var jsdom = require('jsdom')
var commonmark = require('commonmark')
var sinon = require('sinon')
var mdme = require('../mdme.js')

describe('renderPage', function () {
  it('implicit title from content', function () {
    var html = '<!DOCTYPE html><textarea>Foo\nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Foo')
  })

  it('remove leading and trailing spaces in implicit title', function () {
    var html = '<!DOCTYPE html><textarea> \n \tFoo\t \nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Foo')
  })

  it('remove leading and trailing hashes in implicit title', function () {
    var html = '<!DOCTYPE html><textarea>### Foo ###\nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Foo')
  })

  it('explicit title intact', function () {
    var html = '<!DOCTYPE html><title>Qux</title><textarea>Foo\nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Qux')
  })

  it('spaces and hashes intact in explicit title', function () {
    var html = '<!DOCTYPE html><title>### Qux ###</title><textarea>Foo'

    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, '### Qux ###')
  })

  it('explicit title intact', function () {
    var html = '<!DOCTYPE html><title>Qux</title><textarea>Foo\nBar\nBaz'

    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.MathJax = { Hub: { Queue: sinon.fake() } }

    mdme.renderPage()

    assert.strictEqual(global.window.document.title, 'Qux')
  })

  /*
  it('in browser with render on load', function (done) {
    var html = '<!DOCTYPE html><textarea>Foo'
    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.MathJax = { Hub: { Queue: function () {} } } // mock
    global.window.mdme = {
      renderOnLoad: true,
      onRenderPage: function () {
        assert.notStrictEqual(typeof global.window.mdme, 'undefined')

        delete global.window
        delete global.MathJax

        done()
      }
    }

    mdme.renderPage()
  })

  it('in browser use mathjax', function (done) {
    var html = '<!DOCTYPE html><textarea>Foo'
    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.MathJax = { Hub: { Queue: function () {} } } // mock
    global.window.mdme = {
      onRenderPage: function () {
        delete global.window
        delete global.MathJax
        done()
      }
    }
    mdme.renderPage()
  })
  */
})
