(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["div2"] = factory();
	else
		root["div2"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AssignmentExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BinaryExpression; });
/* unused harmony export BlockStatement */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BreakStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CallExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ConditionalExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ExpressionStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return FunctionDeclaration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return Identifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return Literal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return LogicalExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return MemberExpression; });
/* unused harmony export ObjectExpression */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return Program; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return ReturnStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return SwitchCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return SwitchStatement; });
/* unused harmony export UnaryExpression */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return VariableDeclaration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return VariableDeclarator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return WhileStatement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return fromJson; });
function Node() { }
Node.prototype.pojo = function () {
    return JSON.parse(JSON.stringify(this));
};
function AssignmentExpression(left, right, operator) {
    operator = operator || '=';
    this.type = 'AssignmentExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
}
inherits(AssignmentExpression, Node);
function ArrayExpression(elements) {
    this.type = 'ArrayExpression';
    this.elements = elements || [];
}
inherits(AssignmentExpression, Node);
function BinaryExpression(left, right, operator) {
    this.type = 'BinaryExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
}
inherits(BinaryExpression, Node);
function BlockStatement(statements) {
    if (!Array.isArray(statements)) {
        statements = [statements];
    }
    this.type = 'BlockStatement';
    this.body = statements;
}
inherits(BlockStatement, Node);
function BreakStatement(label) {
    this.type = 'BreakStatement';
    this.label = label || null;
}
inherits(BreakStatement, Node);
function CallExpression(callee, args) {
    this.type = 'CallExpression';
    this.callee = callee;
    this.arguments = args || [];
}
inherits(CallExpression, Node);
function ConditionalExpression(test, consequent, alternate) {
    this.type = 'ConditionalExpression';
    this.test = test;
    this.consequent = consequent;
    this.alternate = alternate;
}
inherits(ConditionalExpression, Node);
function ExpressionStatement(expression) {
    this.type = 'ExpressionStatement';
    this.expression = expression;
}
inherits(ExpressionStatement, Node);
/* jshint maxparams: 6 */
function FunctionDeclaration(id, params, defaults, body, generator, expression) {
    this.type = 'FunctionDeclaration';
    this.id = id || null;
    this.params = params || [];
    this.defaults = defaults || [];
    this.body = new BlockStatement(body);
    this.generator = generator || false;
    this.expression = expression || false;
}
inherits(FunctionDeclaration, Node);
function Identifier(name) {
    this.type = 'Identifier';
    this.name = name;
}
inherits(Identifier, Node);
function Literal(value) {
    if (typeof value === 'number' && value < 0) {
        throw new Error('Can not construct negative literals. Negative literals are ' +
            'formed by negating a positive literal. Use `Literal.for()` which ' +
            'return either a literal or an expression for a negative literal.');
    }
    this.type = 'Literal';
    this.value = value;
    this.raw = JSON.stringify(value);
}
inherits(Literal, Node);
Literal.for = function (value) {
    if (typeof value === 'number' && value < 0) {
        return new UnaryExpression(new Literal(Math.abs(value)), '-');
    }
    return new Literal(value);
};
function LogicalExpression(left, right, operator) {
    this.type = 'LogicalExpression';
    this.operator = operator;
    this.left = left;
    this.right = right;
}
inherits(LogicalExpression, Node);
function MemberExpression(object, property, computed) {
    this.type = 'MemberExpression',
        this.computed = computed || false;
    this.object = object;
    this.property = property;
}
inherits(MemberExpression, Node);
function ObjectExpression(properties) {
    this.type = 'ObjectExpression';
    this.properties = properties;
}
inherits(ObjectExpression, Node);
function Program(body) {
    this.type = 'Program';
    this.body = body;
}
inherits(Program, Node);
function ReturnStatement(expression) {
    this.type = 'ReturnStatement';
    this.argument = expression || null;
}
inherits(ReturnStatement, Node);
function SwitchCase(test, sentences) {
    this.type = 'SwitchCase';
    this.test = test;
    this.consequent = sentences || [];
}
inherits(SwitchCase, Node);
function SwitchStatement(discriminant, cases) {
    this.type = 'SwitchStatement';
    this.discriminant = discriminant;
    this.cases = cases || [];
}
inherits(SwitchStatement, Node);
function UnaryExpression(argument, operator, prefix) {
    this.type = 'UnaryExpression';
    this.operator = operator;
    this.argument = argument;
    this.prefix = typeof prefix === 'undefined' ? true : prefix;
}
inherits(UnaryExpression, Node);
function VariableDeclaration(declarations, kind) {
    if (!Array.isArray(declarations)) {
        declarations = [declarations];
    }
    this.type = 'VariableDeclaration';
    this.declarations = declarations;
    this.kind = kind || 'var';
}
inherits(VariableDeclaration, Node);
function VariableDeclarator(id, init) {
    this.type = 'VariableDeclarator';
    this.id = id;
    this.init = init;
}
inherits(VariableDeclarator, Node);
function WhileStatement(condition, statements) {
    this.type = 'WhileStatement';
    this.test = condition;
    this.body = new BlockStatement(statements);
}
inherits(WhileStatement, Node);
function inherits(klass, base) {
    klass.prototype = Object.create(base.prototype);
    klass.prototype.constructor = klass;
}
function fromJson(json) {
    var type = typeof json;
    var isJsonSerializable = ['function', 'undefined'].indexOf(type) === -1;
    if (!isJsonSerializable) {
        return undefined;
    }
    if (Array.isArray(json)) {
        var elements = json.map(function (item) {
            var value = fromJson(item);
            if (typeof value === 'undefined') {
                return new Literal(null);
            }
            return value;
        });
        return new ArrayExpression(elements);
    }
    else if (type === 'object') {
        var properties = Object.keys(json)
            .map(function (key) {
            var value = fromJson(json[key]);
            if (typeof value === 'undefined') {
                return undefined;
            }
            return {
                type: 'Property',
                key: Literal['for'](key),
                computed: false,
                value: value,
                kind: 'init',
                method: false,
                shorthand: false
            };
        })
            .filter(function (property) {
            return typeof property !== 'undefined';
        });
        return new ObjectExpression(properties);
    }
    else {
        return Literal['for'](json);
    }
}



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 7], $V1 = [1, 9], $V2 = [5, 37], $V3 = [9, 23, 38, 40, 41, 71, 74, 82, 84, 98, 99, 101, 105, 106, 108, 109, 110, 114, 115, 120, 121, 124, 125, 126, 129, 130, 131, 132, 133, 134, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146], $V4 = [18, 20, 21, 42], $V5 = [40, 41], $V6 = [20, 21, 42], $V7 = [15, 18, 20, 21, 42], $V8 = [21, 42], $V9 = [15, 20, 21, 27, 28, 29, 30, 31, 32, 33, 34, 35, 42], $Va = [2, 16], $Vb = [1, 32], $Vc = [2, 12], $Vd = [2, 20], $Ve = [1, 36], $Vf = [1, 37], $Vg = [1, 38], $Vh = [1, 39], $Vi = [1, 40], $Vj = [1, 41], $Vk = [1, 42], $Vl = [1, 43], $Vm = [1, 44], $Vn = [1, 48], $Vo = [1, 73], $Vp = [1, 71], $Vq = [1, 72], $Vr = [1, 62], $Vs = [1, 63], $Vt = [1, 64], $Vu = [1, 65], $Vv = [1, 66], $Vw = [1, 67], $Vx = [1, 68], $Vy = [1, 77], $Vz = [1, 90], $VA = [1, 92], $VB = [1, 93], $VC = [1, 94], $VD = [1, 95], $VE = [1, 96], $VF = [1, 97], $VG = [1, 98], $VH = [1, 99], $VI = [1, 100], $VJ = [1, 101], $VK = [1, 102], $VL = [1, 103], $VM = [9, 40, 41, 71, 74, 82, 84, 99], $VN = [9, 40, 41, 71, 74, 82, 84, 99, 108, 109, 110, 114, 115, 120, 121, 124, 125, 126, 129, 130, 131, 132, 133, 134], $VO = [2, 119], $VP = [9, 40, 41, 71, 74, 82, 84, 99, 129, 130, 131, 132, 133, 134], $VQ = [1, 127], $VR = [1, 128], $VS = [1, 129], $VT = [9, 23, 40, 41, 71, 74, 82, 84, 99, 108, 109, 110, 114, 115, 120, 121, 124, 125, 126, 129, 130, 131, 132, 133, 134, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146], $VU = [9, 40, 41, 71, 74, 82, 84, 99, 124, 125, 126, 129, 130, 131, 132, 133, 134], $VV = [1, 137], $VW = [1, 138], $VX = [9, 15, 23, 38, 40, 41, 71, 74, 82, 84, 95, 96, 98, 99, 101, 105, 106, 107, 108, 109, 110, 111, 114, 115, 120, 121, 124, 125, 126, 129, 130, 131, 132, 133, 134, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146], $VY = [15, 38, 95, 96, 105, 106, 107, 108, 109, 110, 111], $VZ = [9, 40, 41, 71, 74, 82, 84, 99, 120, 121, 124, 125, 126, 129, 130, 131, 132, 133, 134], $V_ = [1, 140], $V$ = [1, 141], $V01 = [9, 40, 41, 71, 74, 82, 84, 99, 109, 110, 120, 121, 124, 125, 126, 129, 130, 131, 132, 133, 134], $V11 = [1, 144], $V21 = [1, 145], $V31 = [1, 146], $V41 = [5, 15, 37, 38, 44, 47, 60, 61, 62, 63, 64, 69, 72, 75, 76, 79, 80, 81, 85, 91, 92, 93, 95, 96, 105, 106, 107, 108, 109, 110, 111], $V51 = [1, 147], $V61 = [15, 38, 44, 47, 60, 61, 62, 63, 64, 75, 76, 79, 80, 81, 85, 91, 92, 93, 95, 96, 105, 106, 107, 108, 109, 110, 111], $V71 = [1, 163], $V81 = [9, 15, 38, 44, 47, 60, 61, 62, 63, 64, 75, 76, 79, 80, 81, 85, 91, 92, 93, 95, 96, 105, 106, 107, 108, 109, 110, 111], $V91 = [1, 200], $Va1 = [9, 40, 41], $Vb1 = [9, 15, 38, 95, 96, 105, 106, 107, 108, 109, 110, 111], $Vc1 = [1, 223], $Vd1 = [1, 221], $Ve1 = [15, 38, 40, 95, 96, 105, 106, 107, 108, 109, 110, 111], $Vf1 = [15, 38, 44, 60, 61, 62, 63, 64, 75, 76, 80, 81, 85, 91, 92, 93, 95, 96, 105, 106, 107, 108, 109, 110, 111], $Vg1 = [44, 69, 72], $Vh1 = [41, 71];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "translation_unit": 3, "program": 4, "EOF": 5, "process_list": 6, "PROGRAM": 7, "id": 8, ";": 9, "const_block": 10, "global_block": 11, "local_block": 12, "private_block": 13, "body": 14, "NAME": 15, "CONST": 16, "const_declaration_list": 17, "GLOBAL": 18, "declaration_list": 19, "LOCAL": 20, "PRIVATE": 21, "const_declaration": 22, "=": 23, "expression": 24, "declaration": 25, "type": 26, "INT_POINTER": 27, "INT": 28, "WORD_POINTER": 29, "WORD": 30, "BYTE_POINTER": 31, "BYTE": 32, "STRING_POINTER": 33, "STRING": 34, "STRUCT_POINTER": 35, "process": 36, "PROCESS": 37, "(": 38, "param_list": 39, ")": 40, ",": 41, "BEGIN": 42, "group_of_sentences": 43, "END": 44, "sentence_list": 45, "group_of_sentences_for_if_else": 46, "ELSE": 47, "sentence": 48, "if_sentence": 49, "switch_sentence": 50, "while_sentence": 51, "repeat_sentence": 52, "opt_end": 53, "loop_sentence": 54, "from_sentence": 55, "for_sentence": 56, "return_sentence": 57, "frame_sentence": 58, "clone_sentence": 59, "DEBUG": 60, "BREAK": 61, "CONTINUE": 62, "IF": 63, "SWITCH": 64, "group_of_cases": 65, "default": 66, "case_list": 67, "case": 68, "CASE": 69, "list_of_ranges": 70, ":": 71, "DEFAULT": 72, "range": 73, "..": 74, "WHILE": 75, "REPEAT": 76, "group_of_sentences_for_repeat": 77, "until_condition": 78, "UNTIL": 79, "LOOP": 80, "FROM": 81, "TO": 82, "step": 83, "STEP": 84, "FOR": 85, "for_params": 86, "initialization": 87, "condition": 88, "increment": 89, "expression_list": 90, "RETURN": 91, "FRAME": 92, "CLONE": 93, "primary_expression": 94, "STRING_LITERAL": 95, "NUMBER": 96, "postfix_expression": 97, "[": 98, "]": 99, "call_expression": 100, ".": 101, "update_operator": 102, "unary_expression": 103, "unary_operator": 104, "++": 105, "--": 106, "&": 107, "*": 108, "+": 109, "-": 110, "!": 111, "multiplicative_expression": 112, "multiplicative_operator": 113, "/": 114, "%": 115, "additive_expression": 116, "additive_operator": 117, "shift_expression": 118, "shift_operator": 119, "<<": 120, ">>": 121, "logical_expression": 122, "logical_operator": 123, "||": 124, "&&": 125, "^": 126, "relational_expression": 127, "relational_operator": 128, "<": 129, ">": 130, "<=": 131, ">=": 132, "==": 133, "!=": 134, "assignment_expression": 135, "assignment_operator": 136, "*=": 137, "/=": 138, "%=": 139, "+=": 140, "-=": 141, "<<=": 142, ">>=": 143, "&=": 144, "^=": 145, "|=": 146, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "PROGRAM", 9: ";", 15: "NAME", 16: "CONST", 18: "GLOBAL", 20: "LOCAL", 21: "PRIVATE", 23: "=", 27: "INT_POINTER", 28: "INT", 29: "WORD_POINTER", 30: "WORD", 31: "BYTE_POINTER", 32: "BYTE", 33: "STRING_POINTER", 34: "STRING", 35: "STRUCT_POINTER", 37: "PROCESS", 38: "(", 40: ")", 41: ",", 42: "BEGIN", 44: "END", 47: "ELSE", 60: "DEBUG", 61: "BREAK", 62: "CONTINUE", 63: "IF", 64: "SWITCH", 69: "CASE", 71: ":", 72: "DEFAULT", 74: "..", 75: "WHILE", 76: "REPEAT", 79: "UNTIL", 80: "LOOP", 81: "FROM", 82: "TO", 84: "STEP", 85: "FOR", 91: "RETURN", 92: "FRAME", 93: "CLONE", 95: "STRING_LITERAL", 96: "NUMBER", 98: "[", 99: "]", 101: ".", 105: "++", 106: "--", 107: "&", 108: "*", 109: "+", 110: "-", 111: "!", 114: "/", 115: "%", 120: "<<", 121: ">>", 124: "||", 125: "&&", 126: "^", 129: "<", 130: ">", 131: "<=", 132: ">=", 133: "==", 134: "!=", 137: "*=", 138: "/=", 139: "%=", 140: "+=", 141: "-=", 142: "<<=", 143: ">>=", 144: "&=", 145: "^=", 146: "|=" },
        productions_: [0, [3, 2], [3, 3], [4, 8], [8, 1], [10, 2], [10, 0], [11, 2], [11, 0], [12, 2], [12, 0], [13, 2], [13, 0], [17, 0], [17, 2], [22, 4], [19, 0], [19, 2], [25, 5], [25, 3], [26, 0], [26, 1], [26, 1], [26, 1], [26, 1], [26, 1], [26, 1], [26, 1], [26, 1], [26, 1], [6, 1], [6, 2], [36, 8], [39, 0], [39, 1], [39, 3], [14, 2], [43, 1], [43, 2], [46, 1], [46, 2], [48, 1], [48, 1], [48, 1], [48, 2], [48, 1], [48, 1], [48, 1], [48, 2], [48, 2], [48, 1], [48, 2], [48, 2], [48, 2], [48, 2], [53, 0], [53, 1], [49, 5], [49, 6], [50, 5], [45, 1], [45, 2], [65, 1], [65, 2], [65, 2], [65, 3], [67, 1], [67, 2], [68, 4], [66, 3], [70, 1], [70, 3], [73, 1], [73, 3], [51, 5], [52, 2], [77, 1], [77, 2], [78, 4], [54, 2], [55, 9], [83, 0], [83, 2], [56, 3], [86, 4], [87, 1], [87, 2], [88, 1], [88, 2], [89, 1], [89, 2], [57, 1], [57, 4], [58, 1], [58, 4], [59, 2], [90, 1], [90, 3], [94, 1], [94, 1], [94, 1], [94, 3], [97, 1], [97, 4], [97, 1], [97, 3], [97, 2], [100, 3], [100, 4], [103, 1], [103, 2], [103, 2], [102, 1], [102, 1], [104, 1], [104, 1], [104, 1], [104, 1], [104, 1], [112, 1], [112, 3], [113, 1], [113, 1], [113, 1], [116, 1], [116, 3], [117, 1], [117, 1], [118, 1], [118, 3], [119, 1], [119, 1], [122, 1], [122, 3], [123, 1], [123, 1], [123, 1], [127, 1], [127, 3], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [135, 1], [135, 3], [136, 1], [136, 1], [136, 1], [136, 1], [136, 1], [136, 1], [136, 1], [136, 1], [136, 1], [136, 1], [136, 1], [24, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    this.$ = {
                        type: "Unit",
                        program: $$[$0 - 1],
                        processes: []
                    };
                    return this.$;
                    break;
                case 2:
                    this.$ = {
                        type: "Unit",
                        program: $$[$0 - 2],
                        processes: $$[$0 - 1]
                    };
                    return this.$;
                    break;
                case 3:
                    this.$ = {
                        type: "Program",
                        name: $$[$0 - 6],
                        consts: $$[$0 - 4],
                        globals: $$[$0 - 3],
                        locals: $$[$0 - 2],
                        privates: $$[$0 - 1],
                        body: $$[$0]
                    };
                    break;
                case 4:
                    this.$ = { type: "Identifier", name: $$[$0] };
                    break;
                case 5:
                    this.$ = {
                        type: "ConstDeclarations",
                        declarations: $$[$0]
                    };
                    break;
                case 6:
                case 8:
                case 10:
                case 12:
                    this.$ = null;
                    break;
                case 7:
                    this.$ = {
                        type: "GlobalDeclarations",
                        declarations: $$[$0]
                    };
                    break;
                case 9:
                    this.$ = {
                        type: "LocalDeclarations",
                        declarations: $$[$0]
                    };
                    break;
                case 11:
                    this.$ = {
                        type: "PrivateDeclarations",
                        declarations: $$[$0]
                    };
                    break;
                case 13:
                case 16:
                case 33:
                case 37:
                case 39:
                case 62:
                case 85:
                case 87:
                case 89:
                    this.$ = [];
                    break;
                case 14:
                case 17:
                    this.$ = $$[$0 - 1].concat([$$[$0]]);
                    break;
                case 15:
                    // TODO: I think consts are actually MACROS
                    this.$ = {
                        type: "ConstDeclarator",
                        constType: "int",
                        constName: $$[$0 - 3],
                        constInit: $$[$0 - 1]
                    };
                    break;
                case 18:
                    this.$ = {
                        type: "VariableDeclarator",
                        varType: $$[$0 - 4],
                        varName: $$[$0 - 3],
                        varInit: $$[$0 - 1]
                    };
                    break;
                case 19:
                    this.$ = {
                        type: "VariableDeclarator",
                        varType: $$[$0 - 2],
                        varName: $$[$0 - 1],
                        varInit: null
                    };
                    break;
                case 20:
                case 22:
                    this.$ = "int";
                    break;
                case 21:
                    this.$ = "int_pointer";
                    break;
                case 23:
                    this.$ = "word_pointer";
                    break;
                case 24:
                    this.$ = "word";
                    break;
                case 25:
                    this.$ = "byte_pointer";
                    break;
                case 26:
                    this.$ = "byte";
                    break;
                case 27:
                    this.$ = "string_pointer";
                    break;
                case 28:
                    this.$ = "string";
                    break;
                case 29:
                    this.$ = "struct_pointer";
                    break;
                case 30:
                case 60:
                case 66:
                case 70:
                case 96:
                    this.$ = [$$[$0]];
                    break;
                case 31:
                case 61:
                case 67:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 32:
                    this.$ = {
                        type: "Process",
                        name: $$[$0 - 6],
                        params: $$[$0 - 4],
                        privates: $$[$0 - 1],
                        body: $$[$0]
                    };
                    break;
                case 34:
                    this.$ = [$$[$0]];
                    break;
                case 35:
                    $$[$0 - 2].push($$[$0]);
                    break;
                case 36:
                    this.$ = {
                        type: "ProcessBody",
                        sentences: $$[$0]
                    };
                    break;
                case 38:
                case 40:
                case 78:
                case 101:
                    this.$ = $$[$0 - 1];
                    break;
                case 51:
                    this.$ = { type: "DebugSentence" };
                    break;
                case 52:
                    this.$ = {
                        type: "ExpressionSentence",
                        expression: $$[$0 - 1]
                    };
                    break;
                case 53:
                    this.$ = { type: "BreakSentence" };
                    break;
                case 54:
                    this.$ = { type: "ContinueSentence" };
                    break;
                case 57:
                    this.$ = {
                        type: "IfSentence",
                        test: $$[$0 - 2],
                        consequent: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        },
                        alternate: null
                    };
                    break;
                case 58:
                    this.$ = {
                        type: "IfSentence",
                        test: $$[$0 - 3],
                        consequent: {
                            type: "SentenceBlock",
                            sentences: $$[$0 - 1]
                        },
                        alternate: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        },
                    };
                    break;
                case 59:
                    this.$ = {
                        type: "SwitchSentence",
                        discriminant: $$[$0 - 2],
                        cases: $$[$0]
                    };
                    break;
                case 63:
                    this.$ = [$$[$0 - 1]];
                    break;
                case 65:
                    $$[$0 - 2].push($$[$0 - 1]);
                    break;
                case 68:
                    this.$ = {
                        type: "SwitchCase",
                        tests: $$[$0 - 2],
                        consequent: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        }
                    };
                    break;
                case 69:
                    this.$ = {
                        type: "SwitchCase",
                        tests: null,
                        consequent: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        }
                    };
                    break;
                case 71:
                case 97:
                    $$[$0 - 2].push($$[$0]);
                    break;
                case 73:
                    this.$ = {
                        type: "Range",
                        min: $$[$0 - 2],
                        max: $$[$0]
                    };
                    break;
                case 74:
                    this.$ = {
                        type: "WhileSentence",
                        test: $$[$0 - 2],
                        body: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        }
                    };
                    break;
                case 75:
                    this.$ = {
                        type: "RepeatSentence",
                        test: $$[$0].test,
                        body: {
                            type: "SentenceBlock",
                            sentences: $$[$0].body
                        }
                    };
                    break;
                case 76:
                    this.$ = {
                        test: $$[$0],
                        body: []
                    };
                    break;
                case 77:
                    this.$ = {
                        test: $$[$0],
                        body: $$[$0 - 1]
                    };
                    break;
                case 79:
                    this.$ = {
                        type: "LoopSentence",
                        body: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        }
                    };
                    break;
                case 80:
                    this.$ = {
                        type: "FromSentence",
                        identifier: $$[$0 - 7],
                        init: $$[$0 - 5],
                        limit: $$[$0 - 3],
                        step: $$[$0 - 2],
                        body: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        }
                    };
                    break;
                case 81:
                    this.$ = null;
                    break;
                case 82:
                    this.$ = $$[$0];
                    break;
                case 83:
                    this.$ = {
                        type: "ForSentence",
                        inits: $$[$0 - 1].inits,
                        tests: $$[$0 - 1].tests,
                        updates: $$[$0 - 1].updates,
                        body: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        }
                    };
                    break;
                case 84:
                    this.$ = {
                        inits: $$[$0 - 2],
                        tests: $$[$0 - 1],
                        updates: $$[$0]
                    };
                    break;
                case 91:
                    this.$ = {
                        type: "ReturnSentence",
                        argument: null
                    };
                    break;
                case 92:
                    this.$ = {
                        type: "ReturnSentence",
                        argument: $$[$0 - 1]
                    };
                    break;
                case 93:
                    this.$ = {
                        type: "FrameSentence",
                        argument: null
                    };
                    break;
                case 94:
                    this.$ = {
                        type: "FrameSentence",
                        argument: $$[$0 - 1]
                    };
                    break;
                case 95:
                    this.$ = {
                        type: "CloneSentence",
                        body: {
                            type: "SentenceBlock",
                            sentences: $$[$0]
                        }
                    };
                    break;
                case 99:
                    this.$ = {
                        type: "Literal",
                        value: JSON.parse($$[$0]),
                        raw: $$[$0]
                    };
                    break;
                case 100:
                    this.$ = {
                        type: "Literal",
                        value: parseInt($$[$0]),
                        raw: $$[$0]
                    };
                    break;
                case 103:
                    this.$ = {
                        type: "MemberExpression",
                        computed: true,
                        structure: $$[$0 - 3],
                        property: $$[$0 - 1]
                    };
                    break;
                case 105:
                    this.$ = {
                        type: "MemberExpression",
                        computed: false,
                        structure: $$[$0 - 2],
                        property: $$[$0]
                    };
                    break;
                case 106:
                    this.$ = {
                        type: "UpdateExpression",
                        operator: $$[$0],
                        argument: $$[$0 - 1],
                        prefix: false
                    };
                    break;
                case 107:
                    this.$ = {
                        type: "CallExpression",
                        callee: $$[$0 - 2],
                        arguments: []
                    };
                    break;
                case 108:
                    this.$ = {
                        type: "CallExpression",
                        callee: $$[$0 - 3],
                        arguments: $$[$0 - 1]
                    };
                    break;
                case 110:
                    this.$ = {
                        type: "UpdateExpression",
                        operator: $$[$0 - 1],
                        argument: $$[$0],
                        prefix: true
                    };
                    break;
                case 111:
                    this.$ = {
                        type: "UnaryExpression",
                        operator: $$[$0 - 1],
                        argument: $$[$0]
                    };
                    break;
                case 120:
                case 125:
                case 129:
                    this.$ = {
                        type: "BinaryExpression",
                        operator: $$[$0 - 1],
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;
                case 133:
                    this.$ = {
                        type: "LogicalExpression",
                        operator: $$[$0 - 1],
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;
                case 138:
                    this.$ = {
                        type: "RelationalExpression",
                        operator: $$[$0 - 1],
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;
                case 146:
                    this.$ = {
                        type: "AssignmentExpression",
                        operator: $$[$0 - 1],
                        left: $$[$0 - 2],
                        right: $$[$0]
                    };
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 7: [1, 3] }, { 1: [3] }, { 5: [1, 4], 6: 5, 36: 6, 37: $V0 }, { 8: 8, 15: $V1 }, { 1: [2, 1] }, { 5: [1, 10], 36: 11, 37: $V0 }, o($V2, [2, 30]), { 8: 12, 15: $V1 }, { 9: [1, 13] }, o($V3, [2, 4]), { 1: [2, 2] }, o($V2, [2, 31]), { 38: [1, 14] }, o($V4, [2, 6], { 10: 15, 16: [1, 16] }), o($V5, [2, 33], { 39: 17, 8: 18, 15: $V1 }), o($V6, [2, 8], { 11: 19, 18: [1, 20] }), o($V7, [2, 13], { 17: 21 }), { 40: [1, 22], 41: [1, 23] }, o($V5, [2, 34]), o($V8, [2, 10], { 12: 24, 20: [1, 25] }), o($V9, $Va, { 19: 26 }), o($V4, [2, 5], { 22: 27, 8: 28, 15: $V1 }), { 9: [1, 29] }, { 8: 30, 15: $V1 }, { 13: 31, 21: $Vb, 42: $Vc }, o([15, 21, 27, 28, 29, 30, 31, 32, 33, 34, 35, 42], $Va, { 19: 33 }), o($V6, [2, 7], { 25: 34, 26: 35, 15: $Vd, 27: $Ve, 28: $Vf, 29: $Vg, 30: $Vh, 31: $Vi, 32: $Vj, 33: $Vk, 34: $Vl, 35: $Vm }), o($V7, [2, 14]), { 23: [1, 45] }, { 13: 46, 21: $Vb, 42: $Vc }, o($V5, [2, 35]), { 14: 47, 42: $Vn }, o([15, 27, 28, 29, 30, 31, 32, 33, 34, 35, 42], $Va, { 19: 49 }), o($V8, [2, 9], { 25: 34, 26: 35, 15: $Vd, 27: $Ve, 28: $Vf, 29: $Vg, 30: $Vh, 31: $Vi, 32: $Vj, 33: $Vk, 34: $Vl, 35: $Vm }), o($V9, [2, 17]), { 8: 50, 15: $V1 }, { 15: [2, 21] }, { 15: [2, 22] }, { 15: [2, 23] }, { 15: [2, 24] }, { 15: [2, 25] }, { 15: [2, 26] }, { 15: [2, 27] }, { 15: [2, 28] }, { 15: [2, 29] }, { 8: 70, 15: $V1, 24: 51, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 14: 75, 42: $Vn }, o($V2, [2, 3]), { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 76, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 15: $Vd, 25: 34, 26: 35, 27: $Ve, 28: $Vf, 29: $Vg, 30: $Vh, 31: $Vi, 32: $Vj, 33: $Vk, 34: $Vl, 35: $Vm, 42: [2, 11] }, { 9: [1, 105], 23: [1, 104] }, { 9: [1, 106] }, o($VM, [2, 158]), o($VM, [2, 145], { 128: 107, 129: [1, 108], 130: [1, 109], 131: [1, 110], 132: [1, 111], 133: [1, 112], 134: [1, 113] }), o($VN, $VO, { 136: 114, 23: [1, 115], 137: [1, 116], 138: [1, 117], 139: [1, 118], 140: [1, 119], 141: [1, 120], 142: [1, 121], 143: [1, 122], 144: [1, 123], 145: [1, 124], 146: [1, 125] }), o($VP, [2, 137], { 123: 126, 124: $VQ, 125: $VR, 126: $VS }), o($VT, [2, 109], { 102: 132, 38: [1, 133], 98: [1, 130], 101: [1, 131], 105: $Vr, 106: $Vs }), { 8: 70, 15: $V1, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 134, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx }, { 8: 70, 15: $V1, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 135, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx }, o($VU, [2, 132], { 119: 136, 120: $VV, 121: $VW }), o($V3, [2, 102]), o($V3, [2, 104]), o($VX, [2, 112]), o($VX, [2, 113]), o($VY, [2, 114]), o($VY, [2, 115]), o($VY, [2, 116]), o($VY, [2, 117]), o($VY, [2, 118]), o($VZ, [2, 128], { 117: 139, 109: $V_, 110: $V$ }), o($V3, [2, 98]), o($V3, [2, 99]), o($V3, [2, 100]), { 8: 70, 15: $V1, 24: 142, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($V01, [2, 124], { 113: 143, 108: $V11, 114: $V21, 115: $V31 }), o($V2, [2, 32]), o($V2, [2, 36]), o($V41, [2, 37]), { 8: 70, 15: $V1, 24: 91, 38: $Vo, 44: $V51, 48: 148, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($V61, [2, 60]), o($V61, [2, 41]), o($V61, [2, 42]), o($V61, [2, 43]), o($V61, [2, 55], { 53: 149, 9: [1, 150] }), o($V61, [2, 45]), o($V61, [2, 46]), o($V61, [2, 47]), { 9: [1, 151] }, { 9: [1, 152] }, o($V61, [2, 50]), { 9: [1, 153] }, { 9: [1, 154] }, { 9: [1, 155] }, { 9: [1, 156] }, { 38: [1, 157] }, { 38: [1, 158] }, { 38: [1, 159] }, { 8: 70, 15: $V1, 24: 91, 38: $Vo, 45: 162, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 77: 160, 78: 161, 79: $V71, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 164, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 165, 15: $V1 }, { 38: [1, 167], 86: 166 }, { 9: [2, 91], 38: [1, 168] }, { 9: [2, 93], 38: [1, 169] }, { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 170, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 171, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($V9, [2, 19]), o($V7, [2, 15]), { 8: 70, 15: $V1, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 173, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 172 }, o($VY, [2, 139]), o($VY, [2, 140]), o($VY, [2, 141]), o($VY, [2, 142]), o($VY, [2, 143]), o($VY, [2, 144]), { 8: 70, 15: $V1, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 174 }, o($VY, [2, 147]), o($VY, [2, 148]), o($VY, [2, 149]), o($VY, [2, 150]), o($VY, [2, 151]), o($VY, [2, 152]), o($VY, [2, 153]), o($VY, [2, 154]), o($VY, [2, 155]), o($VY, [2, 156]), o($VY, [2, 157]), { 8: 70, 15: $V1, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 173, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 175 }, o($VY, [2, 134]), o($VY, [2, 135]), o($VY, [2, 136]), { 8: 70, 15: $V1, 24: 176, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 177, 15: $V1 }, o($V3, [2, 106]), { 8: 70, 15: $V1, 24: 180, 38: $Vo, 40: [1, 178], 90: 179, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($VT, [2, 110]), o($VT, [2, 111]), { 8: 70, 15: $V1, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 173, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 181 }, o($VY, [2, 130]), o($VY, [2, 131]), { 8: 70, 15: $V1, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 173, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 182 }, o($VY, [2, 126]), o($VY, [2, 127]), { 40: [1, 183] }, { 8: 70, 15: $V1, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 184, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx }, o($VY, [2, 121]), o($VY, [2, 122]), o($VY, [2, 123]), o($V41, [2, 38]), o($V61, [2, 61]), o($V61, [2, 44]), o($V61, [2, 56]), o($V61, [2, 48]), o($V61, [2, 49]), o($V61, [2, 51]), o($V61, [2, 52]), o($V61, [2, 53]), o($V61, [2, 54]), { 8: 70, 15: $V1, 24: 185, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 186, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 187, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($V81, [2, 75]), o($V81, [2, 76]), { 8: 70, 15: $V1, 24: 91, 38: $Vo, 48: 148, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 78: 188, 79: $V71, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 38: [1, 189] }, o($V61, [2, 79]), { 23: [1, 190] }, { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 191, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 9: [1, 193], 15: $V1, 24: 180, 38: $Vo, 87: 192, 90: 194, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 195, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 196, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($V61, [2, 95]), { 9: [1, 197] }, o($VP, [2, 138], { 123: 126, 124: $VQ, 125: $VR, 126: $VS }), o($VN, $VO), o($VM, [2, 146]), o($VU, [2, 133], { 119: 136, 120: $VV, 121: $VW }), { 99: [1, 198] }, o($V3, [2, 105]), o($V3, [2, 107]), { 40: [1, 199], 41: $V91 }, o($Va1, [2, 96]), o($VZ, [2, 129], { 117: 139, 109: $V_, 110: $V$ }), o($V01, [2, 125], { 113: 143, 108: $V11, 114: $V21, 115: $V31 }), o($V3, [2, 101]), o($VN, [2, 120]), { 40: [1, 201] }, { 40: [1, 202] }, { 40: [1, 203] }, o($V81, [2, 77]), { 8: 70, 15: $V1, 24: 204, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 205, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($V61, [2, 83]), { 8: 70, 9: [1, 207], 15: $V1, 24: 180, 38: $Vo, 88: 206, 90: 208, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($Vb1, [2, 85]), { 9: [1, 209], 41: $V91 }, { 40: [1, 210] }, { 40: [1, 211] }, o($V9, [2, 18]), o($V3, [2, 103]), o($V3, [2, 108]), { 8: 70, 15: $V1, 24: 212, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 213, 44: $Vy, 45: 215, 46: 214, 47: [1, 216], 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 44: [1, 218], 65: 217, 66: 219, 67: 220, 68: 222, 69: $Vc1, 72: $Vd1 }, { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 224, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 40: [1, 225] }, { 82: [1, 226] }, { 8: 70, 15: $V1, 24: 180, 38: $Vo, 40: [1, 228], 89: 227, 90: 229, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($Ve1, [2, 87]), { 9: [1, 230], 41: $V91 }, o($Vb1, [2, 86]), { 9: [2, 92] }, { 9: [2, 94] }, o($Va1, [2, 97]), o($V61, [2, 57]), { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 231, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 91, 38: $Vo, 44: $V51, 47: [1, 232], 48: 148, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($Vf1, [2, 39]), o($V61, [2, 59]), o($V61, [2, 62]), { 44: [1, 233] }, { 44: [1, 234], 66: 235, 68: 236, 69: $Vc1, 72: $Vd1 }, { 71: [1, 237] }, o($Vg1, [2, 66]), { 8: 70, 15: $V1, 24: 240, 38: $Vo, 70: 238, 73: 239, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($V61, [2, 74]), o($V81, [2, 78]), { 8: 70, 15: $V1, 24: 241, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($Vf1, [2, 84]), o($Vf1, [2, 89]), { 40: [1, 242], 41: $V91 }, o($Ve1, [2, 88]), o($V61, [2, 58]), o($Vf1, [2, 40]), o($V61, [2, 63]), o($V61, [2, 64]), { 44: [1, 243] }, o($Vg1, [2, 67]), { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 244, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 41: [1, 246], 71: [1, 245] }, o($Vh1, [2, 70]), o($Vh1, [2, 72], { 74: [1, 247] }), { 9: [2, 81], 83: 248, 84: [1, 249] }, o($Vf1, [2, 90]), o($V61, [2, 65]), { 44: [2, 69] }, { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 250, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 240, 38: $Vo, 73: 251, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 8: 70, 15: $V1, 24: 252, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 9: [1, 253] }, { 8: 70, 15: $V1, 24: 254, 38: $Vo, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, o($Vg1, [2, 68]), o($Vh1, [2, 71]), o($Vh1, [2, 73]), { 8: 70, 15: $V1, 24: 91, 38: $Vo, 43: 255, 44: $Vy, 45: 78, 48: 79, 49: 80, 50: 81, 51: 82, 52: 83, 54: 84, 55: 85, 56: 86, 57: 87, 58: 88, 59: 89, 60: $Vz, 61: $VA, 62: $VB, 63: $VC, 64: $VD, 75: $VE, 76: $VF, 80: $VG, 81: $VH, 85: $VI, 91: $VJ, 92: $VK, 93: $VL, 94: 60, 95: $Vp, 96: $Vq, 97: 56, 100: 61, 102: 57, 103: 54, 104: 58, 105: $Vr, 106: $Vs, 107: $Vt, 108: $Vu, 109: $Vv, 110: $Vw, 111: $Vx, 112: 74, 116: 69, 118: 59, 122: 55, 127: 53, 135: 52 }, { 9: [2, 82] }, o($V61, [2, 80])],
        defaultActions: { 4: [2, 1], 10: [2, 2], 36: [2, 21], 37: [2, 22], 38: [2, 23], 39: [2, 24], 40: [2, 25], 41: [2, 26], 42: [2, 27], 43: [2, 28], 44: [2, 29], 210: [2, 92], 211: [2, 94], 244: [2, 69], 254: [2, 82] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:/* ignore */ 
                        break;
                    case 1:/* ignore */ 
                        break;
                    case 2:/* ignore */ 
                        break;
                    case 3:
                        return 63;
                        break;
                    case 4:
                        return 47;
                        break;
                    case 5:
                        return 64;
                        break;
                    case 6:
                        return 69;
                        break;
                    case 7:
                        return 72;
                        break;
                    case 8:
                        return 80;
                        break;
                    case 9:
                        return 81;
                        break;
                    case 10:
                        return 76;
                        break;
                    case 11:
                        return 79;
                        break;
                    case 12:
                        return 75;
                        break;
                    case 13:
                        return 81;
                        break;
                    case 14:
                        return 82;
                        break;
                    case 15:
                        return 84;
                        break;
                    case 16:
                        return 85;
                        break;
                    case 17:
                        return 61;
                        break;
                    case 18:
                        return 62;
                        break;
                    case 19:
                        return 91;
                        break;
                    case 20:
                        return 92;
                        break;
                    case 21:
                        return 93;
                        break;
                    case 22:
                        return 60;
                        break;
                    case 23:
                        return 92;
                        break;
                    case 24:
                        return 7;
                        break;
                    case 25:
                        return 16;
                        break;
                    case 26:
                        return 18;
                        break;
                    case 27:
                        return 20;
                        break;
                    case 28:
                        return 21;
                        break;
                    case 29:
                        return 37;
                        break;
                    case 30:
                        return 'FUNCTION';
                        break;
                    case 31:
                        return 42;
                        break;
                    case 32:
                        return 44;
                        break;
                    case 33:
                        return 27;
                        break;
                    case 34:
                        return 28;
                        break;
                    case 35:
                        return 29;
                        break;
                    case 36:
                        return 30;
                        break;
                    case 37:
                        return 31;
                        break;
                    case 38:
                        return 32;
                        break;
                    case 39:
                        return 33;
                        break;
                    case 40:
                        return 34;
                        break;
                    case 41:
                        return 35;
                        break;
                    case 42:
                        return 9;
                        break;
                    case 43:
                        return 38;
                        break;
                    case 44:
                        return 40;
                        break;
                    case 45:
                        return 98;
                        break;
                    case 46:
                        return 99;
                        break;
                    case 47:
                        return 41;
                        break;
                    case 48:
                        return 23;
                        break;
                    case 49:
                        return 140;
                        break;
                    case 50:
                        return 141;
                        break;
                    case 51:
                        return 138;
                        break;
                    case 52:
                        return 137;
                        break;
                    case 53:
                        return 139;
                        break;
                    case 54:
                        return 144;
                        break;
                    case 55:
                        return 146;
                        break;
                    case 56:
                        return 145;
                        break;
                    case 57:
                        return 142;
                        break;
                    case 58:
                        return 143;
                        break;
                    case 59:
                        return 121;
                        break;
                    case 60:
                        return 120;
                        break;
                    case 61:
                        return 133;
                        break;
                    case 62:
                        return 132;
                        break;
                    case 63:
                        return '=>';
                        break;
                    case 64:
                        return 131;
                        break;
                    case 65:
                        return 134;
                        break;
                    case 66:
                        return 134;
                        break;
                    case 67:
                        return 129;
                        break;
                    case 68:
                        return 130;
                        break;
                    case 69:
                        return 125;
                        break;
                    case 70:
                        return 125;
                        break;
                    case 71:
                        return 107;
                        break;
                    case 72:
                        return 124;
                        break;
                    case 73:
                        return 124;
                        break;
                    case 74:
                        return 124;
                        break;
                    case 75:
                        return '^^';
                        break;
                    case 76:
                        return '^^';
                        break;
                    case 77:
                        return 126;
                        break;
                    case 78:
                        return 105;
                        break;
                    case 79:
                        return 106;
                        break;
                    case 80:
                        return 109;
                        break;
                    case 81:
                        return 110;
                        break;
                    case 82:
                        return 23;
                        break;
                    case 83:
                        return 114;
                        break;
                    case 84:
                        return 108;
                        break;
                    case 85:
                        return 115;
                        break;
                    case 86:
                        return 115;
                        break;
                    case 87:
                        return 111;
                        break;
                    case 88:
                        return 111;
                        break;
                    case 89:
                        return 107;
                        break;
                    case 90:
                        return 108;
                        break;
                    case 91:
                        return 74;
                        break;
                    case 92:
                        return 71;
                        break;
                    case 93:
                        return 101;
                        break;
                    case 94:
                        return 95;
                        break;
                    case 95:
                        return 96;
                        break;
                    case 96:
                        return 15;
                        break;
                    case 97:
                        return 5;
                        break;
                }
            },
            rules: [/^(?:\s+)/i, /^(?:\/\/.*)/i, /^(?:\/\*([^*]|\*(?!\/))*\*\/)/i, /^(?:IF\b)/i, /^(?:ELSE\b)/i, /^(?:SWITCH\b)/i, /^(?:CASE\b)/i, /^(?:DEFAULT\b)/i, /^(?:LOOP\b)/i, /^(?:FROM\b)/i, /^(?:REPEAT\b)/i, /^(?:UNTIL\b)/i, /^(?:WHILE\b)/i, /^(?:FROM\b)/i, /^(?:TO\b)/i, /^(?:STEP\b)/i, /^(?:FOR\b)/i, /^(?:BREAK\b)/i, /^(?:CONTINUE\b)/i, /^(?:RETURN\b)/i, /^(?:FRAME\b)/i, /^(?:CLONE\b)/i, /^(?:DEBUG\b)/i, /^(?:FRAME\b)/i, /^(?:PROGRAM\b)/i, /^(?:CONST\b)/i, /^(?:GLOBAL\b)/i, /^(?:LOCAL\b)/i, /^(?:PRIVATE\b)/i, /^(?:PROCESS\b)/i, /^(?:FUNCTION\b)/i, /^(?:BEGIN\b)/i, /^(?:END\b)/i, /^(?:INT POINTER\b)/i, /^(?:INT\b)/i, /^(?:WORD POINTER\b)/i, /^(?:WORD\b)/i, /^(?:BYTE POINTER\b)/i, /^(?:BYTE\b)/i, /^(?:STRING POINTER\b)/i, /^(?:STRING\b)/i, /^(?:STRUCT POINTER\b)/i, /^(?:;)/i, /^(?:\()/i, /^(?:\))/i, /^(?:\[)/i, /^(?:\])/i, /^(?:,)/i, /^(?::=)/i, /^(?:\+=)/i, /^(?:-=)/i, /^(?:\/=)/i, /^(?:\*=)/i, /^(?:%=)/i, /^(?:&=)/i, /^(?:\|=)/i, /^(?:\^=)/i, /^(?:<<=)/i, /^(?:>>=)/i, /^(?:>>)/i, /^(?:<<)/i, /^(?:==)/i, /^(?:>=)/i, /^(?:=>)/i, /^(?:<=)/i, /^(?:<>)/i, /^(?:!=)/i, /^(?:<)/i, /^(?:>)/i, /^(?:AND\b)/i, /^(?:&&)/i, /^(?:&)/i, /^(?:OR\b)/i, /^(?:\|\|)/i, /^(?:\|)/i, /^(?:XOR\b)/i, /^(?:\^\^)/i, /^(?:\^)/i, /^(?:\+\+)/i, /^(?:--)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:=)/i, /^(?:\/)/i, /^(?:\*)/i, /^(?:MOD\b)/i, /^(?:%)/i, /^(?:NOT\b)/i, /^(?:!)/i, /^(?:OFFSET\b)/i, /^(?:POINTER\b)/i, /^(?:\.\.)/i, /^(?::)/i, /^(?:\.)/i, /^(?:("")|(".*?([^\\]")))/i, /^(?:[0-9]+)/i, /^(?:([a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ#ªº$þƒ£¥¢_][0-9a-zñçæâäàåáêëèéîïìíôöòóûüùúÿ#ªº$þƒ£¥¢_]*))/i, /^(?:$)/i],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    return parser;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ast__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates__ = __webpack_require__(4);


var translators = Object.create(null);
// TODO: Consider switching these to MemortBrowser-based assignment and read
// so the JS code can be optimized and inlined later. This would decouple
// translation from memory layout.
translators.AssignmentExpression = function (divAssignment, context) {
    return new __WEBPACK_IMPORTED_MODULE_0__ast__["b" /* AssignmentExpression */](translate(divAssignment.left, context), translate(divAssignment.right, context), 
    // XXX: This is good luck. All assignment operators are equal!
    divAssignment.operator);
};
translators.BinaryExpression = function (divBinary, context) {
    return new __WEBPACK_IMPORTED_MODULE_0__ast__["c" /* BinaryExpression */](translate(divBinary.left, context), translate(divBinary.right, context), divBinary.operator);
};
translators.RelationalExpression = translators.BinaryExpression;
translators.LogicalExpression = function (divLogical, context) {
    var logicalFunction;
    switch (divLogical.operator) {
        case '&':
        case '&&':
            logicalFunction = '__and';
            break;
        case '||':
            logicalFunction = '__or';
            break;
        case '^':
        case '^^':
            logicalFunction = '__xor';
            break;
        default:
            throw new Error('Logical operator unknown: ' + divLogical.operator);
    }
    return new __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].callWith(logicalFunction, [
        translate(divLogical.left, context),
        translate(divLogical.right, context)
    ]);
};
translators.CallExpression = function (divCall, context) {
    var parameters = new __WEBPACK_IMPORTED_MODULE_0__ast__["a" /* ArrayExpression */](divCall.arguments.map(function (arg) {
        return translate(arg, context);
    }));
    var id = divCall.callee.name;
    var isProcess = context.isProcess(id);
    var afterCallLabel = context.newLabel();
    var callKind = isProcess ? 'newProcess' : 'callFunction';
    // Isolate as a subexpression (impicitely stored in the results queue)
    context[callKind](afterCallLabel, id, parameters);
    context.label(afterCallLabel);
    // Replace by the intermediate value (i.e. dequeue from the results queue)
    return __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].dequeueReturnValue;
};
translators.CloneSentence = function (divClone, context) {
    var insideCloneLabel = context.newLabel();
    var afterCloneLabel = context.newLabel();
    context.clone(insideCloneLabel, afterCloneLabel);
    context.label(insideCloneLabel);
    translateBody(divClone, context);
    context.label(afterCloneLabel);
};
translators.Unit = function (divUnit, context) {
    var programFunction = translate(divUnit.program, context);
    var processesFunctions = divUnit.processes.map(function (divProcess) {
        return translate(divProcess, context);
    });
    var globals = translateGlobals(context);
    var locals = translateLocals(context);
    var privateOffset = createPrivateOffset(context);
    return new __WEBPACK_IMPORTED_MODULE_0__ast__["m" /* Program */]([globals, locals, privateOffset]
        .concat([programFunction])
        .concat(processesFunctions));
};
function translateGlobals(context) {
    var globalBase = getGlobalBaseDeclaration(context);
    var globalDeclarations = translateSegment('globals', context);
    globalDeclarations.declarations.unshift(globalBase);
    return globalDeclarations;
}
function translateLocals(context) {
    return translateSegment('locals', context);
}
function createPrivateOffset(context) {
    var mmap = context.getMemoryMap();
    return new __WEBPACK_IMPORTED_MODULE_0__ast__["q" /* VariableDeclaration */]([
        new __WEBPACK_IMPORTED_MODULE_0__ast__["r" /* VariableDeclarator */](new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('P_OFFSET'), __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */]['for'](mmap.localSegmentSize))
    ]);
}
function getGlobalBaseDeclaration(context) {
    var offset = context.getMemoryMap().constructor.GLOBAL_OFFSET;
    return new __WEBPACK_IMPORTED_MODULE_0__ast__["r" /* VariableDeclarator */](__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].globalBaseIdentifier, __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */]['for'](offset));
}
function translateSegment(segment, context) {
    var mmap = context.getMemoryMap();
    var vars = getSegmentDeclarations(segment, [], mmap.cells[segment]);
    return new __WEBPACK_IMPORTED_MODULE_0__ast__["q" /* VariableDeclaration */](vars);
}
function getSegmentDeclarations(segment, prefixes, cells) {
    var definitions = [];
    for (var i = 0, cell; (cell = cells[i]); i++) {
        if (!cell.hidden) {
            var identifierFactory = 'identifierFor' + ({
                'globals': 'Global',
                'locals': 'Local',
                'privates': 'Private'
            }[segment]);
            prefixes.push(cell.name);
            definitions.push(new __WEBPACK_IMPORTED_MODULE_0__ast__["r" /* VariableDeclarator */](__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */][identifierFactory](prefixes), __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */]['for'](cell.offset)));
            if (cell.type === 'struct') {
                definitions = definitions.concat(getSegmentDeclarations(segment, prefixes, cell.fields));
            }
            prefixes.pop();
        }
    }
    return flat(definitions);
    function flat(list) {
        return list.reduce(function (flat, item) {
            if (!Array.isArray(item)) {
                item = [item];
            }
            return flat.concat(item);
        }, []);
    }
}
translators.Program = function (divProgram, context) {
    var name = divProgram.name.name;
    context.enterProcess(name);
    var privates = translatePrivates(name, context);
    var body = translate(divProgram.body, context);
    var translation = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].programFunction(name, (privates ? [privates] : []).concat(body));
    context.exitProcess();
    return translation;
};
translators.Process = function (divProgram, context) {
    var name = divProgram.name.name;
    context.enterProcess(name);
    var privates = translatePrivates(name, context);
    var body = translate(divProgram.body, context);
    var translation = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].processFunction(name, (privates ? [privates] : []).concat(body));
    context.exitProcess();
    return translation;
};
function translatePrivates(processName, context) {
    var mmap = context.getMemoryMap();
    var privates = mmap.cells.privates[processName];
    if (!privates) {
        return null;
    }
    var vars = getSegmentDeclarations('privates', [], privates);
    return new __WEBPACK_IMPORTED_MODULE_0__ast__["q" /* VariableDeclaration */](vars);
}
translators.ProcessBody = function (divBody, context) {
    context.startLinearization();
    divBody.sentences.map(function (sentence) {
        translate(sentence, context);
    });
    context.end();
    var bodyCases = context.getLinearizationCases();
    return __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].concurrentBody(bodyCases);
};
translators.Identifier = function (divIdentifier, context) {
    var name = divIdentifier.name;
    var scope = context.getScope(name);
    if (!scope) {
        throw new Error('Unknown name ' + name);
    }
    var scopeTranslator = 'memory' + scope[0].toUpperCase() + scope.substr(1);
    if (!(scopeTranslator in __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */])) {
        throw new Error('Unknown scope ' + scope);
    }
    return __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */][scopeTranslator](name);
};
translators.IfSentence = function (divIf, context) {
    var consequentLabel = context.newLabel();
    var alternateLabel = context.newLabel();
    var test = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].toBool(translate(divIf.test, context));
    context.goToIf(test, consequentLabel, alternateLabel);
    context.label(consequentLabel);
    translateBody(divIf, context, 'consequent');
    context.label(alternateLabel);
    if (divIf.alternate) {
        translateBody(divIf, context, 'alternate');
    }
};
translators.ExpressionSentence = function (divExpression, context) {
    var expression = translate(divExpression.expression, context);
    context.verbatim(new __WEBPACK_IMPORTED_MODULE_0__ast__["g" /* ExpressionStatement */](expression));
};
translators.Literal = function (divLiteral) {
    return __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(divLiteral.value);
};
translators.WhileSentence = function (divWhile, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var testLabel = context.newLabel();
    context.label(testLabel);
    context.goToIf(translate(divWhile.test, context), loopStartLabel, afterLoopLabel);
    context.label(loopStartLabel);
    translateBody(divWhile, context);
    context.goTo(testLabel);
    context.label(afterLoopLabel);
};
translators.LoopSentence = function (divLoop, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    context.label(loopStartLabel);
    translateBody(divLoop, context);
    context.goTo(loopStartLabel);
    context.label(afterLoopLabel);
};
translators.RepeatSentence = function (divRepeat, context) {
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    context.label(loopStartLabel);
    translateBody(divRepeat, context);
    context.goToIf(translate(divRepeat.test, context), afterLoopLabel, loopStartLabel);
    context.label(afterLoopLabel);
};
translators.ReturnSentence = function (divReturn, context) {
    var returnArgument = divReturn.argument;
    if (!returnArgument) {
        returnArgument = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].defaultReturnArgument;
    }
    context.return(translate(returnArgument, context));
};
translators.SwitchSentence = function (divSwitch, context) {
    var afterSwitchLabel = context.newLabel();
    var defaultCaseLabel = context.newLabel();
    var cases = divSwitch.cases;
    var lastCase = cases[cases.length - 1];
    var hasDefault = lastCase && lastCase.tests === null;
    if (hasDefault) {
        cases.pop();
    }
    var discriminant = translate(divSwitch.discriminant, context);
    var aux = context.newAux('_switch', discriminant);
    var choices = generateChoices(cases, context);
    context.verbatim(aux.declaration);
    context.select(aux.identifier, choices, hasDefault ? defaultCaseLabel : afterSwitchLabel);
    choices.forEach(function (choice) {
        context.label(choice.label);
        translateBody(choice.case, context, 'consequent');
        context.goTo(afterSwitchLabel);
    });
    if (hasDefault) {
        var defaultCase = lastCase;
        context.label(defaultCaseLabel);
        translateBody(defaultCase, context, 'consequent');
        context.goTo(afterSwitchLabel);
    }
    context.label(afterSwitchLabel);
};
function generateChoices(cases, context) {
    return cases.map(function (caseClause) {
        return {
            label: context.newLabel(),
            tests: caseClause.tests.map(function (test) {
                return translate(test, context);
            }),
            case: caseClause
        };
    });
}
translators.FrameSentence = function (divFrame, context) {
    var resumeLabel = context.newLabel();
    var argument = divFrame.argument || __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].defaultFrameArgument;
    context.frame(resumeLabel, translate(argument, context));
    context.label(resumeLabel);
};
translators.DebugSentence = function (divDebug, context) {
    var resumeLabel = context.newLabel();
    context.debug(resumeLabel);
    context.label(resumeLabel);
};
translators.FromSentence = function (divFrom, context) {
    var initValue = divFrom.init.value;
    var limitValue = divFrom.limit.value;
    var isAscendant = initValue < limitValue;
    var defaultStep = isAscendant ? 1 : -1;
    var step = divFrom.step ? divFrom.step.value : defaultStep;
    var identifier = divFrom.identifier.name;
    var init = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].fromInitilizator(identifier, initValue);
    var test = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].fromTest(identifier, limitValue, isAscendant);
    var update = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].fromIncrement(identifier, step);
    translateForLikeLoop(divFrom, [init], [test], [update], context);
};
translators.ForSentence = function (divFor, context) {
    var inits = divFor.inits;
    var tests = divFor.tests;
    var updates = divFor.updates;
    translateForLikeLoop(divFor, inits, tests, updates, context);
};
translators.Range = function (divRange) {
    return __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].newRange(divRange.min, divRange.max);
};
/**
 * All parameters here must be DIV2 AST.
 */
