MdMe
====

MdMe (pronounced em-dee-me) is a lightweight JavaScript-based utility to
create self-rendering Markdown documents.

[![View Demo][Demo SVG]][Demo URL]
[![Build Status][Travis CI SVG]][Travis CI URL]
[![Coverage Status][Coveralls SVG]][Coveralls URL]
[![NPM Version][Version SVG]][NPM URL] <!--
[![NPM Downloads][Downloads SVG]][NPM URL] -->
[![MIT License][License SVG]][L]

[Demo SVG]: https://img.shields.io/badge/view-demo-brightgreen.svg
[Demo URL]: https://opendocs.github.io/mdme/examples/e00-demo.html
[Travis CI SVG]: https://travis-ci.com/susam/mdme.svg?branch=master
[Travis CI URL]: https://travis-ci.com/susam/mdme
[Coveralls SVG]: https://coveralls.io/repos/github/susam/mdme/badge.svg?branch=master
[Coveralls URL]: https://coveralls.io/github/susam/mdme?branch=master
[Version SVG]: https://img.shields.io/npm/v/mdme.svg
[Downloads SVG]: https://img.shields.io/npm/dt/mdme.svg
[NPM URL]: https://www.npmjs.com/package/mdme
[License SVG]: https://img.shields.io/badge/license-MIT-blue.svg


Contents
--------

