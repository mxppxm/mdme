Changelog
=========

0.3.0 (2018-11-22)
------------------
### Added
- Load commonmark.min.js instead of commonmark.js.

### Fixed
- Do not let image width exceed the width of content.
- Ensure that `commonmark` is defined as soon as it loads so that
  calling `render()` directly with `renderOnLoad` option set as `false`
  does not lead to an error due to undefined `commonmark`.


0.2.0 (2018-10-27)
------------------
### Added
- Allow content to be written directly in the body without `<textarea>`.
- Support MdMe `<script>` tag at the end of the document.


0.1.0 (2018-10-26)
------------------
### Added
- Fork from TeXMe to create MdMe.
- Reduce the scope of this project to rendering Markdown only.