function translateForLikeLoop(loop, inits, tests, updates, context) {
    var test = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].every(tests.map(function (test) {
        return __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].toBool(translate(test, context));
    }));
    var testLabel = context.newLabel();
    var loopStartLabel = context.newLabel();
    var afterLoopLabel = context.newLabel();
    var updatesLabel = context.newLabel();
    inits.forEach(verbatim);
    context.label(testLabel);
    if (test) {
        context.goToIf(test, loopStartLabel, afterLoopLabel);
    }
    context.label(loopStartLabel);
    translateBody(loop, context);
    context.label(updatesLabel);
    updates.forEach(verbatim);
    context.goTo(testLabel);
    context.label(afterLoopLabel);
    function verbatim(divExpression) {
        context.verbatim(new __WEBPACK_IMPORTED_MODULE_0__ast__["g" /* ExpressionStatement */](translate(divExpression, context)));
    }
}
function translate(divAst, context) {
    if (!divAst || !divAst.type) {
        throw new Error('Invalid DIV2 AST');
    }
    if (!(divAst.type in translators)) {
        throw new Error('Translation unavailable for ' + divAst.type + ' AST');
    }
    return translators[divAst.type](divAst, context);
}
function translateBody(divBodySentence, context, bodyProperty) {
    bodyProperty = bodyProperty || 'body';
    return divBodySentence[bodyProperty].sentences.map(function (sentence) {
        return translate(sentence, context);
    });
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ast__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["a"] = ({
    callWith: function (name, args) {
        if (!Array.isArray(args)) {
            args = args ? [args] : [];
        }
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["e" /* CallExpression */](new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */](name), args);
    },
    concurrentBody: function (cases) {
        var programCounter = this.programCounter;
        var switchStatement = new __WEBPACK_IMPORTED_MODULE_0__ast__["p" /* SwitchStatement */](programCounter, cases);
        return this.infiniteLoop(switchStatement);
    },
    concurrentLabel: function (label) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["o" /* SwitchCase */](__WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(label));
    },
    get endToken() {
        return {
            type: 'Identifier',
            name: '__yieldEnd'
        };
    },
    every: function (tests) {
        var _this = this;
        return tests.reduce(function (chain, test) {
            return chain === null ? test :
                new __WEBPACK_IMPORTED_MODULE_0__ast__["k" /* LogicalExpression */](chain, test, '&&');
        }, null);
    },
    /**
     * Builds a DIV2 AST for a FROM update.
     *
     * @return a DIV2 increment expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromIncrement: function (name, constant) {
        return {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
                type: 'Identifier',
                name: name
            },
            right: {
                type: 'Literal',
                value: constant,
                raw: JSON.stringify(constant)
            }
        };
    },
    /**
     * Builds a DIV2 AST for a FROM initializator.
     *
     * @return a DIV2 assignment expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromInitilizator: function (name, constant) {
        return {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
                type: 'Identifier',
                name: name
            },
            right: {
                type: 'Literal',
                value: constant,
                raw: JSON.stringify(constant)
            }
        };
    },
    /**
     * Builds a DIV2 AST for FROM test.
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    fromTest: function (name, constant, isLowerThan) {
        return {
            type: 'BinaryExpression',
            operator: isLowerThan ? '<=' : '>=',
            left: {
                type: 'Identifier',
                name: name
            },
            right: {
                type: 'Literal',
                value: constant,
                raw: JSON.stringify(constant)
            }
        };
    },
    /**
     * Builds a DIV2 AST for the default argument for FRAME.
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    get defaultFrameArgument() {
        return {
            type: "Literal",
            value: 100,
            raw: "100"
        };
    },
    /**
     * Builds a DIV2 AST for the default argument for RETURN (process id).
     *
     * @return a DIV2 comparison expression.
     * TODO: Maybe a set of DIV2 constructors is actually needed.
     */
    get defaultReturnArgument() {
        return {
            type: "Identifier",
            name: "id"
        };
    },
    infiniteLoop: function (body) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["s" /* WhileStatement */](this.trueLiteral, body);
    },
    labeledBlock: function (label) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["o" /* SwitchCase */](__WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(label));
    },
    memoryGlobal: function (name) {
        return this._memory(this._globalAddress(name));
    },
    memoryLocal: function (name) {
        return this._memory(this._localAddress(name));
    },
    memoryPrivate: function (name) {
        return this._memory(this._privateAddress(name));
    },
    _memory: function (index) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["l" /* MemberExpression */](new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('mem'), index, true);
    },
    _globalAddress: function (name) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["c" /* BinaryExpression */](this.globalBaseIdentifier, this.identifierForGlobal(name), '+');
    },
    // XXX: Returns ast for `exec.base + L_<NAME>`
    _localAddress: function (name) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["c" /* BinaryExpression */](this._localBase, this.identifierForLocal(name), '+');
    },
    // XXX: Returns ast for `exec.base + P_OFFSET + <name>`
    _privateAddress: function (name) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["c" /* BinaryExpression */](new __WEBPACK_IMPORTED_MODULE_0__ast__["c" /* BinaryExpression */](this._localBase, this.privateOffsetIdentifier, '+'), new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */](name), '+');
    },
    globalSizeIdentifier: new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('G_SEGMENT_SIZE'),
    globalBaseIdentifier: new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('G_BASE'),
    identifierForGlobal: function (names) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */](['G'].concat(names).join('_').toUpperCase());
    },
    identifierForLocal: function (names) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */](['L'].concat(names).join('_').toUpperCase());
    },
    identifierForPrivate: function (names) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */](names.join('_').toLowerCase());
    },
    _localBase: new __WEBPACK_IMPORTED_MODULE_0__ast__["l" /* MemberExpression */](new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('exec'), new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('base'), false),
    privateOffsetIdentifier: new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('P_OFFSET'),
    newRange: function (min, max) {
        return this.callWith('__range', [min, max]);
    },
    get processEnd() {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["n" /* ReturnStatement */](this.endToken);
    },
    call: function (kind, resume, name, argList) {
        var yieldType = {
            'function': '__yieldCallFunction',
            'process': '__yieldNewProcess'
        }[kind];
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["n" /* ReturnStatement */](this.callWith(yieldType, [__WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(resume), __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(name)].concat(argList)));
    },
    processClone: function (child, parent) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["n" /* ReturnStatement */](this.callWith('__yieldClone', [__WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(child), __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(parent)]));
    },
    // TODO: Ok, the former means process clone but what does this mean?
    // It is not "process frame", it is just frame.
    processFrame: function (resume, expression) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["n" /* ReturnStatement */](this.callWith('__yieldFrame', [__WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(resume), expression]));
    },
    // TODO: Same here.
    processDebug: function (resume) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["n" /* ReturnStatement */](this.callWith('__yieldDebug', [__WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(resume)]));
    },
    programFunction: function (name, body) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["h" /* FunctionDeclaration */](new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('program_' + name), this.processParameters, null, body);
    },
    processFunction: function (name, body) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["h" /* FunctionDeclaration */](new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('process_' + name), this.processParameters, null, body);
    },
    // TODO: Maybe mem, exec & args should be supplied by div2trans
    get processParameters() {
        return [
            new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('mem'),
            new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('exec'),
            new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('args')
        ];
    },
    // TODO: See my comment about processFrame. I don't think this should be
    // different for a process than for a function.
    processReturn: function (expression) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["n" /* ReturnStatement */](this.callWith('__yieldReturn', expression));
    },
    get programCounter() {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["l" /* MemberExpression */](new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('exec'), new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('pc'));
    },
    get dequeueReturnValue() {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["e" /* CallExpression */](new __WEBPACK_IMPORTED_MODULE_0__ast__["l" /* MemberExpression */](new __WEBPACK_IMPORTED_MODULE_0__ast__["l" /* MemberExpression */](new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('exec'), new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('retv')), new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */]('dequeue')));
    },
    some: function (evaluation, tests) {
        return this.callWith('__some', [evaluation].concat(tests));
    },
    toBool: function (ast) {
        return this.callWith('__bool', ast);
    },
    get trueLiteral() {
        return __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */].for(true);
    }
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MemoryMap; });
/* unused harmony export MemoryBrowser */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return exportToJson; });
/* unused harmony export importFromJson */
function MemoryMap(symbols) {
    // TODO: In DIV, the binary has process pool and globals in the data segment
    // but in this implementation we are allocating that memory at the beginning
    // so we need either the different segment sizes (for debugging) or the
    // complete memory size (regular execution).
    // TODO: consider embedding an initial memory dump in the form of a base64
    // blob. Heavy "binaries".
    this.maxProcess = 5919; // XXX: This is the max process count for empty
    // programs. Still trying to figure out why.
    this.symbols = symbols;
    this.cells = Object.create(null);
    this._buildMap();
}
//TODO: Perhaps we are lacking the concept of cell size or addressable word
// as the minimum number of bytes addressable. In the case of DIV2, this
// number is 4 which matches the ALIGNMENT.
MemoryMap.ALIGNMENT = 4; // 4 bytes
MemoryMap.GLOBAL_OFFSET = 1; // TODO: Must take into account all
// DIV padding including program source. Leave
// 0 address free.
MemoryMap.SIZE_IN_BYTES = {
    'byte': 1,
    'word': 2,
    'int': 4
};
MemoryMap.prototype = {
    constructor: MemoryMap,
    get globalSegmentSize() {
        return this._getSegmentSize(this.cells['globals']) / MemoryMap.ALIGNMENT;
    },
    get localSegmentSize() {
        return this._getSegmentSize(this.cells['locals']) / MemoryMap.ALIGNMENT;
    },
    get processPoolSize() {
        return this.maxProcess * this.processSize;
    },
    get maxPrivateSegmentSize() {
        return Math.max.call(Math, Object.keys(this.cells.privates).map(function (processName) {
            this._getSegmentSize(this.cells.privates[processName]);
        }, this));
    },
    get processSize() {
        var size = this.localSegmentSize + this.maxPrivateSegmentSize;
        //XXX: Force to be ALWAYS even. In addition to an odd pool offset,
        //it warrants all the process to start in an ODD address so the id
        //is ALWAYS ODD and thus, always TRUE.
        if (size % 2 !== 0) {
            return size + 1;
        }
        return size;
    },
    get poolOffset() {
        return MemoryMap.GLOBAL_OFFSET + this.globalSegmentSize;
    },
    _getSegmentSize: function (cells) {
        return cells.reduce(function (total, cell) {
            return total + cell.size;
        }, 0);
    },
    _buildMap: function () {
        this.cells.globals = this._inToCells(this.symbols.globals);
        this.cells.locals = this._inToCells(this.symbols.locals);
        this.cells.privates = {};
        Object.keys(this.symbols.privates).forEach(function (processName) {
            var privateMap = this._inToCells(this.symbols.privates[processName]);
            this.cells.privates[processName] = privateMap;
        }, this);
    },
    _inToCells: function (symbols) {
        var offset = 0;
        var cells = [];
        symbols.forEach(function (symbol) {
            var cell = Object.create(symbol);
            cell.size = this._sizeOf(symbol);
            cell.offset = offset;
            if (symbol.type === 'struct') {
                cell.fields = this._inToCells(symbol.fields);
            }
            offset += cell.size / MemoryMap.ALIGNMENT;
            cells.push(cell);
        }.bind(this));
        return cells;
    },
    _sizeOf: function (symbol) {
        var individualSize;
        if (symbol.type !== 'struct') {
            individualSize = MemoryMap.SIZE_IN_BYTES[symbol.type];
        }
        else {
            individualSize = symbol.fields.reduce(function (partial, field) {
                return partial + this._sizeOf(field);
            }.bind(this), 0);
        }
        return individualSize * symbol.length;
    }
};
MemoryMap.exportToJson = function (map) {
    return map.symbols;
};
MemoryMap.importFromJson = function (json) {
    return new MemoryMap(json);
};
// XXX: Consider to move to its own module.
function MemoryBrowser(mem, map) {
    this._mem = mem;
    this._map = map;
}
MemoryBrowser.prototype = {
    constructor: MemoryBrowser,
    global: function (name) {
        return this.seek(this.offset('globals', name));
    },
    process: function (options) {
        var options = options || {};
        var id = options.id;
        var type = options.type; //TODO: Remove. Now is necessary but in the
        //future, the type should be retrieved from the
        //local reserved.process_type
        //TODO: Check id validity
        if (id) {
            return new ProcessView(this, id);
        }
        var index = options.index || 0;
        var poolOffset = this._map.poolOffset;
        var processSize = this._map.processSize;
        var processOffset = poolOffset + index * processSize;
        return new ProcessView(this, processOffset, type);
    },
    setMemory: function (buffer, offset) {
        return this._mem.set(buffer, offset);
    },
    offset: function (segment, name, base, processName) {
        base = base || (segment === 'globals' ? MemoryMap.GLOBAL_OFFSET : 0);
        var cells = this._map.cells[segment];
        //TODO: Refactor needed, all this ifs... Privates are special, perhaps
        // they deserve a special tratment over an unified layer dealing with
        // somethign lower level than named segments such as the segment array
        // itself.
        if (segment === 'privates') {
            cells = cells[processName];
            base += this._map.localSegmentSize;
        }
        var names = name.split('.');
        var offset = this._offset(cells, names);
        if (offset === undefined) {
            throw new Error('Can not get the offset for ' + name);
        }
        return base + offset;
    },
    seek: function (offset) {
        return new MemView(this._mem, offset);
    },
    _offset: function (cells, names) {
        var offset;
        var name = names[0];
        var cell = cells.find(function (cell) {
            return cell.name === name;
        });
        if (!cell) {
            return undefined;
        }
        if (cell.type !== 'struct') {
            return cell.offset;
        }
        var fieldOffset = this._offset(cell.fields, names.slice(1));
        if (fieldOffset === undefined) {
            return undefined;
        }
        return cell.offset + fieldOffset;
    }
};
function MemView(storage, offset) {
    this._storage = storage;
    this._offset = offset;
}
MemView.prototype = {
    constructor: MemView,
    get value() {
        return this._storage[this._offset];
    },
    set value(v) {
        this._storage[this._offset] = v;
    }
};
function ProcessView(browser, base, type) {
    this._browser = browser;
    this._base = base;
    this._type = type;
}
ProcessView.prototype = {
    constructor: ProcessView,
    setMemory: function (memBuffer) {
        this._browser.setMemory(memBuffer, this.offset); // Ignore id
    },
    local: function (name) {
        return this._browser.seek(this._browser.offset('locals', name, this._base));
    },
    private: function (name) {
        return this._browser.seek(this._browser.offset('privates', name, this._base, this._type));
    },
    get offset() {
        return this._base;
    },
    get id() {
        return this.local('reserved.process_id').value;
    }
};
let { exportToJson, importFromJson } = MemoryMap;



