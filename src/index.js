const ValueChecker = require('./value-checker');
const checkByChai = require('./assertion');

let valueChecker = new ValueChecker('用户ID', '110', {
  type: 'number',
  checker: function (expect) {
    console.log('in checker', this.value);
    expect(this.value + '').to.not.be.empty;
  }
});

/**
 * 获取校验结果
 * @param valueChecker
 * @return {{retCode: number}}
 */
function check(valueChecker, styleName = 'expect') {
  // 校验结果的数组
  let result = [];

  // 校验类型
  if (typeof valueChecker.rules.type === 'string') {
    let checkTypeResult = checkByChai.runWithExpect(function (expect) {
      expect(valueChecker.value).to.be.a(valueChecker.rules.type);
    });

    console.log(checkTypeResult);

    result.push({
      rule: `该值的类型必须为${valueChecker.rules.type}`,
      isValid: !!checkTypeResult,
      message: checkTypeResult && checkTypeResult.message || '',
      assertionError: checkTypeResult
    });
  }

  return {
    retCode: 0,
    result: result
  };
}

let result = check(valueChecker);

console.log(result);
