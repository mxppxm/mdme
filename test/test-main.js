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
      useMathJax: false,
      onRenderPage: function () {
        delete global.window
      }
    }
    mdme.main()
    assert.notStrictEqual(typeof global.window.mdme, 'undefined')
    assert.strictEqual(typeof global.window.mdme.render, 'function')
  })

  it('render on load enabled', function (done) {
    var html = '<!DOCTYPE html><textarea>Foo'
    global.window = new jsdom.JSDOM(html).window
    global.window.commonmark = commonmark

    global.window.mdme = {
      useMathJax: false,
      onRenderPage: function () {
        var textareaList = window.document.getElementsByTagName('textarea')
        var mainList = window.document.getElementsByTagName('main')

        assert.strictEqual(textareaList.length, 0)
        assert.strictEqual(mainList.length, 1)

        delete global.window
        delete global.MathJax

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
      var textareaList = window.document.getElementsByTagName('textarea')
      var mainList = window.document.getElementsByTagName('main')

      assert.strictEqual(textareaList.length, 1)
      assert.strictEqual(mainList.length, 0)

      delete global.window

      done()
    }, 25)
  })
})
