var assert = require('assert')
var jsdom = require('jsdom')
var commonmark = require('commonmark')
var mdme = require('../mdme.js')

describe('main', function () {
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
    var options = { runScripts: 'dangerously', resources: 'usable' }
    global.window = new jsdom.JSDOM(html, options).window
    global.window.mdme = { useMathJax: false }
    mdme.main()

    // Allow sometime for commonmark to load. This is a hack to
    // workaround an issue in JSDOM due to which it fires the
    // window.onload event (which leads to renderPage and onRenderPage
    // calls) before all the script elements have been loaded. Therefore
    // we cannot put our test in onRenderPage callback like it is done
    // in the other tests.
    setTimeout(function () {
      assert.notStrictEqual(typeof global.window.commonmark, 'undefined')
      delete global.window
      done()
    }, 1800)
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
