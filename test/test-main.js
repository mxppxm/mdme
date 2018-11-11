var assert = require('assert')
var url = require('url')
var jsdom = require('jsdom')
var commonmark = require('commonmark')
var mdme = require('../mdme.js')

describe('main', function () {
  afterEach(function () {
    // Reset the internal commonmark variable to the commonmark object
    // imported with the require() call to ensure that no fake
    // commonmark object lingers around.
    mdme.main()
  })

  it('mdme definition in browser', function () {
    var html = '<!DOCTYPE html><textarea>Foo'
    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark
    global.window.mdme = {
      onRenderPage: function () {
        delete global.window
      }
    }
    mdme.main()
    assert.notStrictEqual(typeof global.window.mdme, 'undefined')
    assert.strictEqual(typeof global.window.mdme.render, 'function')
  })

  it('commonmark definition in browser', function (done) {
    var html = '<!DOCTYPE html><textarea>Foo'
    var options = {
      url: url.resolve('file:///', __filename),
      runScripts: 'dangerously',
      resources: 'usable'
    }
    global.window = new jsdom.JSDOM(html, options).window
    global.window.mdme = {
      useMathJax: false,
      commonmarkURL: 'aux/fakecommonmark.js',
      onRenderPage: function () {
        assert.notStrictEqual(typeof global.window.commonmark, 'undefined')
        delete global.window
        done()
      }
    }
    mdme.main()
  })

  it('render on load enabled', function (done) {
    var html = '<!DOCTYPE html><textarea>Foo'
    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark

    global.window.mdme = {
      onRenderPage: function () {
        delete global.window
        done()
      }
    }

    mdme.main()
  })

  it('render on load disabled', function (done) {
    var html = '<!DOCTYPE html><textarea>Foo'
    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark

    global.window.mdme = { renderOnLoad: false }

    mdme.main()

    setTimeout(function () {
      delete global.window
      done()
    }, 25)
  })
})
