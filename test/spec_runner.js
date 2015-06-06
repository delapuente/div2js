var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
mocha.setup('bdd');

requirejs([
  'spec/DIV2Runtime',
  'spec/DIV2ProcessManager'
], function () {
  mocha.run();
});
