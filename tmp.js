// const ValueChecker = require('./src/value-checker');
// const checkByChai = require('./src');
//
// let valueChecker = new ValueChecker('用户ID', 110, {
//   type: 'number',
//   isRequired: true
// });
//
// let result = checkByChai(valueChecker);
//
// console.log(result);

const CheckByChai = require('./src');

let checkByChai = new CheckByChai('用户ID', '110', {
  type: 'number',
  isRequired: true,
  checker: function (expect) {
    expect(this.value + '').to.be.empty;
  }
});

let result = checkByChai.check();

console.log(result);
