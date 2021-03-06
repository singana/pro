/*

Copyright (C) 2015 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("coffeescript",function(f,s){function k(a){return new RegExp("^(("+a.join(")|(")+"))\\b")}function h(a,b){if(a.sol()){null===b.scope.align&&(b.scope.align=!1);var c=b.scope.offset;if(a.eatSpace()){var d=a.indentation();return d>c&&"coffee"==b.scope.type?"indent":d<c?"dedent":null}0<c&&m(a,
b)}if(a.eatSpace())return null;c=a.peek();if(a.match("####"))return a.skipToEnd(),"comment";if(a.match("###"))return b.tokenize=t,b.tokenize(a,b);if("#"===c)return a.skipToEnd(),"comment";if(a.match(/^-?[0-9\.]/,!1)){c=!1;a.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i)&&(c=!0);a.match(/^-?\d+\.\d*/)&&(c=!0);a.match(/^-?\.\d+/)&&(c=!0);if(c)return"."==a.peek()&&a.backUp(1),"number";c=!1;a.match(/^-?0x[0-9a-f]+/i)&&(c=!0);a.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/)&&(c=!0);a.match(/^-?0(?![\dx])/i)&&(c=!0);if(c)return"number"}if(a.match(u))return b.tokenize=
p(a.current(),!1,"string"),b.tokenize(a,b);if(a.match(v)){if("/"!=a.current()||a.match(/^.*\//,!1))return b.tokenize=p(a.current(),!0,"string-2"),b.tokenize(a,b);a.backUp(1)}if(a.match(w)||a.match(x))return"operator";if(a.match(y))return"punctuation";if(a.match(z))return"atom";if(a.match(A)||b.prop&&a.match(q))return"property";if(a.match(B))return"keyword";if(a.match(q))return"variable";a.next();return"error"}function p(a,b,c){return function(d,e){for(;!d.eol();)if(d.eatWhile(/[^'"\/\\]/),d.eat("\\")){if(d.next(),
b&&d.eol())return c}else{if(d.match(a))return e.tokenize=h,c;d.eat(/['"\/]/)}b&&(s.singleLineStringErrors?c="error":e.tokenize=h);return c}}function t(a,b){for(;!a.eol();){a.eatWhile(/[^#]/);if(a.match("###")){b.tokenize=h;break}a.eatWhile("#")}return"comment"}function n(a,b,c){c=c||"coffee";for(var d=0,e=!1,r=null,g=b.scope;g;g=g.prev)if("coffee"===g.type||"}"==g.type){d=g.offset+f.indentUnit;break}"coffee"!==c?(e=null,r=a.column()+a.current().length):b.scope.align&&(b.scope.align=!1);b.scope={offset:d,
type:c,prev:b.scope,align:e,alignOffset:r}}function m(a,b){if(b.scope.prev){if("coffee"===b.scope.type){for(var c=a.indentation(),d=!1,e=b.scope;e;e=e.prev)if(c===e.offset){d=!0;break}if(!d)return!0;for(;b.scope.prev&&b.scope.offset!==c;)b.scope=b.scope.prev}else b.scope=b.scope.prev;return!1}}var w=/^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/,y=/^(?:[()\[\]{},:`=;]|\.\.?\.?)/,q=/^[_A-Za-z$][_A-Za-z$0-9]*/,A=/^@[_A-Za-z$][_A-Za-z$0-9]*/,
x=k("and or not is isnt in instanceof typeof".split(" ")),l="for while loop if unless else switch try catch finally class".split(" "),B=k(l.concat("break by continue debugger delete do in of new return then this @ throw when until extends".split(" "))),l=k(l),u=/^('{3}|\"{3}|['\"])/,v=/^(\/{3}|\/)/,z=k("Infinity NaN undefined null true false on off yes no".split(" "));return{startState:function(a){return{tokenize:h,scope:{offset:a||0,type:"coffee",prev:null,align:!1},prop:!1,dedent:0}},token:function(a,
b){var c=null===b.scope.align&&b.scope;c&&a.sol()&&(c.align=!1);var d;d=b.tokenize(a,b);var e=a.current();"return"===e&&(b.dedent=!0);(("->"===e||"=>"===e)&&a.eol()||"indent"===d)&&n(a,b);var f="[({".indexOf(e);-1!==f&&n(a,b,"])}".slice(f,f+1));l.exec(e)&&n(a,b);"then"==e&&m(a,b);if("dedent"===d&&m(a,b))d="error";else{f="])}".indexOf(e);if(-1!==f){for(;"coffee"==b.scope.type&&b.scope.prev;)b.scope=b.scope.prev;b.scope.type==e&&(b.scope=b.scope.prev)}b.dedent&&a.eol()&&("coffee"==b.scope.type&&b.scope.prev&&
(b.scope=b.scope.prev),b.dedent=!1)}d&&"comment"!=d&&(c&&(c.align=!0),b.prop="punctuation"==d&&"."==a.current());return d},indent:function(a,b){if(a.tokenize!=h)return 0;var c=a.scope,d=b&&-1<"])}".indexOf(b.charAt(0));if(d)for(;"coffee"==c.type&&c.prev;)c=c.prev;d=d&&c.type===b.charAt(0);return c.align?c.alignOffset-(d?1:0):(d?c.prev:c).offset},lineComment:"#",fold:"indent"}});f.defineMIME("text/x-coffeescript","coffeescript");f.defineMIME("text/coffeescript","coffeescript")});