* [Get Started](#get-started)
* [CDN URLs](#cdn-urls)
* [Valid HTML5](#valid-html5)
* [Use MdMe in Web Pages](#use-mdme-in-web-pages)
  * [Style](#style)
  * [Skip Automatic Rendering on Load](#skip-automatic-rendering-on-load)
  * [Set Options After Loading](#set-options-after-loading)
* [Use MdMe as a Library](#use-mdme-as-a-library)
  * [Render Markdown](#render-markdown)
* [Configuration Options](#configuration-options)
* [License](#license)
* [Support](#support)


Get Started
-----------
Copy and paste the code below into an HTML file with `.html` as the
extension name:

    <!DOCTYPE html><script src="https://cdn.jsdelivr.net/npm/mdme@0.1.0"></script><textarea>

    # Atomic Theory

    **Atomic theory** is a scientific theory of the nature of matter, which
    states that matter is composed of discrete units called *atoms*. It
    began as a philosophical concept in ancient Greece and entered the
    scientific mainstream in the early 19th century when discoveries in the
    field of chemistry showed that matter did indeed behave as if it were
    made up of atoms.


    ## John Dalton

    Dalton believed atomic theory could explain why water absorbed different
    gases in different proportions - for example, he found that water
    absorbed carbon dioxide far better than it absorbed nitrogen.


    ## See Also

    See the Wikipedia article on [Atomic
    Theory](https://en.wikipedia.org/wiki/Atomic_theory) for more details.

This file contains one line of HTML code followed by Markdown content.

Open this HTML file with a web browser. It renders itself to look like
this:
[e01-get-started.html](https://opendocs.github.io/mdme/examples/e01-get-started.html).

The rendered document demonstrates two interesting features of MdMe:

  - It removes any leading and trailing whitespace in the content
    specified in `<textarea>` before rendering the document.
  - It uses the first non-empty line of the content in `<textarea>` to
    set the page title if no explicit `<title>` element is specified.


CDN URLs
--------

Use the following URL in the `<script>` tag to load version 0.1.0 (the
current version at this time) of MdMe:

    https://cdn.jsdelivr.net/npm/mdme@0.1.0

Use the following URL in the `<script>` tag to always load the latest
version of MdMe:

    https://cdn.jsdelivr.net/npm/mdme


Valid HTML5
-----------

The "get started" example in the previous section attempts to show how
we can create a self-rendering document with a single line of HTML code
but this brevity comes at the cost of standard conformance. For example,
the required `<title>` element is missing from the code. Further the
`<textarea>` element is not closed.

For the sake of completeness and correctness, here is a minimal but
complete and valid HTML5 example:

    <!DOCTYPE html>
    <html lang="en">
    <title>Notes on Atomic Theory</title>
    <script src="https://cdn.jsdelivr.net/npm/mdme@0.1.0"></script>
    <textarea>

    # Atomic Theory

    **Atomic theory** is a scientific theory of the nature of matter, which
    states that matter is composed of discrete units called *atoms*. It
    began as a philosophical concept in ancient Greece and entered the
    scientific mainstream in the early 19th century when discoveries in the
    field of chemistry showed that matter did indeed behave as if it were
    made up of atoms.

    </textarea>

Here is the output:
[e02-valid-html5.html](https://opendocs.github.io/mdme/examples/e02-valid-html5.html).

It has a few more lines of code to ensure that this HTML5 code validates
successfully at [validator.w3.org][VALIDATOR]. As a result, this example
does not look as concise as the one in the previous section.

In case you are wondering, a valid HTML5 document does not require
explicit `<head>`, `<body>`, or the closing `</html>` tags. So they have
been omitted for the sake of brevity while maintaining completeness and
correctness.

In practice though, it is not necessary to write verbose code like this.
All browsers follow the [robustness principle][ROBUSTNESS], so they
can render the shorter example in the previous section just fine.

[VALIDATOR]: https://validator.w3.org/#validate_by_input
[ROBUSTNESS]: https://en.wikipedia.org/wiki/Robustness_principle


Use MdMe in Web Pages
----------------------

### Style

MdMe renders the document on a white pane against a gray background by
default. This is due to a configuration option named `style` that is set
to `'viewer'` by default.

To render the document with a minimal style on a completely plain white
background, set the `style` configuration option to `'plain'`. Here is
an example:

    <!DOCTYPE html>
    <script>window.mdme = { style: 'plain' }</script>
    <script src="https://cdn.jsdelivr.net/npm/mdme@0.1.0"></script><textarea>

    # Atomic Theory

    **Atomic theory** is a scientific theory of the nature of matter, which
    states that matter is composed of discrete units called *atoms*. It
    began as a philosophical concept in ancient Greece and entered the
    scientific mainstream in the early 19th century when discoveries in the
    field of chemistry showed that matter did indeed behave as if it were
    made up of atoms.

Here is the output:
[e03-style-plain.html](https://opendocs.github.io/mdme/examples/e03-style-plain.html).

To render the document with absolutely no style, set `style` to
`'none'`. The `'none'` style option is useful to disable the default
`'viewer'` style set by MdMe before defining a custom style with
regular CSS code. Here is an example:

    <!DOCTYPE html>
    <script>window.mdme = { style: 'none' }</script>
    <script src="https://cdn.jsdelivr.net/npm/mdme@0.1.0"></script>
    <style>
    body {
      background: lightcyan;
    }
    main {
      max-width: 20em;
      padding: 1em;
      border: medium double gray;
      margin: 2em auto;
      background: lightyellow;
    }
    </style>
    <textarea>

    # Atomic Theory

    **Atomic theory** is a scientific theory of the nature of matter, which
    states that matter is composed of discrete units called *atoms*. It
    began as a philosophical concept in ancient Greece and entered the
    scientific mainstream in the early 19th century when discoveries in the
    field of chemistry showed that matter did indeed behave as if it were
    made up of atoms.

Here is the output:
[e04-style-custom.html](https://opendocs.github.io/mdme/examples/e04-style-custom.html).

Note that the rendered content is displayed within a `<main>` element
inside the `<body>`. That is why these elements are being styled in the
above example.


### Skip Automatic Rendering on Load

When MdMe loads, it begins rendering the document automatically. This
automatic rendering may be skipped by setting `renderOnLoad` option to
`false`. Here is an example that disables automatic rendering and then
invokes rendering later on the click of a button by using the
`mdme.renderPage()` function from the MdMe API:

    <!DOCTYPE html>
    <script>window.mdme = { renderOnLoad: false }</script>
    <script src="https://cdn.jsdelivr.net/npm/mdme@0.1.0"></script>
    <script>
    window.onload = function () {
      var button = document.getElementById('button')
      button.onclick = function () {
        button.remove()
        mdme.renderPage()
      }
    }
    </script>
    <textarea>

    # Atomic Theory

    **Atomic theory** is a scientific theory of the nature of matter, which
    states that matter is composed of discrete units called *atoms*. It
    began as a philosophical concept in ancient Greece and entered the
    scientific mainstream in the early 19th century when discoveries in the
    field of chemistry showed that matter did indeed behave as if it were
    made up of atoms.

    </textarea>
    <div><button id="button">Render</button></div>

Here is the output:
[e06-skip-render.html](https://opendocs.github.io/mdme/examples/e05-skip-render.html).


### Set Options After Loading

When we load MdMe with the `<script>` tag, it begins rendering the
document as soon as it loads. Therefore in the above examples, we define
the configuration options prior to loading MdMe. We do this by defining
an object named `window.mdme` with the configuration options defined as
properties in this project.

However if we set the `renderOnLoad` option to `false`, we prevent MdMe
from rendering the document after it loads. We now have the control to
invoke the rendering at a later time, e.g., on the click of a button. In
this case, it is possible to set configuration options after loading
MdMe with the `mdme.setOption()` function. This function takes two
parameters: option name as a string and option value.

Here is an example that skips automatic rendering on load and sets the
style to `'plain'` using this function:

    <!DOCTYPE html>
    <script>window.mdme = { renderOnLoad: false }</script>
    <script src="https://cdn.jsdelivr.net/npm/mdme@0.1.0"></script>
    <script>
    window.onload = function () {
      var button = document.getElementById('button')
      button.onclick = function () {
        button.remove()
        mdme.setOption('style', 'plain')
        mdme.renderPage()
      }
    }
    </script>
    <textarea>

    # Atomic Theory

    **Atomic theory** is a scientific theory of the nature of matter, which
    states that matter is composed of discrete units called *atoms*. It
    began as a philosophical concept in ancient Greece and entered the
    scientific mainstream in the early 19th century when discoveries in the
    field of chemistry showed that matter did indeed behave as if it were
    made up of atoms.

    </textarea>
    <div><button id="button">Render</button></div>

Here is the output:
[e07-set-options.html](https://opendocs.github.io/mdme/examples/e06-set-options.html).


Configuration Options
---------------------

Here is a quick reference for all the supported configuration options:

  - `style` (`'viewer'` by default): Three values are supported:
    `'viewer'`, `'plain'`, and `'none'`. The viewer style displays
    the rendered document on a white pane against a gray background. The
    plain style displays the content with a very minimal style that does
    not change the background style. If set to `'none'`, no style
    whatsoever is applied and the document is displayed with the
    browser's default style.

  - `renderOnLoad` (`true` by default): Begins rendering the document
    automatically on load when set to `true`. Skips rendering
    automatically when set to `false`.

  - `onRenderPage` (`undefined` by default): A callback function that is
    automatically invoked after MdMe completes rendering the page. It
    is guaranteed that MdMe has completed rendering the page before
    invoking this callback.


License
-------

This is free and open source software. You can use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of it,
under the terms of the MIT License. See [LICENSE.md][L] for details.

This software is provided "AS IS", WITHOUT WARRANTY OF ANY KIND,
express or implied. See [LICENSE.md][L] for details.

[L]: LICENSE.md


Support
-------

To report bugs, suggest improvements, or ask questions,
[create issues][ISSUES].

[ISSUES]: https://github.com/susam/mdme/issues