/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;

    // See `tools/generate-identifier-regex.js`.
    ES5Regex = {
        // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    };

    ES6Regex = {
        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDE00-\uDE11\uDE13-\uDE2B\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDE00-\uDE2F\uDE44\uDE80-\uDEAA]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/,
        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };

    function isDecimalDigit(ch) {
        return 0x30 <= ch && ch <= 0x39;  // 0..9
    }

    function isHexDigit(ch) {
        return 0x30 <= ch && ch <= 0x39 ||  // 0..9
            0x61 <= ch && ch <= 0x66 ||     // a..f
            0x41 <= ch && ch <= 0x46;       // A..F
    }

    function isOctalDigit(ch) {
        return ch >= 0x30 && ch <= 0x37;  // 0..7
    }

    // 7.2 White Space

    NON_ASCII_WHITESPACES = [
        0x1680, 0x180E,
        0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
        0x202F, 0x205F,
        0x3000,
        0xFEFF
    ];

    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
            ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }

    // 7.6 Identifier Names and Identifiers

    function fromCodePoint(cp) {
        if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
        var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
        var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
        return cu1 + cu2;
    }

    IDENTIFIER_START = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_START[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    IDENTIFIER_PART = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_PART[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch >= 0x30 && ch <= 0x39 ||  // 0..9
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    function isIdentifierStartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    function isIdentifierStartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStartES5: isIdentifierStartES5,
        isIdentifierPartES5: isIdentifierPartES5,
        isIdentifierStartES6: isIdentifierStartES6,
        isIdentifierPartES6: isIdentifierPartES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(8);
var util = __webpack_require__(0);
var ArraySet = __webpack_require__(9).ArraySet;
var MappingList = __webpack_require__(26).MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(25);

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(0);
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compile", function() { return compile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__div2lang__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__div2lang___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__div2lang__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__div2trans__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__compiler__ = __webpack_require__(12);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "parser", function() { return __WEBPACK_IMPORTED_MODULE_0__div2lang__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "translator", function() { return __WEBPACK_IMPORTED_MODULE_1__div2trans__; });



__WEBPACK_IMPORTED_MODULE_0__div2lang__["yy"] = __WEBPACK_IMPORTED_MODULE_0__div2lang__["yy"] || {};
__WEBPACK_IMPORTED_MODULE_0__div2lang__["yy"].parseError = __WEBPACK_IMPORTED_MODULE_0__div2lang__["parseError"];
let compile = __WEBPACK_IMPORTED_MODULE_2__compiler__["a" /* compile */];



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return compile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__div2lang__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__div2lang___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__div2lang__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__div2checker__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__div2trans__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ast__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__memory_symbols__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__memory_definitions__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__memory_mapper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_escodegen__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_escodegen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_escodegen__);








var SymbolTable = __WEBPACK_IMPORTED_MODULE_4__memory_symbols__["a" /* SymbolTable */];
__WEBPACK_IMPORTED_MODULE_0__div2lang__["yy"] = __WEBPACK_IMPORTED_MODULE_0__div2lang__["yy"] || {};
__WEBPACK_IMPORTED_MODULE_0__div2lang__["yy"].parseError = __WEBPACK_IMPORTED_MODULE_0__div2lang__["parseError"];
function compile(srcText, sourceURL) {
    sourceURL = sourceURL || '/div-program.js';
    var symbolTable = new SymbolTable(__WEBPACK_IMPORTED_MODULE_5__memory_definitions__["a" /* default */]);
    var div2Ast = __WEBPACK_IMPORTED_MODULE_0__div2lang__["parse"](srcText);
    var context = __WEBPACK_IMPORTED_MODULE_1__div2checker__["a" /* extractContext */](div2Ast, symbolTable);
    var jsAst = __WEBPACK_IMPORTED_MODULE_2__div2trans__["translate"](div2Ast, context);
    //TODO: When implementing non debug mode, the memory map can be omitted
    // although segment sizes and other relevant runtime variables are still
    // needed.
    var mmap = context.getMemoryMap();
    var memoryMapAst = generateMemoryMap(mmap);
    var processMapAst = generateProcessMap(jsAst);
    var memoryOffsetsAst = extractMemoryBindings(jsAst);
    var wrappedAst = wrap(processMapAst, memoryOffsetsAst, memoryMapAst);
    var objText = __WEBPACK_IMPORTED_MODULE_7_escodegen__["generate"](wrappedAst);
    return objText + '\n//@ sourceURL=' + sourceURL;
}
function extractMemoryBindings(ast) {
    return ast.body.filter(function (statement) {
        return statement.type === 'VariableDeclaration';
    });
}
function generateMemoryMap(mmap) {
    var jsonMmap = __WEBPACK_IMPORTED_MODULE_6__memory_mapper__["b" /* exportToJson */](mmap);
    return new __WEBPACK_IMPORTED_MODULE_3__ast__["g" /* ExpressionStatement */](__WEBPACK_IMPORTED_MODULE_3__ast__["t" /* fromJson */](jsonMmap));
}
function generateProcessMap(ast) {
    var mapAst = {
        type: 'ExpressionStatement',
        expression: {
            type: 'ObjectExpression',
            properties: []
        }
    };
    mapAst.expression.properties = ast.body
        .filter(function (statement) {
        return statement.type === 'FunctionDeclaration';
    })
        .map(newEntry);
    return mapAst;
}
function wrap(processMapAst, memoryOffsetsAst, memoryMapAst) {
    var wrapper = JSON.parse(JSON.stringify(wrapperTemplate));
    var body = wrapper.body[0].expression.body.body;
    body.splice.apply(body, [1, 0].concat(memoryOffsetsAst));
    var ret = body[body.length - 1];
    ret.argument.properties.push(entryForPMap(processMapAst.expression));
    if (memoryMapAst) {
        ret.argument.properties.push(entryForMMap(memoryMapAst.expression));
    }
    return wrapper;
}
function entryForPMap(expression) {
    return propertyEntry('pmap', expression);
}
function entryForMMap(expression) {
    return propertyEntry('mmap', expression);
}
function newEntry(functionDeclaration) {
    var functionExpression = Object.create(functionDeclaration);
    functionExpression.type = 'FunctionExpression';
    return propertyEntry(getName(functionExpression), functionExpression);
}
function propertyEntry(name, value) {
    return {
        type: 'Property',
        key: {
            type: 'Identifier',
            name: name
        },
        computed: false,
        value: value,
        kind: 'init',
        method: false,
        shorthand: false
    };
}
function getName(functionExpression) {
    var functionId = functionExpression.id.name;
    if (startsWith(functionId, 'program_')) {
        return 'program';
    }
    return functionId;
}
function startsWith(str, prefix) {
    return str.substr(0, prefix.length) === prefix;
}
// XXX: This is the AST for runtime/wrapper.js
// XXX: It is kept in sync with the command grunt embed-wrapper
var wrapperTemplate = { "type": "Program", "body": [{ "type": "ExpressionStatement", "expression": { "type": "FunctionExpression", "id": null, "params": [{ "type": "Identifier", "name": "rt" }], "body": { "type": "BlockStatement", "body": [{ "type": "ExpressionStatement", "expression": { "type": "Literal", "value": "use strict", "raw": "'use strict'" }, "directive": "use strict" }, { "type": "FunctionDeclaration", "id": { "type": "Identifier", "name": "__yieldFrame" }, "params": [{ "type": "Identifier", "name": "npc" }, { "type": "Identifier", "name": "completion" }], "body": { "type": "BlockStatement", "body": [{ "type": "ReturnStatement", "argument": { "type": "NewExpression", "callee": { "type": "MemberExpression", "computed": false, "object": { "type": "Identifier", "name": "rt" }, "property": { "type": "Identifier", "name": "Baton" } }, "arguments": [{ "type": "Literal", "value": "frame", "raw": "'frame'" }, { "type": "ObjectExpression", "properties": [{ "type": "Property", "key": { "type": "Identifier", "name": "npc" }, "computed": false, "value": { "type": "Identifier", "name": "npc" }, "kind": "init", "method": false, "shorthand": false }, { "type": "Property", "key": { "type": "Identifier", "name": "completion" }, "computed": false, "value": { "type": "Identifier", "name": "completion" }, "kind": "init", "method": false, "shorthand": false }] }] } }] }, "generator": false, "expression": false }, { "type": "FunctionDeclaration", "id": { "type": "Identifier", "name": "__yieldDebug" }, "params": [{ "type": "Identifier", "name": "npc" }], "body": { "type": "BlockStatement", "body": [{ "type": "ReturnStatement", "argument": { "type": "NewExpression", "callee": { "type": "MemberExpression", "computed": false, "object": { "type": "Identifier", "name": "rt" }, "property": { "type": "Identifier", "name": "Baton" } }, "arguments": [{ "type": "Literal", "value": "debug", "raw": "'debug'" }, { "type": "ObjectExpression", "properties": [{ "type": "Property", "key": { "type": "Identifier", "name": "npc" }, "computed": false, "value": { "type": "Identifier", "name": "npc" }, "kind": "init", "method": false, "shorthand": false }] }] } }] }, "generator": false, "expression": false }, { "type": "FunctionDeclaration", "id": { "type": "Identifier", "name": "__yieldNewProcess" }, "params": [{ "type": "Identifier", "name": "npc" }, { "type": "Identifier", "name": "processName" }, { "type": "Identifier", "name": "args" }], "body": { "type": "BlockStatement", "body": [{ "type": "ReturnStatement", "argument": { "type": "NewExpression", "callee": { "type": "MemberExpression", "computed": false, "object": { "type": "Identifier", "name": "rt" }, "property": { "type": "Identifier", "name": "Baton" } }, "arguments": [{ "type": "Literal", "value": "newprocess", "raw": "'newprocess'" }, { "type": "ObjectExpression", "properties": [{ "type": "Property", "key": { "type": "Identifier", "name": "npc" }, "computed": false, "value": { "type": "Identifier", "name": "npc" }, "kind": "init", "method": false, "shorthand": false }, { "type": "Property", "key": { "type": "Identifier", "name": "processName" }, "computed": false, "value": { "type": "Identifier", "name": "processName" }, "kind": "init", "method": false, "shorthand": false }, { "type": "Property", "key": { "type": "Identifier", "name": "args" }, "computed": false, "value": { "type": "Identifier", "name": "args" }, "kind": "init", "method": false, "shorthand": false }] }] } }] }, "generator": false, "expression": false }, { "type": "FunctionDeclaration", "id": { "type": "Identifier", "name": "__yieldCallFunction" }, "params": [{ "type": "Identifier", "name": "npc" }, { "type": "Identifier", "name": "functionName" }, { "type": "Identifier", "name": "args" }], "body": { "type": "BlockStatement", "body": [{ "type": "ReturnStatement", "argument": { "type": "NewExpression", "callee": { "type": "MemberExpression", "computed": false, "object": { "type": "Identifier", "name": "rt" }, "property": { "type": "Identifier", "name": "Baton" } }, "arguments": [{ "type": "Literal", "value": "call", "raw": "'call'" }, { "type": "ObjectExpression", "properties": [{ "type": "Property", "key": { "type": "Identifier", "name": "npc" }, "computed": false, "value": { "type": "Identifier", "name": "npc" }, "kind": "init", "method": false, "shorthand": false }, { "type": "Property", "key": { "type": "Identifier", "name": "functionName" }, "computed": false, "value": { "type": "Identifier", "name": "functionName" }, "kind": "init", "method": false, "shorthand": false }, { "type": "Property", "key": { "type": "Identifier", "name": "args" }, "computed": false, "value": { "type": "Identifier", "name": "args" }, "kind": "init", "method": false, "shorthand": false }] }] } }] }, "generator": false, "expression": false }, { "type": "VariableDeclaration", "declarations": [{ "type": "VariableDeclarator", "id": { "type": "Identifier", "name": "__yieldEnd" }, "init": { "type": "NewExpression", "callee": { "type": "MemberExpression", "computed": false, "object": { "type": "Identifier", "name": "rt" }, "property": { "type": "Identifier", "name": "Baton" } }, "arguments": [{ "type": "Literal", "value": "end", "raw": "'end'" }] } }], "kind": "var" }, { "type": "ReturnStatement", "argument": { "type": "ObjectExpression", "properties": [] } }] }, "generator": false, "expression": false } }], "sourceType": "script" };



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extractContext; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__memory_mapper__ = __webpack_require__(5);


function extractContext(div2ast, symbolTable) {
    if (div2ast.type !== 'Unit') {
        console.warn('Extracting context from a partial AST.');
    }
    var context = new __WEBPACK_IMPORTED_MODULE_0__context__["a" /* Context */]();
    declareProcesses(context, div2ast.processes);
    //TODO: Find and add custom globals to symbols
    //TODO: Find and add custom locals to symbols
    declarePrivates(symbolTable, [div2ast.program]);
    declarePrivates(symbolTable, div2ast.processes);
    var mmap = new __WEBPACK_IMPORTED_MODULE_1__memory_mapper__["a" /* MemoryMap */](symbolTable);
    context.setMemoryMap(mmap);
    return context;
}
function declareProcesses(context, processes) {
    (processes || []).forEach(function (processAst) {
        context.declareProcess(processAst.name.name);
    });
}
function declarePrivates(symbolTable, processes) {
    (processes || []).forEach(function (processAst) {
        if (processAst && processAst.privates) {
            processAst.privates.declarations.forEach(function (declarationAst) {
                var processName = processAst.name.name;
                var varName = declarationAst.varName.name;
                if (!symbolTable.isPrivate(processName, varName)) {
                    symbolTable.addPrivate(processName, definitionFromAst(declarationAst));
                }
                else {
                    throw new Error('The private ' + varName + ' has been already declared.');
                }
            });
        }
    });
}
function definitionFromAst(declarationAst) {
    //TODO: add support for structs and arrays. 
    return {
        name: declarationAst.varName.name,
        type: declarationAst.varType
    };
}



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Context; });
/* unused harmony export Linearization */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ast__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates__ = __webpack_require__(4);


