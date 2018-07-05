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
(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("velocity",function(){function e(b){var a={};b=b.split(" ");for(var d=0;d<b.length;++d)a[b[d]]=!0;return a}function f(b,a,d){a.tokenize=d;return d(b,a)}function g(b,a){var d=a.beforeParams;a.beforeParams=!1;var c=b.next();if("'"==c&&a.inParams)return a.lastTokenWasBuiltin=!1,f(b,a,k(c));if('"'==
c){a.lastTokenWasBuiltin=!1;if(a.inString)return a.inString=!1,"string";if(a.inParams)return f(b,a,k(c))}else{if(/[\[\]{}\(\),;\.]/.test(c))return"("==c&&d?a.inParams=!0:")"==c&&(a.inParams=!1,a.lastTokenWasBuiltin=!0),null;if(/\d/.test(c))return a.lastTokenWasBuiltin=!1,b.eatWhile(/[\w\.]/),"number";if("#"==c&&b.eat("*"))return a.lastTokenWasBuiltin=!1,f(b,a,p);if("#"==c&&b.match(/ *\[ *\[/))return a.lastTokenWasBuiltin=!1,f(b,a,q);if("#"==c&&b.eat("#"))return a.lastTokenWasBuiltin=!1,b.skipToEnd(),
"comment";if("$"==c){b.eatWhile(/[\w\d\$_\.{}]/);if(l&&l.propertyIsEnumerable(b.current()))return"keyword";a.lastTokenWasBuiltin=!0;a.beforeParams=!0;return"builtin"}if(m.test(c))return a.lastTokenWasBuiltin=!1,b.eatWhile(m),"operator";b.eatWhile(/[\w\$_{}@]/);d=b.current();if(n&&n.propertyIsEnumerable(d))return"keyword";if(h&&h.propertyIsEnumerable(d)||b.current().match(/^#@?[a-z0-9_]+ *$/i)&&"("==b.peek()&&(!h||!h.propertyIsEnumerable(d.toLowerCase())))return a.beforeParams=!0,a.lastTokenWasBuiltin=
!1,"keyword";if(a.inString)return a.lastTokenWasBuiltin=!1,"string";if(b.pos>d.length&&"."==b.string.charAt(b.pos-d.length-1)&&a.lastTokenWasBuiltin)return"builtin";a.lastTokenWasBuiltin=!1;return null}}function k(b){return function(a,d){for(var c=!1,e,f=!1;null!=(e=a.next());){if(e==b&&!c){f=!0;break}if('"'==b&&"$"==a.peek()&&!c){f=d.inString=!0;break}c=!c&&"\\"==e}f&&(d.tokenize=g);return"string"}}function p(b,a){for(var d=!1,c;c=b.next();){if("#"==c&&d){a.tokenize=g;break}d="*"==c}return"comment"}
function q(b,a){for(var d=0,c;c=b.next();){if("#"==c&&2==d){a.tokenize=g;break}"]"==c?d++:" "!=c&&(d=0)}return"meta"}var n=e("#end #else #break #stop #[[ #]] #{end} #{else} #{break} #{stop}"),h=e("#if #elseif #foreach #set #include #parse #macro #define #evaluate #{if} #{elseif} #{foreach} #{set} #{include} #{parse} #{macro} #{define} #{evaluate}"),l=e("$foreach.count $foreach.hasNext $foreach.first $foreach.last $foreach.topmost $foreach.parent.count $foreach.parent.hasNext $foreach.parent.first $foreach.parent.last $foreach.parent $velocityCount $!bodyContent $bodyContent"),
m=/[+\-*&%=<>!?:\/|]/;return{startState:function(){return{tokenize:g,beforeParams:!1,inParams:!1,inString:!1,lastTokenWasBuiltin:!1}},token:function(b,a){return b.eatSpace()?null:a.tokenize(b,a)},blockCommentStart:"#*",blockCommentEnd:"*#",lineComment:"##",fold:"velocity"}});e.defineMIME("text/velocity","velocity")});
