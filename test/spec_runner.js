var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
mocha.setup('bdd');

requirejs([
  'spec/runtime'
], function () {
  mocha.run();
});
