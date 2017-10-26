const ValueChecker = require('./value-checker');
const checkByChai = require('./assertion');

let valueChecker = new ValueChecker('用户ID', 110, {
  type: 'number',
  checker: function (expect) {
    console.log('in checker', this.value, valueChecker.value);
    expect(this.value + '').to.be.empty;
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
      isValid: !checkTypeResult,
      message: checkTypeResult && checkTypeResult.message || '',
      assertionError: checkTypeResult
    });
  }

  // 校验自定义的checker
  if (typeof valueChecker.rules.checker === 'function') {
    let checkCheckerResult = checkByChai.runWithExpect(function (expect) {
      valueChecker.rules.checker.call(valueChecker, expect);
    });

    console.log(checkCheckerResult);

    result.push({
      rule: `自定义校验器`,
      isValid: !checkCheckerResult,
      message: checkCheckerResult && checkCheckerResult.message || '',
      assertionError: checkCheckerResult
    });
  }

  return {
    retCode: 0,
    result: result
  };
}

let result = check(valueChecker);

console.log(result);
