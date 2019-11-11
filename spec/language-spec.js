const hljs = require("highlight.js/lib/highlight");
const { definer: language } = require("../language");
const fs = require("fs");
const path = require("path");
hljs.registerLanguage("language", language);

describe("respec-highlight bundle", () => {
  it("defines language", () => {

    // highlight has language defined
    const language = hljs.getLanguage("language");
    expect(language).toBeDefined();

  });

  it("highlights language", () => {

    // read the test data
    const input = fs.readFileSync(
      path.resolve(__dirname, "./input.txt"),
      "utf-8"
    );

    // highlight the test data
    const { value: result, language } = hljs.highlightAuto(input, [
      "language",
    ]);
    expect(language).toBe("language");

    // verify the highlighting is what is expected
    const expected = fs.readFileSync(
      path.resolve(__dirname, "./expected.txt"),
      "utf-8"
    );
    expect(result).toBe(expected);
  });
});
