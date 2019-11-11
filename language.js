/*
 Language: Language
 Category: scripting
 Author: author <author@website.com>
 Description: Tell us what your language is all about.
*/
var module = module ? module : {}; // shim for browser use

function hljsDefineLanguage(hljs) {
    var IDENT_RE = '[A-Za-z_][0-9A-Za-z_]*';
    var KEYWORDS = {
      keyword:
        'if for while function do return void else break',
      literal:
        'define literals',
      built_in:
        'define builtins'
    };
    var EXPRESSIONS;
    var SYMBOL = {
      className: 'symbol',
      begin: 'symbol'
    };
    var NUMBER = {
      className: 'number',
      variants: [
        { begin: '\\b(0[bB][01]+)' },
        { begin: '\\b(0[oO][0-7]+)' },
        { begin: hljs.C_NUMBER_RE }
      ],
      relevance: 0
    };
    var SUBST = {
      className: 'subst',
      begin: '\\$\\{', end: '\\}',
      keywords: KEYWORDS,
      contains: []  // defined later
    };
    var TEMPLATE_STRING = {
      className: 'string',
      begin: '`', end: '`',
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ]
    };
    SUBST.contains = [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      TEMPLATE_STRING,
      NUMBER,
      hljs.REGEXP_MODE
    ];
    var PARAMS_CONTAINS = SUBST.contains.concat([
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]);
  
    return {
      aliases: ['language'],
      keywords: KEYWORDS,
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        TEMPLATE_STRING,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        SYMBOL,
        NUMBER,
        { // object attr container
          begin: /[{,]\s*/, relevance: 0,
          contains: [
            {
              begin: IDENT_RE + '\\s*:', returnBegin: true,
              relevance: 0,
              contains: [{className: 'attr', begin: IDENT_RE, relevance: 0}]
            }
          ]
        },
        { // "value" container
          begin: '(' + hljs.RE_STARTERS_RE + '|\\b(return)\\b)\\s*',
          keywords: 'return',
          contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.REGEXP_MODE,
            {
              className: 'function',
              begin: '(\\(.*?\\)|' + IDENT_RE + ')\\s*=>', returnBegin: true,
              end: '\\s*=>',
              contains: [
                {
                  className: 'params',
                  variants: [
                    {
                      begin: IDENT_RE
                    },
                    {
                      begin: /\(\s*\)/,
                    },
                    {
                      begin: /\(/, end: /\)/,
                      excludeBegin: true, excludeEnd: true,
                      keywords: KEYWORDS,
                      contains: PARAMS_CONTAINS
                    }
                  ]
                }
              ]
            }
          ],
          relevance: 0
        },
        {
          className: 'function',
          beginKeywords: 'function', end: /\{/, excludeEnd: true,
          contains: [
            hljs.inherit(hljs.TITLE_MODE, {begin: IDENT_RE}),
            {
              className: 'params',
              begin: /\(/, end: /\)/,
              excludeBegin: true,
              excludeEnd: true,
              contains: PARAMS_CONTAINS
            }
          ],
          illegal: /\[|%/
        },
        {
          begin: /\$[(.]/
        }
      ],
      illegal: /#(?!!)/
    };
}

module.exports = function(hljs) {
    hljs.registerLanguage("language", hljsDefineLanguage);
};
  
module.exports.definer = hljsDefineLanguage;
