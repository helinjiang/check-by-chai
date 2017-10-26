'use strict';

var chai = require('chai');

/**
 * 使用 chai 断言库中的 Expect 写法来运行用户的代码
 *
 * @param {Function} customeCheckCall 用户的测试函数，第一个参数会传递 expect 方法，其他参数会透传
 * @param props
 * @return {Object | undefined} 如果校验通过，则会返回 undefined ，否则会返回 AssertionError 对象
 */
exports.runWithExpect = function (customeCheckCall) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  return runTest.apply(undefined, ['expect', customeCheckCall].concat(props));
};

/**
 * 使用 chai 断言库中的 Expect 写法来运行用户的代码
 *
 * @param {String} name 断言库的接口方式
 * @param {Function} customeCheckCall 用户的测试函数，第一个参数会传递 expect 方法，其他参数会透传
 * @param props
 * @return {*}
 */
function runTest() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'expect';
  var customeCheckCall = arguments[1];

  try {
    for (var _len2 = arguments.length, props = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      props[_key2 - 2] = arguments[_key2];
    }

    switch (name) {
      case 'assert':
        return customeCheckCall.apply(undefined, [chai.assert].concat(props));
      default:
        return customeCheckCall.apply(undefined, [chai.expect].concat(props));
    }
  } catch (e) {
    // 如果不是断言失败的错误，则将错误抛出，这里只处理断言的错误
    if (e.name !== 'AssertionError') {
      throw e;
    }

    return e;
  }
}

// 一个 AssertionError 类似：
// { AssertionError: expected '110' to be a number
//   at D:\gitprojects\check-by-chai\src\index.js:24:40
//   at runTest (D:\gitprojects\check-by-chai\src\assertion.js:28:16)
//   at Object.exports.runWithExpect (D:\gitprojects\check-by-chai\src\assertion.js:11:10)
//   at check (D:\gitprojects\check-by-chai\src\index.js:23:39)
//   at Object.<anonymous> (D:\gitprojects\check-by-chai\src\index.js:43:14)
//   at Module._compile (module.js:570:32)
//   at Object.Module._extensions..js (module.js:579:10)
//   at Module.load (module.js:487:32)
//   at tryModuleLoad (module.js:446:12)
//   at Function.Module._load (module.js:438:3)
//   message: 'expected \'110\' to be a number',
//     showDiff: false,
//   actual: '110',
//   expected: undefined }