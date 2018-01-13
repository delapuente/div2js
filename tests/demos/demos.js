requirejs.config({
  baseUrl: '../../src'
});

define([
  'compiler',
  'loader',
],  function (compiler, loader) {
  'use strict';

  var programSelector = document.querySelector('select');
  var reloadButton = document.querySelector('button');

  reloadButton.onclick = load;
  programSelector.onchange = load;
  
  function load(evt) {
    reloadButton.disabled = true;

    var programUrl = evt.target.value;
    if (!programUrl) { return; }

    fetch(programUrl)
    .then(function (response) {
      return response.text();
    })
    .then(function (source) {
      return compiler.compile(source);
    })
    .then(function (binary) {
      return loader.load(binary);
    })
    .then(function (program) {
      reloadButton.disabled = false;
      program.run();
    })
    .catch(function (error) {
      console.log(error.message);
    });
  };

});