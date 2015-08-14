var expect = chai.expect;
mocha.setup('bdd');

requirejs([
  'spec/grammar.spec.js',
  'spec/translation.spec.js'
], function () {
  mocha.run();
});