function Context(ctx) {
    this._processes = {};
    this._auxNames = {};
    this._currentProcess = undefined;
    for (var key in ctx) {
        if (ctx.hasOwnProperty(key)) {
            this[key] = ctx[key];
        }
    }
}
Context.prototype = {
    constructor: Context,
    setMemoryMap: function (mmap) {
        this._mmap = mmap;
    },
    getMemoryMap: function () {
        return this._mmap;
    },
    startLinearization: function () {
        this._auxNames = {};
        this._currentLinearization = new Linearization();
    },
    getLinearizationCases: function () {
        return this._currentLinearization.getCases();
    },
    end: function () {
        return this._currentLinearization.end();
    },
    callFunction: function (resumeLabel, name, argList) {
        return this._currentLinearization
            .callFunction(resumeLabel, name, argList);
    },
    newProcess: function (resumeLabel, name, argList) {
        return this._currentLinearization
            .newProcess(resumeLabel, name, argList);
    },
    clone: function (childLabel, parentLabel) {
        return this._currentLinearization.clone(childLabel, parentLabel);
    },
    frame: function (resumeLabel, expression) {
        return this._currentLinearization.frame(resumeLabel, expression);
    },
    debug: function (resumeLabel) {
        return this._currentLinearization.debug(resumeLabel);
    },
    declareProcess: function (name) {
        this._processes[name] = true;
    },
    isProcess: function (name) {
        return name in this._processes;
    },
    enterProcess: function (name) {
        this._currentProcess = name;
    },
    exitProcess: function () {
        this._currentProcess = undefined;
    },
    return: function (expression) {
        return this._currentLinearization.return(expression);
    },
    newAux: function (name, initializer) {
        var nameCount = this._auxNames[name] || 0;
        var suffix = this._auxNames[name] = nameCount + 1;
        if (nameCount > 0) {
            name += suffix;
        }
        var identifier = new __WEBPACK_IMPORTED_MODULE_0__ast__["i" /* Identifier */](name);
        var declaration = new __WEBPACK_IMPORTED_MODULE_0__ast__["q" /* VariableDeclaration */](new __WEBPACK_IMPORTED_MODULE_0__ast__["r" /* VariableDeclarator */](identifier, initializer));
        return {
            identifier: identifier,
            declaration: declaration
        };
    },
    newLabel: function () {
        return this._currentLinearization.newLabel();
    },
    label: function (label) {
        return this._currentLinearization.label(label);
    },
    verbatim: function (ast) {
        return this._currentLinearization.verbatim(ast);
    },
    goToIf: function (testAst, labelIfTrue, labelIfFalse) {
        return this._currentLinearization
            .goToIf(testAst, labelIfTrue, labelIfFalse);
    },
    goTo: function (label) {
        return this._currentLinearization.goTo(label);
    },
    select: function (evaluation, options, defaultLabel) {
        return this._currentLinearization.select(evaluation, options, defaultLabel);
    },
    getScope: function (identifier) {
        var scope;
        var symbols = this._mmap.symbols;
        if (symbols.isGlobal(identifier)) {
            scope = 'global';
        }
        else if (symbols.isLocal(identifier)) {
            scope = 'local';
        }
        else if (symbols.isPrivate(this._currentProcess, identifier)) {
            scope = 'private';
        }
        return scope;
    }
};
function Linearization() {
    this._pc = -1;
    this._sentences = [];
}
Linearization.prototype = {
    constructor: Linearization,
    getCases: function () {
        var cases = [];
        var sentences = this._sentences;
        var currentCase = null;
        var caseIsFinished = false;
        var isReturn, isLabel, consequent;
        for (var i = 0, wrapper; (wrapper = sentences[i]); i++) {
            isLabel = wrapper instanceof Label;
            isReturn = wrapper.type === 'Return';
            if (caseIsFinished && !isLabel) {
                continue;
            }
            if (isLabel) {
                currentCase = __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].concurrentLabel(wrapper.label + 1);
                cases.push(currentCase);
            }
            consequent = currentCase.consequent;
            consequent.push.apply(consequent, wrapper.sentences);
            caseIsFinished = isReturn || (caseIsFinished && !isLabel);
        }
        return cases;
    },
    newLabel: function () {
        return new Label();
    },
    label: function (label) {
        var lastSentence = this._sentences[this._sentences.length - 1];
        if (lastSentence instanceof Label) {
            label.proxy(lastSentence);
        }
        else {
            label.label = this._pc + 1;
            this._sentences.push(label);
        }
    },
    verbatim: function (sentence) {
        this._addSentence(this._verbatim(sentence));
    },
    goToIf: function (testAst, labelIfTrue, labelIfFalse) {
        this._addSentence(this._goToIf(testAst, labelIfTrue, labelIfFalse));
    },
    goTo: function (label) {
        this._addSentence(this._goTo(label));
    },
    select: function (evaluation, options, defaultLabel) {
        this._addSentence(this._select(evaluation, options, defaultLabel));
    },
    end: function () {
        this._addSentence(this._end());
    },
    callFunction: function (resumeLabel, name, argList) {
        this._addSentence(this._call('function', resumeLabel, name, argList));
    },
    newProcess: function (resumeLabel, name, argList) {
        this._addSentence(this._call('process', resumeLabel, name, argList));
    },
    clone: function (childLabel, parentLabel) {
        this._addSentence(this._clone(childLabel, parentLabel));
    },
    frame: function (resumeLabel, expression) {
        this._addSentence(this._frame(resumeLabel, expression));
    },
    debug: function (resumeLabel) {
        this._addSentence(this._debug(resumeLabel));
    },
    return: function (expression) {
        this._addSentence(this._return(expression));
    },
    _verbatim: function (sentence) {
        return {
            type: 'Verbatim',
            sentences: [sentence]
        };
    },
    _goToIf: function (testAst, labelIfTrue, labelIfFalse) {
        var _this = this;
        return {
            type: 'GoToIf',
            get sentences() {
                return [_this._programCounterBranch(testAst, labelIfTrue.label, labelIfFalse.label), new __WEBPACK_IMPORTED_MODULE_0__ast__["d" /* BreakStatement */]()];
            }
        };
    },
    _goTo: function (label) {
        var _this = this;
        return {
            type: 'GoTo',
            get sentences() {
                return [
                    _this._programCounterSet(label.label),
                    new __WEBPACK_IMPORTED_MODULE_0__ast__["d" /* BreakStatement */]()
                ];
            }
        };
    },
    _select: function (evaluation, options, defaultLabel) {
        var _this = this;
        return {
            type: 'Select',
            get sentences() {
                var defaultExpression = _this._programCounterSet(defaultLabel.label);
                var cases = options.map(function (option) {
                    var tests = option.tests;
                    return _this._programCounterBranch(__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].some(evaluation, tests), option.label.label);
                });
                return [defaultExpression]
                    .concat(cases)
                    .concat([new __WEBPACK_IMPORTED_MODULE_0__ast__["d" /* BreakStatement */]()]);
            }
        };
    },
    _end: function () {
        return {
            type: 'End',
            get sentences() {
                return [__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].processEnd];
            }
        };
    },
    _call: function (kind, resumeLabel, name, argList) {
        var type = { 'function': 'CallFunction', 'process': 'NewProcess' }[kind];
        return {
            type: type,
            get sentences() {
                return [__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].call(kind, resumeLabel.label + 1, name, argList)];
            }
        };
    },
    _clone: function (childLabel, parentLabel) {
        return {
            type: 'Clone',
            get sentences() {
                return [__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].processClone(childLabel.label + 1, parentLabel.label + 1)];
            }
        };
    },
    _frame: function (resumeLabel, expression) {
        return {
            type: 'Frame',
            get sentences() {
                return [__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].processFrame(resumeLabel.label + 1, expression)];
            }
        };
    },
    _debug: function (resumeLabel) {
        return {
            type: 'Debug',
            get sentences() {
                return [__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].processDebug(resumeLabel.label + 1)];
            }
        };
    },
    _return: function (expression) {
        return {
            type: 'Return',
            get sentences() {
                return [__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].processReturn(expression)];
            }
        };
    },
    _programCounterBranch: function (testAst, consequent, alternate) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["g" /* ExpressionStatement */](new __WEBPACK_IMPORTED_MODULE_0__ast__["b" /* AssignmentExpression */](__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].programCounter, new __WEBPACK_IMPORTED_MODULE_0__ast__["f" /* ConditionalExpression */](testAst, new __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */](consequent + 1), alternate ? new __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */](alternate + 1) : __WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].programCounter)));
    },
    _programCounterSet: function (label) {
        return new __WEBPACK_IMPORTED_MODULE_0__ast__["g" /* ExpressionStatement */](new __WEBPACK_IMPORTED_MODULE_0__ast__["b" /* AssignmentExpression */](__WEBPACK_IMPORTED_MODULE_1__templates__["a" /* default */].programCounter, new __WEBPACK_IMPORTED_MODULE_0__ast__["j" /* Literal */](label + 1)));
    },
    _addSentence: function (ast) {
        if (!this._sentences.length) {
            this._sentences.push(new Label(0));
        }
        this._sentences.push(ast);
        this._pc += 1;
    }
};
function Label(n) { this.label = n; }
Label.prototype = {
    constructor: Label,
    proxy: function (anotherLabel) {
        this._proxifiedLabel = anotherLabel;
        Object.defineProperty(this, 'label', { get: function () {
                return this._proxifiedLabel.label;
            } });
    },
    get sentences() {
        return [];
    }
};



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SymbolTable; });
function SymbolTable(definitions) {
    this.globals = definitions.wellKnownGlobals.map(SymbolTable._normalize);
    this.locals = definitions.wellKnownLocals.map(SymbolTable._normalize);
    this.privates = {};
}
SymbolTable._normalize = function (symbol) {
    if (typeof symbol === 'string') {
        symbol = { name: symbol };
    }
    var normalized = { name: symbol.name };
    if (!normalized.name) {
        throw new Error('Symbol has no name!');
    }
    normalized.hidden = symbol.hidden || false;
    normalized.type = (symbol.type || 'int').toLowerCase();
    normalized.length = symbol.length || 1;
    if (symbol.type === 'struct') {
        if (!symbol.fields || !symbol.fields.length) {
            throw new Error('Bad struct definition:' + symbol.name +
                '. Struct with no fields.');
        }
        normalized.fields = symbol.fields.map(SymbolTable._normalize);
    }
    else {
        normalized.default = symbol.default || 0;
    }
    return normalized;
};
SymbolTable.prototype = {
    constructor: SymbolTable,
    addGlobal: function (definition) {
        return this._add('globals', definition);
    },
    addLocal: function (definition) {
        return this._add('locals', definition);
    },
    isGlobal: function (name) {
        return this._isKnown('globals', name.toLowerCase());
    },
    isLocal: function (name) {
        // TODO: Actually, id is a special token, non an identifier. Let's fix
        // that in the parser and translation module.
        return name === 'id' ||
            this._isKnown('locals', name.toLowerCase());
    },
    addPrivate: function (processName, definition) {
        var normalized = SymbolTable._normalize(definition);
        this.privates[processName] = this.privates[processName] || [];
        this.privates[processName].push(normalized);
        return normalized;
    },
    isPrivate: function (processName, name) {
        var processPrivates = this.privates[processName];
        return processPrivates && processPrivates.some(function (symbol) {
            return symbol.name === name;
        });
    },
    _add: function (kind, definition) {
        return (this[kind] = SymbolTable._normalize(definition));
    },
    _isKnown: function (kind, name) {
        return this[kind].some(function (symbol) {
            return symbol.name === name;
        });
    }
};



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// The definition format of the memory map is described here.
//
// In DIV, memory is a continuous and int (4 bytes) directionable-only array
// of cells. Pointer arithmetic can not address sub-int-size (word or byte)
// cells. DIV memory is 4 bytes aligned.
//
// Symbols is not a 1:1 memory map but a summary from which the memory map
// is derived. The main goal for symbol tables is to specify the relative
// order for specific memory regions.
//
// Each cell is defined by an object with the following fields:
//
//   * type   - is the type of the cell: byte (1 byte), word (2 bytes), int
//              (4 bytes, "default" if omitted) and struct.
//   * name   - is the name of the symbol.
//   * fields - if the type is struct, this is the list of symbols of the
//              struct.
//   * length - times to repeat this symbol (1 if omitted)
//
// Since most of the times, a symbol is 1 int, instead of an object, you
// can specify a string with the "name" of the symbol.
// Based on docs, sources and experimental tests:
// https://github.com/DIVGAMES/DIV-Games-Studio/blob/0c006cca548f9d6dc66d174d4f05d167148c7e78/dll/div.h
// Experimental tests are besed on measuring offsets between pairs of
// variables or struct fields. It seems there are "hidden" variables.
//
// IMPORTANT!!
// Ultimate values are put to preserve experimental offsets. When multiple
// values preserve the offsets, I chose the one closest to what is
// documented.
/* harmony default export */ __webpack_exports__["a"] = ({
    "wellKnownGlobals": [
        {
            "type": "struct",
            "name": "mouse",
            "fields": [
                { "name": "x", "default": 160 },
                { "name": "y", "default": 100 },
                { "name": "z", "default": -512 },
                "file",
                "graph",
                "angle",
                { "name": "size", "default": 100 },
                "flags",
                "region",
                "left",
                "middle",
                "right",
                "cursor",
                { "name": "speed", "default": 2 }
            ]
        },
        {
            "type": "struct",
            "name": "scroll",
            "fields": [
                { "name": "z", "default": 512 },
                "camera",
                { "name": "ratio", "default": 200 },
                "speed",
                { "name": "region1", "default": -1 },
                { "name": "region2", "default": -1 },
                "x0", "y0",
                "x1", "y1"
            ],
            "length": 10
        },
        {
            "type": "struct",
            "name": "m7",
            "fields": [
                { "name": "z", "default": 256 },
                "camera",
                { "name": "height", "default": 32 },
                { "name": "distance", "default": 64 },
                "horizon",
                { "name": "focus", "default": 256 },
                "color"
            ],
            "length": 10
        },
        {
            "type": "struct",
            "name": "joy",
            "fields": [
                "button1",
                "button2",
                "button3",
                "button4",
                "left",
                "right",
                "up",
                "down"
            ]
        },
        {
            "type": "struct",
            "name": "setup",
            "fields": [
                "card",
                "port",
                "irq",
                "dma",
                "dma2",
                "master",
                "sound_fx",
                "cd_audio",
                "mixer",
                "rate",
                "bits"
            ]
        },
        {
            "type": "struct",
            "name": "net",
            "fields": [
                "device",
                "com",
                "speed",
                "number",
                "init",
                "mode",
                "server",
                "max_players",
                "num_players"
            ]
        },
        {
            "type": "struct",
            "name": "m8",
            "fields": [
                { "name": "z", "default": 256 },
                "camera",
                "height",
                "angle"
            ],
            "length": 10
        },
        {
            "type": "struct",
            "name": "dirinfo",
            "fields": [
                "files",
                { "type": "int", "length": 1025, "name": "name" }
            ]
        },
        {
            "type": "struct",
            "name": "fileinfo",
            "fields": [
                // No idea why these *_fix are here:
                // https://github.com/DIVGAMES/DIV-Games-Studio/blob/0c006cca548f9d6dc66d174d4f05d167148c7e78/dll/div.h#L187
                { "type": "int", "name": "fullpath_fix", "hidden": true },
                { "type": "byte", "length": 256, "name": "fullpath" },
                "drive",
                { "type": "int", "name": "length_fix", "hidden": true },
                { "type": "byte", "length": 256, "name": "dir" },
                { "type": "int", "name": "name_fix", "hidden": true },
                { "type": "byte", "length": 12, "name": "name" },
                { "type": "int", "name": "ext_fix", "hidden": true },
                { "type": "byte", "length": 8, "name": "ext" },
                "size",
                "day",
                "month",
                "year",
                "hour",
                "min",
                "sec",
                "attrib"
            ]
        },
        {
            "type": "struct",
            "name": "video_modes",
            "fields": [
                "wide",
                "height",
                "mode"
            ],
            "length": 32
        },
        {
            "name": "timer",
            "length": 10
        },
        { "name": "text_z", "default": -256 },
        "fading",
        "shift_status",
        "ascii",
        "scan_code",
        { "name": "joy_filter", "default": 10 },
        { "name": "joy_status", "default": 1 },
        { "name": "restore_type", "default": 1 },
        { "name": "dump_type", "default": 1 },
        { "name": "max_process_time", "default": 500 },
        "fps",
        "argc",
        {
            "name": "argv",
            "length": 10
        },
        {
            "name": "channel",
            "length": 32
        },
        "vsync",
        { "name": "draw_z", "default": -255 },
        { "name": "num_video_modes", "default": 14 },
        { "name": "unit_size", "default": 4 }
    ],
    "wellKnownLocals": [
        {
            "type": "struct",
            "name": "reserved",
            "fields": [
                "process_id",
                "id_scan",
                "process_type",
                "type_scan",
                { "name": "status", "default": 2 },
                "parameters",
                "param_offset",
                "program_index",
                "stack_pointer",
                "is_executed",
                "is_painted",
                { "name": "m8_object", "default": -1 },
                "old_ctype",
                "frame_percent",
                "box_x0",
                "box_y0",
                { "name": "box_x1", "default": -1 },
                "box_y1",
                "f_count",
                "caller_id"
            ]
        },
        "father",
        "son",
        "smallbro",
        "bigbro",
        "priority",
        "ctype",
        "x",
        "y",
        "z",
        "graph",
        "flags",
        { "name": "size", "default": 100 },
        "angle",
        "region",
        "file",
        "xgraph",
        "cnumber",
        "height",
        "resolution",
        "radius",
        { "name": "m8_wall", "default": -1 },
        { "name": "m8_sector", "default": -1 },
        { "name": "m8_nextsector", "default": -1 },
        { "name": "m8_step", "default": 32 }
    ]
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*global exports:true, require:true, global:true*/
(function () {
    'use strict';

    var Syntax,
        Precedence,
        BinaryPrecedence,
        SourceNode,
        estraverse,
        esutils,
        isArray,
        base,
        indent,
        json,
        renumber,
        hexadecimal,
        quotes,
        escapeless,
        newline,
        space,
        parentheses,
        semicolons,
        safeConcatenation,
        directive,
        extra,
        parse,
        sourceMap,
        sourceCode,
        preserveBlankLines,
        FORMAT_MINIFY,
        FORMAT_DEFAULTS;

    estraverse = __webpack_require__(19);
    esutils = __webpack_require__(21);

    Syntax = estraverse.Syntax;

    // Generation is done by generateExpression.
    function isExpression(node) {
        return CodeGenerator.Expression.hasOwnProperty(node.type);
    }

    // Generation is done by generateStatement.
    function isStatement(node) {
        return CodeGenerator.Statement.hasOwnProperty(node.type);
    }

    Precedence = {
        Sequence: 0,
        Yield: 1,
        Await: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        BitwiseOR: 5,
        BitwiseXOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        TaggedTemplate: 17,
        Member: 18,
        Primary: 19
    };

    BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    //Flags
    var F_ALLOW_IN = 1,
        F_ALLOW_CALL = 1 << 1,
        F_ALLOW_UNPARATH_NEW = 1 << 2,
        F_FUNC_BODY = 1 << 3,
        F_DIRECTIVE_CTX = 1 << 4,
        F_SEMICOLON_OPT = 1 << 5;

    //Expression flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_ALLOW_CALL
    // F_ALLOW_UNPARATH_NEW
    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
        E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TFF = F_ALLOW_IN,
        E_FFT = F_ALLOW_UNPARATH_NEW,
        E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;

    //Statement flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_FUNC_BODY
    // F_DIRECTIVE_CTX
    // F_SEMICOLON_OPT
    var S_TFFF = F_ALLOW_IN,
        S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
        S_FFFF = 0x00,
        S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
        S_TTFF = F_ALLOW_IN | F_FUNC_BODY;

    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            comment: false,
            format: {
                indent: {
                    style: '    ',
                    base: 0,
                    adjustMultilineComment: false
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false,
                preserveBlankLines: false
            },
            moz: {
                comprehensionExpressionStartsWithAssignment: false,
                starlessGenerator: false
            },
            sourceMap: null,
            sourceMapRoot: null,
            sourceMapWithCode: false,
            directive: false,
            raw: true,
            verbatim: null,
            sourceCode: null
        };
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function hasLineTerminator(str) {
        return (/[\r\n]/g).test(str);
    }

    function endsWithLineTerminator(str) {
        var len = str.length;
        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }

    function merge(target, override) {
        var key;
        for (key in override) {
            if (override.hasOwnProperty(key)) {
                target[key] = override[key];
            }
        }
        return target;
    }

    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    function generateNumber(value) {
        var result, point, temp, exponent, pos;

        if (value !== value) {
            throw new Error('Numeric literal whose value is NaN');
        }
        if (value < 0 || (value === 0 && 1 / value < 0)) {
            throw new Error('Numeric literal whose value is negative');
        }

        if (value === 1 / 0) {
            return json ? 'null' : renumber ? '1e400' : '1e+400';
        }

        result = '' + value;
        if (!renumber || result.length < 3) {
            return result;
        }

        point = result.indexOf('.');
        if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;
        while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
            --pos;
        }
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
            temp += 'e' + exponent;
        }
        if ((temp.length < result.length ||
                    (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length)) &&
                +temp === value) {
            result = temp;
        }

        return result;
    }

    // Generate valid RegExp expression.
    // This function is based on https://github.com/Constellation/iv Engine

    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & ~1) === 0x2028) {
            return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
        } else if (ch === 10 || ch === 13) {  // \n, \r
            return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
        }
        return String.fromCharCode(ch);
    }

    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

        result = reg.toString();

        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) {
                return result;
            }

            flags = match[1];
            result = '';

            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);

                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) {  // ]
                            characterInBrack = false;
                        }
                    } else {
                        if (ch === 47) {  // /
                            result += '\\';
                        } else if (ch === 91) {  // [
                            characterInBrack = true;
                        }
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92;  // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }

            return '/' + result + '/' + flags;
        }

        return result;
    }

    function escapeAllowedCharacter(code, next) {
        var hex;

        if (code === 0x08  /* \b */) {
            return '\\b';
        }

        if (code === 0x0C  /* \f */) {
            return '\\f';
        }

        if (code === 0x09  /* \t */) {
            return '\\t';
        }

        hex = code.toString(16).toUpperCase();
        if (json || code > 0xFF) {
            return '\\u' + '0000'.slice(hex.length) + hex;
        } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
            return '\\0';
        } else if (code === 0x000B  /* \v */) { // '\v'
            return '\\x0B';
        } else {
            return '\\x' + '00'.slice(hex.length) + hex;
        }
    }

    function escapeDisallowedCharacter(code) {
        if (code === 0x5C  /* \ */) {
            return '\\\\';
        }

        if (code === 0x0A  /* \n */) {
            return '\\n';
        }

        if (code === 0x0D  /* \r */) {
            return '\\r';
        }

        if (code === 0x2028) {
            return '\\u2028';
        }

        if (code === 0x2029) {
            return '\\u2029';
        }

        throw new Error('Incorrectly classified character');
    }

    function escapeDirective(str) {
        var i, iz, code, quote;

        quote = quotes === 'double' ? '"' : '\'';
        for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                quote = '"';
                break;
            } else if (code === 0x22  /* " */) {
                quote = '\'';
                break;
            } else if (code === 0x5C  /* \ */) {
                ++i;
            }
        }

        return quote + str + quote;
    }

    function escapeString(str) {
        var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27  /* ' */) {
                ++singleQuotes;
            } else if (code === 0x22  /* " */) {
                ++doubleQuotes;
            } else if (code === 0x2F  /* / */ && json) {
                result += '\\';
            } else if (esutils.code.isLineTerminator(code) || code === 0x5C  /* \ */) {
                result += escapeDisallowedCharacter(code);
                continue;
            } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 0x20  /* SP */ || !json && !escapeless && (code < 0x20  /* SP */ || code > 0x7E  /* ~ */))) {
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }

        single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
        quote = single ? '\'' : '"';

        if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
        }

        str = result;
        result = quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
                result += '\\';
            }
            result += String.fromCharCode(code);
        }

        return result + quote;
    }

    /**
     * flatten an array to a string, where the array can contain
     * either strings or nested arrays
     */
    function flattenToString(arr) {
        var i, iz, elem, result = '';
        for (i = 0, iz = arr.length; i < iz; ++i) {
            elem = arr[i];
            result += isArray(elem) ? flattenToString(elem) : elem;
        }
        return result;
    }

    /**
     * convert generated to a SourceNode when source maps are enabled.
     */
    function toSourceNodeWhenNeeded(generated, node) {
        if (!sourceMap) {
            // with no source maps, generated is either an
            // array or a string.  if an array, flatten it.
            // if a string, just return it
            if (isArray(generated)) {
                return flattenToString(generated);
            } else {
                return generated;
            }
        }
        if (node == null) {
            if (generated instanceof SourceNode) {
                return generated;
            } else {
                node = {};
            }
        }
        if (node.loc == null) {
            return new SourceNode(null, null, sourceMap, generated, node.name || null);
        }
        return new SourceNode(node.loc.start.line, node.loc.start.column, (sourceMap === true ? node.loc.source || null : sourceMap), generated, node.name || null);
    }

    function noEmptySpace() {
        return (space) ? space : ' ';
    }

    function join(left, right) {
        var leftSource,
            rightSource,
            leftCharCode,
            rightCharCode;

        leftSource = toSourceNodeWhenNeeded(left).toString();
        if (leftSource.length === 0) {
            return [right];
        }

        rightSource = toSourceNodeWhenNeeded(right).toString();
        if (rightSource.length === 0) {
            return [left];
        }

        leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
        rightCharCode = rightSource.charCodeAt(0);

        if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
            esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) ||
            leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
            return [left, noEmptySpace(), right];
        } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) ||
                esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
            return [left, right];
        }
        return [left, space, right];
    }

    function addIndent(stmt) {
        return [base, stmt];
    }

    function withIndent(fn) {
        var previousBase;
        previousBase = base;
        base += indent;
        fn(base);
        base = previousBase;
    }

    function calculateSpaces(str) {
        var i;
        for (i = str.length - 1; i >= 0; --i) {
            if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
                break;
            }
        }
        return (str.length - 1) - i;
    }

    function adjustMultilineComment(value, specialBase) {
        var array, i, len, line, j, spaces, previousBase, sn;

        array = value.split(/\r\n|[\r\n]/);
        spaces = Number.MAX_VALUE;

        // first line doesn't have indentation
        for (i = 1, len = array.length; i < len; ++i) {
            line = array[i];
            j = 0;
            while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
                ++j;
            }
            if (spaces > j) {
                spaces = j;
            }
        }

        if (typeof specialBase !== 'undefined') {
            // pattern like
            // {
            //   var t = 20;  /*
            //                 * this is comment
            //                 */
            // }
            previousBase = base;
            if (array[1][spaces] === '*') {
                specialBase += ' ';
            }
            base = specialBase;
        } else {
            if (spaces & 1) {
                // /*
                //  *
                //  */
                // If spaces are odd number, above pattern is considered.
                // We waste 1 space.
                --spaces;
            }
            previousBase = base;
        }

        for (i = 1, len = array.length; i < len; ++i) {
            sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
            array[i] = sourceMap ? sn.join('') : sn;
        }

        base = previousBase;

        return array.join('\n');
    }

    function generateComment(comment, specialBase) {
        if (comment.type === 'Line') {
            if (endsWithLineTerminator(comment.value)) {
                return '//' + comment.value;
            } else {
                // Always use LineTerminator
                var result = '//' + comment.value;
                if (!preserveBlankLines) {
                    result += '\n';
                }
                return result;
            }
        }
        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
            return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
        }
        return '/*' + comment.value + '*/';
    }

    function addComments(stmt, result) {
        var i, len, comment, save, tailingToStatement, specialBase, fragment,
            extRange, range, prevRange, prefix, infix, suffix, count;

        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
            save = result;

            if (preserveBlankLines) {
                comment = stmt.leadingComments[0];
                result = [];

                extRange = comment.extendedRange;
                range = comment.range;

                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;
                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }

                prevRange = range;

                for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
                    comment = stmt.leadingComments[i];
                    range = comment.range;

                    infix = sourceCode.substring(prevRange[1], range[0]);
                    count = (infix.match(/\n/g) || []).length;
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));

                    prevRange = range;
                }

                suffix = sourceCode.substring(range[1], extRange[1]);
                count = (suffix.match(/\n/g) || []).length;
                result.push(stringRepeat('\n', count));
            } else {
                comment = stmt.leadingComments[0];
                result = [];
                if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                    result.push('\n');
                }
                result.push(generateComment(comment));
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push('\n');
                }

                for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                    comment = stmt.leadingComments[i];
                    fragment = [generateComment(comment)];
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        fragment.push('\n');
                    }
                    result.push(addIndent(fragment));
                }
            }

            result.push(addIndent(save));
        }

        if (stmt.trailingComments) {

            if (preserveBlankLines) {
                comment = stmt.trailingComments[0];
                extRange = comment.extendedRange;
                range = comment.range;

                prefix = sourceCode.substring(extRange[0], range[0]);
                count = (prefix.match(/\n/g) || []).length;

                if (count > 0) {
                    result.push(stringRepeat('\n', count));
                    result.push(addIndent(generateComment(comment)));
                } else {
                    result.push(prefix);
                    result.push(generateComment(comment));
                }
            } else {
                tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
                specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
                for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                    comment = stmt.trailingComments[i];
                    if (tailingToStatement) {
                        // We assume target like following script
                        //
                        // var t = 20;  /**
                        //               * This is comment of t
                        //               */
                        if (i === 0) {
                            // first case
                            result = [result, indent];
                        } else {
                            result = [result, specialBase];
                        }
                        result.push(generateComment(comment, specialBase));
                    } else {
                        result = [result, addIndent(generateComment(comment))];
                    }
                    if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result = [result, '\n'];
                    }
                }
            }
        }

        return result;
    }

    function generateBlankLines(start, end, result) {
        var j, newlineCount = 0;

        for (j = start; j < end; j++) {
            if (sourceCode[j] === '\n') {
                newlineCount++;
            }
        }

        for (j = 1; j < newlineCount; j++) {
            result.push(newline);
        }
    }

    function parenthesize(text, current, should) {
        if (current < should) {
            return ['(', text, ')'];
        }
        return text;
    }

    function generateVerbatimString(string) {
        var i, iz, result;
        result = string.split(/\r\n|\n/);
        for (i = 1, iz = result.length; i < iz; i++) {
            result[i] = newline + base + result[i];
        }
        return result;
    }

    function generateVerbatim(expr, precedence) {
        var verbatim, result, prec;
        verbatim = expr[extra.verbatim];

        if (typeof verbatim === 'string') {
            result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
        } else {
            // verbatim is object
            result = generateVerbatimString(verbatim.content);
            prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
            result = parenthesize(result, prec, precedence);
        }

        return toSourceNodeWhenNeeded(result, expr);
    }

    function CodeGenerator() {
    }

    // Helpers.

    CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
        var result, noLeadingComment, that = this;

        noLeadingComment = !extra.comment || !stmt.leadingComments;

        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
            return [space, this.generateStatement(stmt, flags)];
        }

        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
            return ';';
        }

        withIndent(function () {
            result = [
                newline,
                addIndent(that.generateStatement(stmt, flags))
            ];
        });

        return result;
    };

    CodeGenerator.prototype.maybeBlockSuffix = function (stmt, result) {
        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
            return [result, space];
        }
        if (ends) {
            return [result, base];
        }
        return [result, newline, base];
    };

    function generateIdentifier(node) {
        return toSourceNodeWhenNeeded(node.name, node);
    }

    function generateAsyncPrefix(node, spaceRequired) {
        return node.async ? 'async' + (spaceRequired ? noEmptySpace() : space) : '';
    }

    function generateStarSuffix(node) {
        var isGenerator = node.generator && !extra.moz.starlessGenerator;
        return isGenerator ? '*' + space : '';
    }

    function generateMethodPrefix(prop) {
        var func = prop.value;
        if (func.async) {
            return generateAsyncPrefix(func, !prop.computed);
        } else {
            // avoid space before method name
            return generateStarSuffix(func) ? '*' : '';
        }
    }

    CodeGenerator.prototype.generatePattern = function (node, precedence, flags) {
        if (node.type === Syntax.Identifier) {
            return generateIdentifier(node);
        }
        return this.generateExpression(node, precedence, flags);
    };

    CodeGenerator.prototype.generateFunctionParams = function (node) {
        var i, iz, result, hasDefault;

        hasDefault = false;

        if (node.type === Syntax.ArrowFunctionExpression &&
                !node.rest && (!node.defaults || node.defaults.length === 0) &&
                node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
            // arg => { } case
            result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
        } else {
            result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
            result.push('(');
            if (node.defaults) {
                hasDefault = true;
            }
            for (i = 0, iz = node.params.length; i < iz; ++i) {
                if (hasDefault && node.defaults[i]) {
                    // Handle default values.
                    result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
                } else {
                    result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
                }
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }

            if (node.rest) {
                if (node.params.length) {
                    result.push(',' + space);
                }
                result.push('...');
                result.push(generateIdentifier(node.rest));
            }

            result.push(')');
        }

        return result;
    };

    CodeGenerator.prototype.generateFunctionBody = function (node) {
        var result, expr;

        result = this.generateFunctionParams(node);

        if (node.type === Syntax.ArrowFunctionExpression) {
            result.push(space);
            result.push('=>');
        }

        if (node.expression) {
            result.push(space);
            expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
            if (expr.toString().charAt(0) === '{') {
                expr = ['(', expr, ')'];
            }
            result.push(expr);
        } else {
            result.push(this.maybeBlock(node.body, S_TTFF));
        }

        return result;
    };

    CodeGenerator.prototype.generateIterationForStatement = function (operator, stmt, flags) {
        var result = ['for' + space + '('], that = this;
        withIndent(function () {
            if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                    result.push(stmt.left.kind + noEmptySpace());
                    result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
                });
            } else {
                result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
            }

            result = join(result, operator);
            result = [join(
                result,
                that.generateExpression(stmt.right, Precedence.Sequence, E_TTT)
            ), ')'];
        });
        result.push(this.maybeBlock(stmt.body, flags));
        return result;
    };

    CodeGenerator.prototype.generatePropertyKey = function (expr, computed, value) {
        var result = [];

        if (computed) {
            result.push('[');
        }

        if (value.type === 'AssignmentPattern') {
            result.push(this.AssignmentPattern(value, Precedence.Sequence, E_TTT));
        } else {
            result.push(this.generateExpression(expr, Precedence.Sequence, E_TTT));
        }

        if (computed) {
            result.push(']');
        }

        return result;
    };

    CodeGenerator.prototype.generateAssignment = function (left, right, operator, precedence, flags) {
        if (Precedence.Assignment < precedence) {
            flags |= F_ALLOW_IN;
        }

        return parenthesize(
            [
                this.generateExpression(left, Precedence.Call, flags),
                space + operator + space,
                this.generateExpression(right, Precedence.Assignment, flags)
            ],
            Precedence.Assignment,
            precedence
        );
    };

    CodeGenerator.prototype.semicolon = function (flags) {
        if (!semicolons && flags & F_SEMICOLON_OPT) {
            return '';
        }
        return ';';
    };

    // Statements.

    CodeGenerator.Statement = {

        BlockStatement: function (stmt, flags) {
            var range, content, result = ['{', newline], that = this;

            withIndent(function () {
                // handle functions without any code
                if (stmt.body.length === 0 && preserveBlankLines) {
                    range = stmt.range;
                    if (range[1] - range[0] > 2) {
                        content = sourceCode.substring(range[0] + 1, range[1] - 1);
                        if (content[0] === '\n') {
                            result = ['{'];
                        }
                        result.push(content);
                    }
                }

                var i, iz, fragment, bodyFlags;
                bodyFlags = S_TFFF;
                if (flags & F_FUNC_BODY) {
                    bodyFlags |= F_DIRECTIVE_CTX;
                }

                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                    if (preserveBlankLines) {
                        // handle spaces before the first line
                        if (i === 0) {
                            if (stmt.body[0].leadingComments) {
                                range = stmt.body[0].leadingComments[0].extendedRange;
                                content = sourceCode.substring(range[0], range[1]);
                                if (content[0] === '\n') {
                                    result = ['{'];
                                }
                            }
                            if (!stmt.body[0].leadingComments) {
                                generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
                            }
                        }

                        // handle spaces between lines
                        if (i > 0) {
                            if (!stmt.body[i - 1].trailingComments  && !stmt.body[i].leadingComments) {
                                generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                            }
                        }
                    }

                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }

                    if (stmt.body[i].leadingComments && preserveBlankLines) {
                        fragment = that.generateStatement(stmt.body[i], bodyFlags);
                    } else {
                        fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
                    }

                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        if (preserveBlankLines && i < iz - 1) {
                            // don't add a new line if there are leading coments
                            // in the next statement
                            if (!stmt.body[i + 1].leadingComments) {
                                result.push(newline);
                            }
                        } else {
                            result.push(newline);
                        }
                    }

                    if (preserveBlankLines) {
                        // handle spaces after the last line
                        if (i === iz - 1) {
                            if (!stmt.body[i].trailingComments) {
                                generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                            }
                        }
                    }
                }
            });

            result.push(addIndent('}'));
            return result;
        },

        BreakStatement: function (stmt, flags) {
            if (stmt.label) {
                return 'break ' + stmt.label.name + this.semicolon(flags);
            }
            return 'break' + this.semicolon(flags);
        },

        ContinueStatement: function (stmt, flags) {
            if (stmt.label) {
                return 'continue ' + stmt.label.name + this.semicolon(flags);
            }
            return 'continue' + this.semicolon(flags);
        },

        ClassBody: function (stmt, flags) {
            var result = [ '{', newline], that = this;

            withIndent(function (indent) {
                var i, iz;

                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
                    result.push(indent);
                    result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(newline);
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            return result;
        },

        ClassDeclaration: function (stmt, flags) {
            var result, fragment;
            result  = ['class'];
            if (stmt.id) {
                result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT));
            }
            if (stmt.superClass) {
                fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Assignment, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(stmt.body, S_TFFT));
            return result;
        },

        DirectiveStatement: function (stmt, flags) {
            if (extra.raw && stmt.raw) {
                return stmt.raw + this.semicolon(flags);
            }
            return escapeDirective(stmt.directive) + this.semicolon(flags);
        },

        DoWhileStatement: function (stmt, flags) {
            // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
            var result = join('do', this.maybeBlock(stmt.body, S_TFFF));
            result = this.maybeBlockSuffix(stmt.body, result);
            return join(result, [
                'while' + space + '(',
                this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                ')' + this.semicolon(flags)
            ]);
        },

        CatchClause: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                var guard;

                result = [
                    'catch' + space + '(',
                    that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
                    ')'
                ];

                if (stmt.guard) {
                    guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
                    result.splice(2, 0, ' if ', guard);
                }
            });
            result.push(this.maybeBlock(stmt.body, S_TFFF));
            return result;
        },

        DebuggerStatement: function (stmt, flags) {
            return 'debugger' + this.semicolon(flags);
        },

        EmptyStatement: function (stmt, flags) {
            return ';';
        },

        ExportDefaultDeclaration: function (stmt, flags) {
            var result = [ 'export' ], bodyFlags;

            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

            // export default HoistableDeclaration[Default]
            // export default AssignmentExpression[In] ;
            result = join(result, 'default');
            if (isStatement(stmt.declaration)) {
                result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
            } else {
                result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
            }
            return result;
        },

        ExportNamedDeclaration: function (stmt, flags) {
            var result = [ 'export' ], bodyFlags, that = this;

            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;

            // export VariableStatement
            // export Declaration[Default]
            if (stmt.declaration) {
                return join(result, this.generateStatement(stmt.declaration, bodyFlags));
            }

            // export ExportClause[NoReference] FromClause ;
            // export ExportClause ;
            if (stmt.specifiers) {
                if (stmt.specifiers.length === 0) {
                    result = join(result, '{' + space + '}');
                } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
                    result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
                } else {
                    result = join(result, '{');
                    withIndent(function (indent) {
                        var i, iz;
                        result.push(newline);
                        for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                            result.push(indent);
                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                            if (i + 1 < iz) {
                                result.push(',' + newline);
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                        result.push(newline);
                    }
                    result.push(base + '}');
                }

                if (stmt.source) {
                    result = join(result, [
                        'from' + space,
                        // ModuleSpecifier
                        this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                        this.semicolon(flags)
                    ]);
                } else {
                    result.push(this.semicolon(flags));
                }
            }
            return result;
        },

        ExportAllDeclaration: function (stmt, flags) {
            // export * FromClause ;
            return [
                'export' + space,
                '*' + space,
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ];
        },

        ExpressionStatement: function (stmt, flags) {
            var result, fragment;

            function isClassPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 5) !== 'class') {
                    return false;
                }
                code = fragment.charCodeAt(5);
                return code === 0x7B  /* '{' */ || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
            }

            function isFunctionPrefixed(fragment) {
                var code;
                if (fragment.slice(0, 8) !== 'function') {
                    return false;
                }
                code = fragment.charCodeAt(8);
                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
            }

            function isAsyncPrefixed(fragment) {
                var code, i, iz;
                if (fragment.slice(0, 5) !== 'async') {
                    return false;
                }
                if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) {
                    return false;
                }
                for (i = 6, iz = fragment.length; i < iz; ++i) {
                    if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) {
                        break;
                    }
                }
                if (i === iz) {
                    return false;
                }
                if (fragment.slice(i, i + 8) !== 'function') {
                    return false;
                }
                code = fragment.charCodeAt(i + 8);
                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
            }

            result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
            // 12.4 '{', 'function', 'class' is not allowed in this position.
            // wrap expression with parentheses
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (fragment.charCodeAt(0) === 0x7B  /* '{' */ ||  // ObjectExpression
                    isClassPrefixed(fragment) ||
                    isFunctionPrefixed(fragment) ||
                    isAsyncPrefixed(fragment) ||
                    (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string')) {
                result = ['(', result, ')' + this.semicolon(flags)];
            } else {
                result.push(this.semicolon(flags));
            }
            return result;
        },

        ImportDeclaration: function (stmt, flags) {
            // ES6: 15.2.1 valid import declarations:
            //     - import ImportClause FromClause ;
            //     - import ModuleSpecifier ;
            var result, cursor, that = this;

            // If no ImportClause is present,
            // this should be `import ModuleSpecifier` so skip `from`
            // ModuleSpecifier is StringLiteral.
            if (stmt.specifiers.length === 0) {
                // import ModuleSpecifier ;
                return [
                    'import',
                    space,
                    // ModuleSpecifier
                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                    this.semicolon(flags)
                ];
            }

            // import ImportClause FromClause ;
            result = [
                'import'
            ];
            cursor = 0;

            // ImportedBinding
            if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
                result = join(result, [
                        this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                ]);
                ++cursor;
            }

            if (stmt.specifiers[cursor]) {
                if (cursor !== 0) {
                    result.push(',');
                }

                if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
                    // NameSpaceImport
                    result = join(result, [
                            space,
                            this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
                    ]);
                } else {
                    // NamedImports
                    result.push(space + '{');

                    if ((stmt.specifiers.length - cursor) === 1) {
                        // import { ... } from "...";
                        result.push(space);
                        result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
                        result.push(space + '}' + space);
                    } else {
                        // import {
                        //    ...,
                        //    ...,
                        // } from "...";
                        withIndent(function (indent) {
                            var i, iz;
                            result.push(newline);
                            for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
                                result.push(indent);
                                result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
                                if (i + 1 < iz) {
                                    result.push(',' + newline);
                                }
                            }
                        });
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                            result.push(newline);
                        }
                        result.push(base + '}' + space);
                    }
                }
            }

            result = join(result, [
                'from' + space,
                // ModuleSpecifier
                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
                this.semicolon(flags)
            ]);
            return result;
        },

        VariableDeclarator: function (stmt, flags) {
            var itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
            if (stmt.init) {
                return [
                    this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
                    space,
                    '=',
                    space,
                    this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
                ];
            }
            return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
        },

        VariableDeclaration: function (stmt, flags) {
            // VariableDeclarator is typed as Statement,
            // but joined with comma (not LineTerminator).
            // So if comment is attached to target node, we should specialize.
            var result, i, iz, node, bodyFlags, that = this;

            result = [ stmt.kind ];

            bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;

            function block() {
                node = stmt.declarations[0];
                if (extra.comment && node.leadingComments) {
                    result.push('\n');
                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
                } else {
                    result.push(noEmptySpace());
                    result.push(that.generateStatement(node, bodyFlags));
                }

                for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
                    node = stmt.declarations[i];
                    if (extra.comment && node.leadingComments) {
                        result.push(',' + newline);
                        result.push(addIndent(that.generateStatement(node, bodyFlags)));
                    } else {
                        result.push(',' + space);
                        result.push(that.generateStatement(node, bodyFlags));
                    }
                }
            }

            if (stmt.declarations.length > 1) {
                withIndent(block);
            } else {
                block();
            }

            result.push(this.semicolon(flags));

            return result;
        },

        ThrowStatement: function (stmt, flags) {
            return [join(
                'throw',
                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
            ), this.semicolon(flags)];
        },

        TryStatement: function (stmt, flags) {
            var result, i, iz, guardedHandlers;

            result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
            result = this.maybeBlockSuffix(stmt.block, result);

            if (stmt.handlers) {
                // old interface
                for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                        result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
                    }
                }
            } else {
                guardedHandlers = stmt.guardedHandlers || [];

                for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
                    result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
                    if (stmt.finalizer || i + 1 !== iz) {
                        result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
                    }
                }

                // new interface
                if (stmt.handler) {
                    if (isArray(stmt.handler)) {
                        for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
                            result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
                            if (stmt.finalizer || i + 1 !== iz) {
                                result = this.maybeBlockSuffix(stmt.handler[i].body, result);
                            }
                        }
                    } else {
                        result = join(result, this.generateStatement(stmt.handler, S_TFFF));
                        if (stmt.finalizer) {
                            result = this.maybeBlockSuffix(stmt.handler.body, result);
                        }
                    }
                }
            }
            if (stmt.finalizer) {
                result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
            }
            return result;
        },

        SwitchStatement: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                result = [
                    'switch' + space + '(',
                    that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
                    ')' + space + '{' + newline
                ];
            });
            if (stmt.cases) {
                bodyFlags = S_TFFF;
                for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }
                    fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
                    result.push(fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            }
            result.push(addIndent('}'));
            return result;
        },

        SwitchCase: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                if (stmt.test) {
                    result = [
                        join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
                        ':'
                    ];
                } else {
                    result = ['default:'];
                }

                i = 0;
                iz = stmt.consequent.length;
                if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
                    fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
                    result.push(fragment);
                    i = 1;
                }

                if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                    result.push(newline);
                }

                bodyFlags = S_TFFF;
                for (; i < iz; ++i) {
                    if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                        bodyFlags |= F_SEMICOLON_OPT;
                    }
                    fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
                    result.push(fragment);
                    if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                        result.push(newline);
                    }
                }
            });
            return result;
        },

        IfStatement: function (stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            withIndent(function () {
                result = [
                    'if' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            semicolonOptional = flags & F_SEMICOLON_OPT;
            bodyFlags = S_TFFF;
            if (semicolonOptional) {
                bodyFlags |= F_SEMICOLON_OPT;
            }
            if (stmt.alternate) {
                result.push(this.maybeBlock(stmt.consequent, S_TFFF));
                result = this.maybeBlockSuffix(stmt.consequent, result);
                if (stmt.alternate.type === Syntax.IfStatement) {
                    result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
                } else {
                    result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
                }
            } else {
                result.push(this.maybeBlock(stmt.consequent, bodyFlags));
            }
            return result;
        },

        ForStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = ['for' + space + '('];
                if (stmt.init) {
                    if (stmt.init.type === Syntax.VariableDeclaration) {
                        result.push(that.generateStatement(stmt.init, S_FFFF));
                    } else {
                        // F_ALLOW_IN becomes false.
                        result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
                        result.push(';');
                    }
                } else {
                    result.push(';');
                }

                if (stmt.test) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
                    result.push(';');
                } else {
                    result.push(';');
                }

                if (stmt.update) {
                    result.push(space);
                    result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
                    result.push(')');
                } else {
                    result.push(')');
                }
            });

            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },

        ForInStatement: function (stmt, flags) {
            return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },

        ForOfStatement: function (stmt, flags) {
            return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
        },

        LabeledStatement: function (stmt, flags) {
            return [stmt.label.name + ':', this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
        },

        Program: function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            iz = stmt.body.length;
            result = [safeConcatenation && iz > 0 ? '\n' : ''];
            bodyFlags = S_TFTF;
            for (i = 0; i < iz; ++i) {
                if (!safeConcatenation && i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT;
                }

                if (preserveBlankLines) {
                    // handle spaces before the first line
                    if (i === 0) {
                        if (!stmt.body[0].leadingComments) {
                            generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
                        }
                    }

                    // handle spaces between lines
                    if (i > 0) {
                        if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
                            generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
                        }
                    }
                }

                fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
                result.push(fragment);
                if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    if (preserveBlankLines) {
                        if (!stmt.body[i + 1].leadingComments) {
                            result.push(newline);
                        }
                    } else {
                        result.push(newline);
                    }
                }

                if (preserveBlankLines) {
                    // handle spaces after the last line
                    if (i === iz - 1) {
                        if (!stmt.body[i].trailingComments) {
                            generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
                        }
                    }
                }
            }
            return result;
        },

        FunctionDeclaration: function (stmt, flags) {
            return [
                generateAsyncPrefix(stmt, true),
                'function',
                generateStarSuffix(stmt) || noEmptySpace(),
                stmt.id ? generateIdentifier(stmt.id) : '',
                this.generateFunctionBody(stmt)
            ];
        },

        ReturnStatement: function (stmt, flags) {
            if (stmt.argument) {
                return [join(
                    'return',
                    this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
                ), this.semicolon(flags)];
            }
            return ['return' + this.semicolon(flags)];
        },

        WhileStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    'while' + space + '(',
                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        },

        WithStatement: function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    'with' + space + '(',
                    that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
                    ')'
                ];
            });
            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result;
        }

    };

    merge(CodeGenerator.prototype, CodeGenerator.Statement);

    // Expressions.

    CodeGenerator.Expression = {

        SequenceExpression: function (expr, precedence, flags) {
            var result, i, iz;
            if (Precedence.Sequence < precedence) {
                flags |= F_ALLOW_IN;
            }
            result = [];
            for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
                result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            return parenthesize(result, Precedence.Sequence, precedence);
        },

        AssignmentExpression: function (expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
        },

        ArrowFunctionExpression: function (expr, precedence, flags) {
            return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
        },

        ConditionalExpression: function (expr, precedence, flags) {
            if (Precedence.Conditional < precedence) {
                flags |= F_ALLOW_IN;
            }
            return parenthesize(
                [
                    this.generateExpression(expr.test, Precedence.LogicalOR, flags),
                    space + '?' + space,
                    this.generateExpression(expr.consequent, Precedence.Assignment, flags),
                    space + ':' + space,
                    this.generateExpression(expr.alternate, Precedence.Assignment, flags)
                ],
                Precedence.Conditional,
                precedence
            );
        },

        LogicalExpression: function (expr, precedence, flags) {
            return this.BinaryExpression(expr, precedence, flags);
        },

        BinaryExpression: function (expr, precedence, flags) {
            var result, currentPrecedence, fragment, leftSource;
            currentPrecedence = BinaryPrecedence[expr.operator];

            if (currentPrecedence < precedence) {
                flags |= F_ALLOW_IN;
            }

            fragment = this.generateExpression(expr.left, currentPrecedence, flags);

            leftSource = fragment.toString();

            if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
                result = [fragment, noEmptySpace(), expr.operator];
            } else {
                result = join(fragment, expr.operator);
            }

            fragment = this.generateExpression(expr.right, currentPrecedence + 1, flags);

            if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
            expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
                // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
                result.push(noEmptySpace());
                result.push(fragment);
            } else {
                result = join(result, fragment);
            }

            if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
                return ['(', result, ')'];
            }
            return parenthesize(result, currentPrecedence, precedence);
        },

        CallExpression: function (expr, precedence, flags) {
            var result, i, iz;
            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
            result.push('(');
            for (i = 0, iz = expr['arguments'].length; i < iz; ++i) {
                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                if (i + 1 < iz) {
                    result.push(',' + space);
                }
            }
            result.push(')');

            if (!(flags & F_ALLOW_CALL)) {
                return ['(', result, ')'];
            }
            return parenthesize(result, Precedence.Call, precedence);
        },

        NewExpression: function (expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            length = expr['arguments'].length;

            // F_ALLOW_CALL becomes false.
            // F_ALLOW_UNPARATH_NEW may become false.
            itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;

            result = join(
                'new',
                this.generateExpression(expr.callee, Precedence.New, itemFlags)
            );

            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
                result.push('(');
                for (i = 0, iz = length; i < iz; ++i) {
                    result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + space);
                    }
                }
                result.push(')');
            }

            return parenthesize(result, Precedence.New, precedence);
        },

        MemberExpression: function (expr, precedence, flags) {
            var result, fragment;

            // F_ALLOW_UNPARATH_NEW becomes false.
            result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];

            if (expr.computed) {
                result.push('[');
                result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
                result.push(']');
            } else {
                if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                    fragment = toSourceNodeWhenNeeded(result).toString();
                    // When the following conditions are all true,
                    //   1. No floating point
                    //   2. Don't have exponents
                    //   3. The last character is a decimal digit
                    //   4. Not hexadecimal OR octal number literal
                    // we should add a floating point.
                    if (
                            fragment.indexOf('.') < 0 &&
                            !/[eExX]/.test(fragment) &&
                            esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
                            !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
                            ) {
                        result.push(' ');
                    }
                }
                result.push('.');
                result.push(generateIdentifier(expr.property));
            }

            return parenthesize(result, Precedence.Member, precedence);
        },

        MetaProperty: function (expr, precedence, flags) {
            var result;
            result = [];
            result.push(expr.meta);
            result.push('.');
            result.push(expr.property);
            return parenthesize(result, Precedence.Member, precedence);
        },

        UnaryExpression: function (expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);

            if (space === '') {
                result = join(expr.operator, fragment);
            } else {
                result = [expr.operator];
                if (expr.operator.length > 2) {
                    // delete, void, typeof
                    // get `typeof []`, not `typeof[]`
                    result = join(result, fragment);
                } else {
                    // Prevent inserting spaces between operator and argument if it is unnecessary
                    // like, `!cond`
                    leftSource = toSourceNodeWhenNeeded(result).toString();
                    leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                    rightCharCode = fragment.toString().charCodeAt(0);

                    if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
                            (esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode))) {
                        result.push(noEmptySpace());
                        result.push(fragment);
                    } else {
                        result.push(fragment);
                    }
                }
            }
            return parenthesize(result, Precedence.Unary, precedence);
        },

        YieldExpression: function (expr, precedence, flags) {
            var result;
            if (expr.delegate) {
                result = 'yield*';
            } else {
                result = 'yield';
            }
            if (expr.argument) {
                result = join(
                    result,
                    this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
                );
            }
            return parenthesize(result, Precedence.Yield, precedence);
        },

        AwaitExpression: function (expr, precedence, flags) {
            var result = join(
                expr.all ? 'await*' : 'await',
                this.generateExpression(expr.argument, Precedence.Await, E_TTT)
            );
            return parenthesize(result, Precedence.Await, precedence);
        },

        UpdateExpression: function (expr, precedence, flags) {
            if (expr.prefix) {
                return parenthesize(
                    [
                        expr.operator,
                        this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
                    ],
                    Precedence.Unary,
                    precedence
                );
            }
            return parenthesize(
                [
                    this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
                    expr.operator
                ],
                Precedence.Postfix,
                precedence
            );
        },

        FunctionExpression: function (expr, precedence, flags) {
            var result = [
                generateAsyncPrefix(expr, true),
                'function'
            ];
            if (expr.id) {
                result.push(generateStarSuffix(expr) || noEmptySpace());
                result.push(generateIdentifier(expr.id));
            } else {
                result.push(generateStarSuffix(expr) || space);
            }
            result.push(this.generateFunctionBody(expr));
            return result;
        },

        ArrayPattern: function (expr, precedence, flags) {
            return this.ArrayExpression(expr, precedence, flags, true);
        },

        ArrayExpression: function (expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            if (!expr.elements.length) {
                return '[]';
            }
            multiline = isPattern ? false : expr.elements.length > 1;
            result = ['[', multiline ? newline : ''];
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr.elements.length; i < iz; ++i) {
                    if (!expr.elements[i]) {
                        if (multiline) {
                            result.push(indent);
                        }
                        if (i + 1 === iz) {
                            result.push(',');
                        }
                    } else {
                        result.push(multiline ? indent : '');
                        result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
                    }
                    if (i + 1 < iz) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push(']');
            return result;
        },

        RestElement: function(expr, precedence, flags) {
            return '...' + this.generatePattern(expr.argument);
        },

        ClassExpression: function (expr, precedence, flags) {
            var result, fragment;
            result = ['class'];
            if (expr.id) {
                result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
            }
            if (expr.superClass) {
                fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Assignment, E_TTT));
                result = join(result, fragment);
            }
            result.push(space);
            result.push(this.generateStatement(expr.body, S_TFFT));
            return result;
        },

        MethodDefinition: function (expr, precedence, flags) {
            var result, fragment;
            if (expr['static']) {
                result = ['static' + space];
            } else {
                result = [];
            }
            if (expr.kind === 'get' || expr.kind === 'set') {
                fragment = [
                    join(expr.kind, this.generatePropertyKey(expr.key, expr.computed, expr.value)),
                    this.generateFunctionBody(expr.value)
                ];
            } else {
                fragment = [
                    generateMethodPrefix(expr),
                    this.generatePropertyKey(expr.key, expr.computed, expr.value),
                    this.generateFunctionBody(expr.value)
                ];
            }
            return join(result, fragment);
        },

        Property: function (expr, precedence, flags) {
            if (expr.kind === 'get' || expr.kind === 'set') {
                return [
                    expr.kind, noEmptySpace(),
                    this.generatePropertyKey(expr.key, expr.computed, expr.value),
                    this.generateFunctionBody(expr.value)
                ];
            }

            if (expr.shorthand) {
                return this.generatePropertyKey(expr.key, expr.computed, expr.value);
            }

            if (expr.method) {
                return [
                    generateMethodPrefix(expr),
                    this.generatePropertyKey(expr.key, expr.computed, expr.value),
                    this.generateFunctionBody(expr.value)
                ];
            }

            return [
                this.generatePropertyKey(expr.key, expr.computed, expr.value),
                ':' + space,
                this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
            ];
        },

        ObjectExpression: function (expr, precedence, flags) {
            var multiline, result, fragment, that = this;

            if (!expr.properties.length) {
                return '{}';
            }
            multiline = expr.properties.length > 1;

            withIndent(function () {
                fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
            });

            if (!multiline) {
                // issues 4
                // Do not transform from
                //   dejavu.Class.declare({
                //       method2: function () {}
                //   });
                // to
                //   dejavu.Class.declare({method2: function () {
                //       }});
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    return [ '{', space, fragment, space, '}' ];
                }
            }

            withIndent(function (indent) {
                var i, iz;
                result = [ '{', newline, indent, fragment ];

                if (multiline) {
                    result.push(',' + newline);
                    for (i = 1, iz = expr.properties.length; i < iz; ++i) {
                        result.push(indent);
                        result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                        if (i + 1 < iz) {
                            result.push(',' + newline);
                        }
                    }
                }
            });

            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(base);
            result.push('}');
            return result;
        },

        AssignmentPattern: function(expr, precedence, flags) {
            return this.generateAssignment(expr.left, expr.right, '=', precedence, flags);
        },

        ObjectPattern: function (expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr.properties.length) {
                return '{}';
            }

            multiline = false;
            if (expr.properties.length === 1) {
                property = expr.properties[0];
                if (property.value.type !== Syntax.Identifier) {
                    multiline = true;
                }
            } else {
                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                    property = expr.properties[i];
                    if (!property.shorthand) {
                        multiline = true;
                        break;
                    }
                }
            }
            result = ['{', multiline ? newline : '' ];

            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
                    result.push(multiline ? indent : '');
                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
                    if (i + 1 < iz) {
                        result.push(',' + (multiline ? newline : space));
                    }
                }
            });

            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
            }
            result.push(multiline ? base : '');
            result.push('}');
            return result;
        },

        ThisExpression: function (expr, precedence, flags) {
            return 'this';
        },

        Super: function (expr, precedence, flags) {
            return 'super';
        },

        Identifier: function (expr, precedence, flags) {
            return generateIdentifier(expr);
        },

        ImportDefaultSpecifier: function (expr, precedence, flags) {
            return generateIdentifier(expr.id || expr.local);
        },

        ImportNamespaceSpecifier: function (expr, precedence, flags) {
            var result = ['*'];
            var id = expr.id || expr.local;
            if (id) {
                result.push(space + 'as' + noEmptySpace() + generateIdentifier(id));
            }
            return result;
        },

        ImportSpecifier: function (expr, precedence, flags) {
            var imported = expr.imported;
            var result = [ imported.name ];
            var local = expr.local;
            if (local && local.name !== imported.name) {
                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(local));
            }
            return result;
        },

        ExportSpecifier: function (expr, precedence, flags) {
            var local = expr.local;
            var result = [ local.name ];
            var exported = expr.exported;
            if (exported && exported.name !== local.name) {
                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(exported));
            }
            return result;
        },

        Literal: function (expr, precedence, flags) {
            var raw;
            if (expr.hasOwnProperty('raw') && parse && extra.raw) {
                try {
                    raw = parse(expr.raw).body[0].expression;
                    if (raw.type === Syntax.Literal) {
                        if (raw.value === expr.value) {
                            return expr.raw;
                        }
                    }
                } catch (e) {
                    // not use raw property
                }
            }

            if (expr.value === null) {
                return 'null';
            }

            if (typeof expr.value === 'string') {
                return escapeString(expr.value);
            }

            if (typeof expr.value === 'number') {
                return generateNumber(expr.value);
            }

            if (typeof expr.value === 'boolean') {
                return expr.value ? 'true' : 'false';
            }

            if (expr.regex) {
              return '/' + expr.regex.pattern + '/' + expr.regex.flags;
            }
            return generateRegExp(expr.value);
        },

        GeneratorExpression: function (expr, precedence, flags) {
            return this.ComprehensionExpression(expr, precedence, flags);
        },

        ComprehensionExpression: function (expr, precedence, flags) {
            // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
            // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6

            var result, i, iz, fragment, that = this;
            result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];

            if (extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
                result.push(fragment);
            }

            if (expr.blocks) {
                withIndent(function () {
                    for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
                        fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
                        if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                            result = join(result, fragment);
                        } else {
                            result.push(fragment);
                        }
                    }
                });
            }

            if (expr.filter) {
                result = join(result, 'if' + space);
                fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
                result = join(result, [ '(', fragment, ')' ]);
            }

            if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);

                result = join(result, fragment);
            }

            result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
            return result;
        },

        ComprehensionBlock: function (expr, precedence, flags) {
            var fragment;
            if (expr.left.type === Syntax.VariableDeclaration) {
                fragment = [
                    expr.left.kind, noEmptySpace(),
                    this.generateStatement(expr.left.declarations[0], S_FFFF)
                ];
            } else {
                fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
            }

            fragment = join(fragment, expr.of ? 'of' : 'in');
            fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));

            return [ 'for' + space + '(', fragment, ')' ];
        },

        SpreadElement: function (expr, precedence, flags) {
            return [
                '...',
                this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
            ];
        },

        TaggedTemplateExpression: function (expr, precedence, flags) {
            var itemFlags = E_TTF;
            if (!(flags & F_ALLOW_CALL)) {
                itemFlags = E_TFF;
            }
            var result = [
                this.generateExpression(expr.tag, Precedence.Call, itemFlags),
                this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
            ];
            return parenthesize(result, Precedence.TaggedTemplate, precedence);
        },

        TemplateElement: function (expr, precedence, flags) {
            // Don't use "cooked". Since tagged template can use raw template
            // representation. So if we do so, it breaks the script semantics.
            return expr.value.raw;
        },

        TemplateLiteral: function (expr, precedence, flags) {
            var result, i, iz;
            result = [ '`' ];
            for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
                result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
                if (i + 1 < iz) {
                    result.push('${' + space);
                    result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
                    result.push(space + '}');
                }
            }
            result.push('`');
            return result;
        },

        ModuleSpecifier: function (expr, precedence, flags) {
            return this.Literal(expr, precedence, flags);
        }

    };

    merge(CodeGenerator.prototype, CodeGenerator.Expression);

    CodeGenerator.prototype.generateExpression = function (expr, precedence, flags) {
        var result, type;

        type = expr.type || Syntax.Property;

        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
            return generateVerbatim(expr, precedence);
        }

        result = this[type](expr, precedence, flags);


        if (extra.comment) {
            result = addComments(expr, result);
        }
        return toSourceNodeWhenNeeded(result, expr);
    };

    CodeGenerator.prototype.generateStatement = function (stmt, flags) {
        var result,
            fragment;

        result = this[stmt.type](stmt, flags);

        // Attach comments

        if (extra.comment) {
            result = addComments(stmt, result);
        }

        fragment = toSourceNodeWhenNeeded(result).toString();
        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
            result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
        }

        return toSourceNodeWhenNeeded(result, stmt);
    };

    function generateInternal(node) {
        var codegen;

        codegen = new CodeGenerator();
        if (isStatement(node)) {
            return codegen.generateStatement(node, S_TFFF);
        }

        if (isExpression(node)) {
            return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
        }

        throw new Error('Unknown node type: ' + node.type);
    }

    function generate(node, options) {
        var defaultOptions = getDefaultOptions(), result, pair;

        if (options != null) {
            // Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
            }
            if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions, options);
            indent = options.format.indent.style;
            if (typeof options.base === 'string') {
                base = options.base;
            } else {
                base = stringRepeat(indent, options.format.indent.base);
            }
        } else {
            options = defaultOptions;
            indent = options.format.indent.style;
            base = stringRepeat(indent, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;
        newline = options.format.newline;
        space = options.format.space;
        if (options.format.compact) {
            newline = space = indent = base = '';
        }
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        sourceMap = options.sourceMap;
        sourceCode = options.sourceCode;
        preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
        extra = options;

        if (sourceMap) {
            if (!exports.browser) {
                // We assume environment is node.js
                // And prevent from including source-map by browserify
                SourceNode = __webpack_require__(24).SourceNode;
            } else {
                SourceNode = global.sourceMap.SourceNode;
            }
        }

        result = generateInternal(node);

        if (!sourceMap) {
            pair = {code: result.toString(), map: null};
            return options.sourceMapWithCode ? pair : pair.code;
        }


        pair = result.toStringWithSourceMap({
            file: options.file,
            sourceRoot: options.sourceMapRoot
        });

        if (options.sourceContent) {
            pair.map.setSourceContent(options.sourceMap,
                                      options.sourceContent);
        }

        if (options.sourceMapWithCode) {
            return pair;
        }

        return pair.map.toString();
    }

    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };

    FORMAT_DEFAULTS = getDefaultOptions().format;

    exports.version = __webpack_require__(31).version;
    exports.generate = generate;
    exports.attachComments = estraverse.attachComments;
    exports.Precedence = updateDeeply({}, Precedence);
    exports.browser = false;
    exports.FORMAT_MINIFY = FORMAT_MINIFY;
    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
}());
/* vim: set sw=4 ts=4 et tw=80 : */

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*jslint vars:false, bitwise:true*/
/*jshint indent:4*/
/*global exports:true*/
(function clone(exports) {
    'use strict';

    var Syntax,
        isArray,
        VisitorOption,
        VisitorKeys,
        objectCreate,
        objectKeys,
        BREAK,
        SKIP,
        REMOVE;

    function ignoreJSHintError() { }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function deepCopy(obj) {
        var ret = {}, key, val;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object' && val !== null) {
                    ret[key] = deepCopy(val);
                } else {
                    ret[key] = val;
                }
            }
        }
        return ret;
    }

    function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    ignoreJSHintError(shallowCopy);

    // based on LLVM libc++ upper_bound / lower_bound
    // MIT License

    function upperBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                len = diff;
            } else {
                i = current + 1;
                len -= diff + 1;
            }
        }
        return i;
    }

    function lowerBound(array, func) {
        var diff, len, i, current;

        len = array.length;
        i = 0;

        while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
                i = current + 1;
                len -= diff + 1;
            } else {
                len = diff;
            }
        }
        return i;
    }
    ignoreJSHintError(lowerBound);

    objectCreate = Object.create || (function () {
        function F() { }

        return function (o) {
            F.prototype = o;
            return new F();
        };
    })();

    objectKeys = Object.keys || function (o) {
        var keys = [], key;
        for (key in o) {
            keys.push(key);
        }
        return keys;
    };

    function extend(to, from) {
        var keys = objectKeys(from), key, i, len;
        for (i = 0, len = keys.length; i < len; i += 1) {
            key = keys[i];
            to[key] = from[key];
        }
        return to;
    }

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        AssignmentPattern: 'AssignmentPattern',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        AwaitExpression: 'AwaitExpression', // CAUTION: It's deferred to ES7.
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: 'ComprehensionExpression',  // CAUTION: It's deferred to ES7.
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExportAllDeclaration: 'ExportAllDeclaration',
        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
        ExportNamedDeclaration: 'ExportNamedDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',  // CAUTION: It's deferred to ES7.
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportDeclaration: 'ImportDeclaration',
        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
        ImportSpecifier: 'ImportSpecifier',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MetaProperty: 'MetaProperty',
        MethodDefinition: 'MethodDefinition',
        ModuleSpecifier: 'ModuleSpecifier',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        RestElement: 'RestElement',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        Super: 'Super',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    VisitorKeys = {
        AssignmentExpression: ['left', 'right'],
        AssignmentPattern: ['left', 'right'],
        ArrayExpression: ['elements'],
        ArrayPattern: ['elements'],
        ArrowFunctionExpression: ['params', 'body'],
        AwaitExpression: ['argument'], // CAUTION: It's deferred to ES7.
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ClassBody: ['body'],
        ClassDeclaration: ['id', 'superClass', 'body'],
        ClassExpression: ['id', 'superClass', 'body'],
        ComprehensionBlock: ['left', 'right'],  // CAUTION: It's deferred to ES7.
        ComprehensionExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExportAllDeclaration: ['source'],
        ExportDefaultDeclaration: ['declaration'],
        ExportNamedDeclaration: ['declaration', 'specifiers', 'source'],
        ExportSpecifier: ['exported', 'local'],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        ForOfStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'body'],
        FunctionExpression: ['id', 'params', 'body'],
        GeneratorExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        ImportDeclaration: ['specifiers', 'source'],
        ImportDefaultSpecifier: ['local'],
        ImportNamespaceSpecifier: ['local'],
        ImportSpecifier: ['imported', 'local'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        MetaProperty: ['meta', 'property'],
        MethodDefinition: ['key', 'value'],
        ModuleSpecifier: [],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        ObjectPattern: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        RestElement: [ 'argument' ],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SpreadElement: ['argument'],
        Super: [],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        TaggedTemplateExpression: ['tag', 'quasi'],
        TemplateElement: [],
        TemplateLiteral: ['quasis', 'expressions'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handler', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body'],
        YieldExpression: ['argument']
    };

    // unique id
    BREAK = {};
    SKIP = {};
    REMOVE = {};

    VisitorOption = {
        Break: BREAK,
        Skip: SKIP,
        Remove: REMOVE
    };

    function Reference(parent, key) {
        this.parent = parent;
        this.key = key;
    }

    Reference.prototype.replace = function replace(node) {
        this.parent[this.key] = node;
    };

    Reference.prototype.remove = function remove() {
        if (isArray(this.parent)) {
            this.parent.splice(this.key, 1);
            return true;
        } else {
            this.replace(null);
            return false;
        }
    };

    function Element(node, path, wrap, ref) {
        this.node = node;
        this.path = path;
        this.wrap = wrap;
        this.ref = ref;
    }

    function Controller() { }

    // API:
    // return property path array from root to current node
    Controller.prototype.path = function path() {
        var i, iz, j, jz, result, element;

        function addToPath(result, path) {
            if (isArray(path)) {
                for (j = 0, jz = path.length; j < jz; ++j) {
                    result.push(path[j]);
                }
            } else {
                result.push(path);
            }
        }

        // root node
        if (!this.__current.path) {
            return null;
        }

        // first node is sentinel, second node is root element
        result = [];
        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
        }
        addToPath(result, this.__current.path);
        return result;
    };

    // API:
    // return type of current node
    Controller.prototype.type = function () {
        var node = this.current();
        return node.type || this.__current.wrap;
    };

    // API:
    // return array of parent elements
    Controller.prototype.parents = function parents() {
        var i, iz, result;

        // first node is sentinel
        result = [];
        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
        }

        return result;
    };

    // API:
    // return current node
    Controller.prototype.current = function current() {
        return this.__current.node;
    };

    Controller.prototype.__execute = function __execute(callback, element) {
        var previous, result;

        result = undefined;

        previous  = this.__current;
        this.__current = element;
        this.__state = null;
        if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
        }
        this.__current = previous;

        return result;
    };

    // API:
    // notify control skip / break
    Controller.prototype.notify = function notify(flag) {
        this.__state = flag;
    };

    // API:
    // skip child nodes of current node
    Controller.prototype.skip = function () {
        this.notify(SKIP);
    };

    // API:
    // break traversals
    Controller.prototype['break'] = function () {
        this.notify(BREAK);
    };

    // API:
    // remove node
    Controller.prototype.remove = function () {
        this.notify(REMOVE);
    };

    Controller.prototype.__initialize = function(root, visitor) {
        this.visitor = visitor;
        this.root = root;
        this.__worklist = [];
        this.__leavelist = [];
        this.__current = null;
        this.__state = null;
        this.__fallback = null;
        if (visitor.fallback === 'iteration') {
            this.__fallback = objectKeys;
        } else if (typeof visitor.fallback === 'function') {
            this.__fallback = visitor.fallback;
        }

        this.__keys = VisitorKeys;
        if (visitor.keys) {
            this.__keys = extend(objectCreate(this.__keys), visitor.keys);
        }
    };

    function isNode(node) {
        if (node == null) {
            return false;
        }
        return typeof node === 'object' && typeof node.type === 'string';
    }

    function isProperty(nodeType, key) {
        return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === key;
    }

    Controller.prototype.traverse = function traverse(root, visitor) {
        var worklist,
            leavelist,
            element,
            node,
            nodeType,
            ret,
            key,
            current,
            current2,
            candidates,
            candidate,
            sentinel;

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        worklist.push(new Element(root, null, null, null));
        leavelist.push(new Element(null, null, null, null));

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                ret = this.__execute(visitor.leave, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }
                continue;
            }

            if (element.node) {

                ret = this.__execute(visitor.enter, element);

                if (this.__state === BREAK || ret === BREAK) {
                    return;
                }

                worklist.push(sentinel);
                leavelist.push(element);

                if (this.__state === SKIP || ret === SKIP) {
                    continue;
                }

                node = element.node;
                nodeType = node.type || element.wrap;
                candidates = this.__keys[nodeType];
                if (!candidates) {
                    if (this.__fallback) {
                        candidates = this.__fallback(node);
                    } else {
                        throw new Error('Unknown node type ' + nodeType + '.');
                    }
                }

                current = candidates.length;
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue;
                    }

                    if (isArray(candidate)) {
                        current2 = candidate.length;
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue;
                            }
                            if (isProperty(nodeType, candidates[current])) {
                                element = new Element(candidate[current2], [key, current2], 'Property', null);
                            } else if (isNode(candidate[current2])) {
                                element = new Element(candidate[current2], [key, current2], null, null);
                            } else {
                                continue;
                            }
                            worklist.push(element);
                        }
                    } else if (isNode(candidate)) {
                        worklist.push(new Element(candidate, key, null, null));
                    }
                }
            }
        }
    };

    Controller.prototype.replace = function replace(root, visitor) {
        var worklist,
            leavelist,
            node,
            nodeType,
            target,
            element,
            current,
            current2,
            candidates,
            candidate,
            sentinel,
            outer,
            key;

        function removeElem(element) {
            var i,
                key,
                nextElem,
                parent;

            if (element.ref.remove()) {
                // When the reference is an element of an array.
                key = element.ref.key;
                parent = element.ref.parent;

                // If removed from array, then decrease following items' keys.
                i = worklist.length;
                while (i--) {
                    nextElem = worklist[i];
                    if (nextElem.ref && nextElem.ref.parent === parent) {
                        if  (nextElem.ref.key < key) {
                            break;
                        }
                        --nextElem.ref.key;
                    }
                }
            }
        }

        this.__initialize(root, visitor);

        sentinel = {};

        // reference
        worklist = this.__worklist;
        leavelist = this.__leavelist;

        // initialize
        outer = {
            root: root
        };
        element = new Element(root, null, null, new Reference(outer, 'root'));
        worklist.push(element);
        leavelist.push(element);

        while (worklist.length) {
            element = worklist.pop();

            if (element === sentinel) {
                element = leavelist.pop();

                target = this.__execute(visitor.leave, element);

                // node may be replaced with null,
                // so distinguish between undefined and null in this place
                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                    // replace
                    element.ref.replace(target);
                }

                if (this.__state === REMOVE || target === REMOVE) {
                    removeElem(element);
                }

                if (this.__state === BREAK || target === BREAK) {
                    return outer.root;
                }
                continue;
            }

            target = this.__execute(visitor.enter, element);

            // node may be replaced with null,
            // so distinguish between undefined and null in this place
            if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                // replace
                element.ref.replace(target);
                element.node = target;
            }

            if (this.__state === REMOVE || target === REMOVE) {
                removeElem(element);
                element.node = null;
            }

            if (this.__state === BREAK || target === BREAK) {
                return outer.root;
            }

            // node may be null
            node = element.node;
            if (!node) {
                continue;
            }

            worklist.push(sentinel);
            leavelist.push(element);

            if (this.__state === SKIP || target === SKIP) {
                continue;
            }

            nodeType = node.type || element.wrap;
            candidates = this.__keys[nodeType];
            if (!candidates) {
                if (this.__fallback) {
                    candidates = this.__fallback(node);
                } else {
                    throw new Error('Unknown node type ' + nodeType + '.');
                }
            }

            current = candidates.length;
            while ((current -= 1) >= 0) {
                key = candidates[current];
                candidate = node[key];
                if (!candidate) {
                    continue;
                }

                if (isArray(candidate)) {
                    current2 = candidate.length;
                    while ((current2 -= 1) >= 0) {
                        if (!candidate[current2]) {
                            continue;
                        }
                        if (isProperty(nodeType, candidates[current])) {
                            element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
                        } else if (isNode(candidate[current2])) {
                            element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
                        } else {
                            continue;
                        }
                        worklist.push(element);
                    }
                } else if (isNode(candidate)) {
                    worklist.push(new Element(candidate, key, null, new Reference(node, key)));
                }
            }
        }

        return outer.root;
    };

    function traverse(root, visitor) {
        var controller = new Controller();
        return controller.traverse(root, visitor);
    }

    function replace(root, visitor) {
        var controller = new Controller();
        return controller.replace(root, visitor);
    }

    function extendCommentRange(comment, tokens) {
        var target;

        target = upperBound(tokens, function search(token) {
            return token.range[0] > comment.range[0];
        });

        comment.extendedRange = [comment.range[0], comment.range[1]];

        if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
        }

        target -= 1;
        if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
        }

        return comment;
    }

    function attachComments(tree, providedComments, tokens) {
        // At first, we should calculate extended comment ranges.
        var comments = [], comment, len, i, cursor;

        if (!tree.range) {
            throw new Error('attachComments needs range information');
        }

        // tokens array is empty, we attach comments to tree as 'leadingComments'
        if (!tokens.length) {
            if (providedComments.length) {
                for (i = 0, len = providedComments.length; i < len; i += 1) {
                    comment = deepCopy(providedComments[i]);
                    comment.extendedRange = [0, tree.range[0]];
                    comments.push(comment);
                }
                tree.leadingComments = comments;
            }
            return tree;
        }

        for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
        }

        // This is based on John Freeman's implementation.
        cursor = 0;
        traverse(tree, {
            enter: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (comment.extendedRange[1] > node.range[0]) {
                        break;
                    }

                    if (comment.extendedRange[1] === node.range[0]) {
                        if (!node.leadingComments) {
                            node.leadingComments = [];
                        }
                        node.leadingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        cursor = 0;
        traverse(tree, {
            leave: function (node) {
                var comment;

                while (cursor < comments.length) {
                    comment = comments[cursor];
                    if (node.range[1] < comment.extendedRange[0]) {
                        break;
                    }

                    if (node.range[1] === comment.extendedRange[0]) {
                        if (!node.trailingComments) {
                            node.trailingComments = [];
                        }
                        node.trailingComments.push(comment);
                        comments.splice(cursor, 1);
                    } else {
                        cursor += 1;
                    }
                }

                // already out of owned node
                if (cursor === comments.length) {
                    return VisitorOption.Break;
                }

                if (comments[cursor].extendedRange[0] > node.range[1]) {
                    return VisitorOption.Skip;
                }
            }
        });

        return tree;
    }

    exports.version = __webpack_require__(20).version;
    exports.Syntax = Syntax;
    exports.traverse = traverse;
    exports.replace = replace;
    exports.attachComments = attachComments;
    exports.VisitorKeys = VisitorKeys;
    exports.VisitorOption = VisitorOption;
    exports.Controller = Controller;
    exports.cloneEnvironment = function () { return clone({}); };

    return exports;
}(exports));
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {"_from":"estraverse@^4.2.0","_id":"estraverse@4.2.0","_inBundle":false,"_integrity":"sha1-De4/7TH81GlhjOc0IJn8GvoL2xM=","_location":"/estraverse","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"estraverse@^4.2.0","name":"estraverse","escapedName":"estraverse","rawSpec":"^4.2.0","saveSpec":null,"fetchSpec":"^4.2.0"},"_requiredBy":["/escodegen"],"_resolved":"https://registry.npmjs.org/estraverse/-/estraverse-4.2.0.tgz","_shasum":"0dee3fed31fcd469618ce7342099fc1afa0bdb13","_spec":"estraverse@^4.2.0","_where":"/Users/salva/workspace/div2js/node_modules/escodegen","bugs":{"url":"https://github.com/estools/estraverse/issues"},"bundleDependencies":false,"deprecated":false,"description":"ECMAScript JS AST traversal functions","devDependencies":{"babel-preset-es2015":"^6.3.13","babel-register":"^6.3.13","chai":"^2.1.1","espree":"^1.11.0","gulp":"^3.8.10","gulp-bump":"^0.2.2","gulp-filter":"^2.0.0","gulp-git":"^1.0.1","gulp-tag-version":"^1.2.1","jshint":"^2.5.6","mocha":"^2.1.0"},"engines":{"node":">=0.10.0"},"homepage":"https://github.com/estools/estraverse","license":"BSD-2-Clause","main":"estraverse.js","maintainers":[{"name":"Yusuke Suzuki","email":"utatane.tea@gmail.com","url":"http://github.com/Constellation"}],"name":"estraverse","repository":{"type":"git","url":"git+ssh://git@github.com/estools/estraverse.git"},"scripts":{"lint":"jshint estraverse.js","test":"npm run-script lint && npm run-script unit-test","unit-test":"mocha --compilers js:babel-register"},"version":"4.2.0"}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function () {
    'use strict';

    exports.ast = __webpack_require__(22);
    exports.code = __webpack_require__(6);
    exports.keyword = __webpack_require__(23);
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    function isExpression(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'ArrayExpression':
            case 'AssignmentExpression':
            case 'BinaryExpression':
            case 'CallExpression':
            case 'ConditionalExpression':
            case 'FunctionExpression':
            case 'Identifier':
            case 'Literal':
            case 'LogicalExpression':
            case 'MemberExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'SequenceExpression':
            case 'ThisExpression':
            case 'UnaryExpression':
            case 'UpdateExpression':
                return true;
        }
        return false;
    }

    function isIterationStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'DoWhileStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'WhileStatement':
                return true;
        }
        return false;
    }

    function isStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'BlockStatement':
            case 'BreakStatement':
            case 'ContinueStatement':
            case 'DebuggerStatement':
            case 'DoWhileStatement':
            case 'EmptyStatement':
            case 'ExpressionStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'IfStatement':
            case 'LabeledStatement':
            case 'ReturnStatement':
            case 'SwitchStatement':
            case 'ThrowStatement':
            case 'TryStatement':
            case 'VariableDeclaration':
            case 'WhileStatement':
            case 'WithStatement':
                return true;
        }
        return false;
    }

    function isSourceElement(node) {
      return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
    }

    function trailingStatement(node) {
        switch (node.type) {
        case 'IfStatement':
            if (node.alternate != null) {
                return node.alternate;
            }
            return node.consequent;

        case 'LabeledStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'WhileStatement':
        case 'WithStatement':
            return node.body;
        }
        return null;
    }

    function isProblematicIfStatement(node) {
        var current;

        if (node.type !== 'IfStatement') {
            return false;
        }
        if (node.alternate == null) {
            return false;
        }
        current = node.consequent;
        do {
            if (current.type === 'IfStatement') {
                if (current.alternate == null)  {
                    return true;
                }
            }
            current = trailingStatement(current);
        } while (current);

        return false;
    }

    module.exports = {
        isExpression: isExpression,
        isStatement: isStatement,
        isIterationStatement: isIterationStatement,
        isSourceElement: isSourceElement,
        isProblematicIfStatement: isProblematicIfStatement,

        trailingStatement: trailingStatement
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var code = __webpack_require__(6);

    function isStrictModeReservedWordES6(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') {
            return false;
        }
        return isKeywordES6(id, strict);
    }

    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
            return true;
        }

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    function isReservedWordES5(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
    }

    function isReservedWordES6(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    function isIdentifierNameES5(id) {
        var i, iz, ch;

        if (id.length === 0) { return false; }

        ch = id.charCodeAt(0);
        if (!code.isIdentifierStartES5(ch)) {
            return false;
        }

        for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPartES5(ch)) {
                return false;
            }
        }
        return true;
    }

    function decodeUtf16(lead, trail) {
        return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
    }

    function isIdentifierNameES6(id) {
        var i, iz, ch, lowCh, check;

        if (id.length === 0) { return false; }

        check = code.isIdentifierStartES6;
        for (i = 0, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (0xD800 <= ch && ch <= 0xDBFF) {
                ++i;
                if (i >= iz) { return false; }
                lowCh = id.charCodeAt(i);
                if (!(0xDC00 <= lowCh && lowCh <= 0xDFFF)) {
                    return false;
                }
                ch = decodeUtf16(ch, lowCh);
            }
            if (!check(ch)) {
                return false;
            }
            check = code.isIdentifierPartES6;
        }
        return true;
    }

    function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
    }

    function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
    }

    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isReservedWordES5: isReservedWordES5,
        isReservedWordES6: isReservedWordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierNameES5: isIdentifierNameES5,
        isIdentifierNameES6: isIdentifierNameES6,
        isIdentifierES5: isIdentifierES5,
        isIdentifierES6: isIdentifierES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(7).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(27).SourceMapConsumer;
