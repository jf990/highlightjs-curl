# highlightjs-language-template

A new language template set up when creating a language definition for highlightjs. See https://highlightjs.org/ for more information about highlight.js.

## Usage

This is a GitHub repository template for defining a new language for use with [highlightjs](https://highlightjs.org/). Follow [Language definition guide](https://highlightjs.readthedocs.io/en/latest/language-guide.html) to learn how to define a new language or improve an existing one.

Create a new repository using this template.

Update the README file to explain how to use your language.

Update `package.json`

Install the dependencies with `npm install`.

Rename `language.js` to your language name and follow the [Language definition guide](https://highlightjs.readthedocs.io/en/latest/language-guide.html) to learn how to define a new language. Typically we start with an existing language that is close and alter that JavaScript code to the new language.

Rename and update the unit test `spec/language-spec.js` to test your new language. Edit `input.txt` to cover specific test cases for your language. The code doesn't have to be real working code, but it does have to fully test your language constructs and keywords. Edit `expected.txt` to hold the anticipated correct highlighting HTML.

Run the test with `npm test`.

Once your language is working as expected, create an new language issue and a pull request at https://github.com/highlightjs/highlight.js/issues.
