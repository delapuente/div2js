var expect = chai.expect;
mocha.setup('bdd');

requirejs([
  'spec/grammar.spec.js',
  'spec/generator.spec.js'
], function () {
  mocha.run();
});
