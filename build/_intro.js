(function (root, factory) {
    var old_<%= libname %>, lib_<%= libname %>;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        old_<%= libname %> = root.<%= libname %>;
        lib_<%= libname %> = factory();
        root.<%= libname %> = lib_<%= libname %>;
        root.<%= libname %>.restore = function () {
          root.<%= libname %> = old_<%= libname %>;
          return lib_<%= libname %>;
        };
    }
}(this, function () {
'use strict';

var objects = {};

function define(name, dependencies, factory) {
  var args = gatherDependencies(dependencies);
  var newObject = factory.apply(void 0, args);
  objects[normalize(name)] = newObject;
}

function gatherDependencies(dependencies) {
  return dependencies.map(function (dependencyName) {
    return objects[normalize(dependencyName)];
  });
}

function normalize(name) {
  if (name.indexOf('./') === 0) {
    return name.substring(2);
  }
  return name;
}
