const chai = require('chai');

/**
 * 使用 chai 断言库中的 Expect 写法来运行用户的代码
 *
 * @param {Function} customeCheckCall 用户的测试函数，第一个参数会传递 expect 方法，其他参数会透传
 * @param props
 * @return {*}
 */
exports.runWithExpect = function (customeCheckCall, ...props) {
  return runTest('expect', customeCheckCall, ...props);
};

/**
 * 使用 chai 断言库中的 Expect 写法来运行用户的代码
 *
 * @param {String} name 断言库的接口方式
 * @param {Function} customeCheckCall 用户的测试函数，第一个参数会传递 expect 方法，其他参数会透传
 * @param props
 * @return {*}
 */
function runTest(name = 'expect', customeCheckCall, ...props) {
  try {
    switch (name) {
      case 'assert':
        return customeCheckCall(chai.assert, ...props);
      default:
        return customeCheckCall(chai.expect, ...props);
    }
  } catch (e) {
    // 如果不是断言失败的错误，则将错误抛出，这里只处理断言的错误
    if (e.name !== 'AssertionError') {
      throw e;
    }

    return e;
  }
}