const expect = require('chai').expect;
const CheckByChai = require('../src');

describe('单独测试： type="number" ', function () {

  it('当值为数字则正常', function () {
    let checkByChai = new CheckByChai('用户ID', 110, {
      type: 'number'
    });

    expect(checkByChai.check()).to.include({ retCode: 0 }).and.to.nested.include({
      'result[0].rule': '该值的类型必须为number',
      'result[0].isValid': true,
      'result[0].message': ''
    });
  });

  it('当值为字符串时报错', function () {
    let checkByChai = new CheckByChai('用户ID', '110', {
      type: 'number'
    });

    expect(checkByChai.check()).to.include({ retCode: 0 }).and.to.nested.include({
      'result[0].rule': '该值的类型必须为number',
      'result[0].isValid': false,
      'result[0].message': 'expected \'110\' to be a number'
    });
  });

});