var expect = chai.expect;
mocha.setup('bdd');

requirejs.config({
  baseUrl: '../src'
});

requirejs([
  'spec/grammar.spec.js',
  'spec/translation.spec.js',
  'spec/execution.spec.js'
], function () {
  mocha.run();
});