exports.SourceNode = __webpack_require__(30).SourceNode;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(0);

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(0);
var binarySearch = __webpack_require__(28);
var ArraySet = __webpack_require__(9).ArraySet;
var base64VLQ = __webpack_require__(8);
var quickSort = __webpack_require__(29).quickSort;

function SourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap)
    : new BasicSourceMapConsumer(sourceMap);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
}

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      if (source != null && sourceRoot != null) {
        source = util.join(sourceRoot, source);
      }
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: Optional. the column number in the original source.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    if (this.sourceRoot != null) {
      needle.source = util.relative(this.sourceRoot, needle.source);
    }
    if (!this._sources.has(needle.source)) {
      return [];
    }
    needle.source = this._sources.indexOf(needle.source);

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The only parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._sources.toArray().map(function (s) {
      return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
    }, this);
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          if (this.sourceRoot != null) {
            source = util.join(this.sourceRoot, source);
          }
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    if (this.sourceRoot != null) {
      aSource = util.relative(this.sourceRoot, aSource);
    }

    if (this._sources.has(aSource)) {
      return this.sourcesContent[this._sources.indexOf(aSource)];
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + aSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    if (this.sourceRoot != null) {
      source = util.relative(this.sourceRoot, source);
    }
    if (!this._sources.has(source)) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }
    source = this._sources.indexOf(source);

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The only parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'))
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        if (section.consumer.sourceRoot !== null) {
          source = util.join(section.consumer.sourceRoot, source);
        }
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = section.consumer._names.at(mapping.name);
        this._names.add(name);
        name = this._names.indexOf(name);

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(7).SourceMapGenerator;
var util = __webpack_require__(0);

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex];
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex];
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {"_from":"escodegen","_id":"escodegen@1.9.0","_inBundle":false,"_integrity":"sha512-v0MYvNQ32bzwoG2OSFzWAkuahDQHK92JBN0pTAALJ4RIxEZe766QJPDR8Hqy7XNUy5K3fnVL76OqYAdc4TZEIw==","_location":"/escodegen","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"escodegen","name":"escodegen","escapedName":"escodegen","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#DEV:/","#USER","/degenerator"],"_resolved":"https://registry.npmjs.org/escodegen/-/escodegen-1.9.0.tgz","_shasum":"9811a2f265dc1cd3894420ee3717064b632b8852","_spec":"escodegen","_where":"/Users/salva/workspace/div2js","bin":{"esgenerate":"./bin/esgenerate.js","escodegen":"./bin/escodegen.js"},"bugs":{"url":"https://github.com/estools/escodegen/issues"},"bundleDependencies":false,"dependencies":{"esprima":"^3.1.3","estraverse":"^4.2.0","esutils":"^2.0.2","optionator":"^0.8.1","source-map":"~0.5.6"},"deprecated":false,"description":"ECMAScript code generator","devDependencies":{"acorn":"^4.0.4","bluebird":"^3.4.7","bower-registry-client":"^1.0.0","chai":"^3.5.0","commonjs-everywhere":"^0.9.7","gulp":"^3.8.10","gulp-eslint":"^3.0.1","gulp-mocha":"^3.0.1","semver":"^5.1.0"},"engines":{"node":">=0.12.0"},"files":["LICENSE.BSD","LICENSE.source-map","README.md","bin","escodegen.js","package.json"],"homepage":"http://github.com/estools/escodegen","license":"BSD-2-Clause","main":"escodegen.js","maintainers":[{"name":"Yusuke Suzuki","email":"utatane.tea@gmail.com","url":"http://github.com/Constellation"}],"name":"escodegen","optionalDependencies":{"source-map":"~0.5.6"},"repository":{"type":"git","url":"git+ssh://git@github.com/estools/escodegen.git"},"scripts":{"build":"cjsify -a path: tools/entry-point.js > escodegen.browser.js","build-min":"cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js","lint":"gulp lint","release":"node tools/release.js","test":"gulp travis","unit-test":"gulp test"},"version":"1.9.0"}

/***/ })
/******/ ]);
});
//# sourceMappingURL=div2js.js.map