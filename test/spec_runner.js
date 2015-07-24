var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
mocha.setup('bdd');

requirejs([
  'spec/grammar.spec.js'
], function () {
  mocha.run();
});
