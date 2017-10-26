'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var checkByChai = require('./assertion');

var CheckByChai = function () {
  function CheckByChai(name, value) {
    var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, CheckByChai);

    /**
     * 该检查项的名字
     * @type {String}
     */
    this.name = name;
    this.value = value;
    this.rules = rules;
    this.opts = opts;

    this.result = [];

    // /**
    //  * 校验的成功结果展示
    //  * @type {String | Function}
    //  */
    // this.msgOk = '';
    //
    // /**
    //  * 校验的错误结果展示
    //  * @type {String | Function}
    //  */
    // this.msgError = '';

    // /**
    //  * 是否是必须的
    //  * @type {Boolean}
    //  */
    // this.isRequired = false;
    //
    // /**
    //  * 字段类型校验
    //  * @type {string}
    //  */
    // this.type = rules.type;
    //
    // /**
    //  * 值必须是其中的一项
    //  * @type {Array}
    //  */
    // this.oneOf = [];
    //
    // /**
    //  * 自定义的校验函数
    //  */
    // this.checker = rules.checker;
  }

  CheckByChai.prototype.check = function check() {
    this._checkType();
    this._checkChecker();

    return {
      retCode: 0,
      result: this.result
    };
  };

  /**
   * 校验值的类型
   * @private
   */


  CheckByChai.prototype._checkType = function _checkType() {
    if (typeof this.rules.type === 'string') {
      var checkResult = checkByChai.runWithExpect(function (expect) {
        expect(this.value).to.be.a(this.rules.type);
      }.bind(this));

      // console.log(checkResult);

      this._addResult('\u8BE5\u503C\u7684\u7C7B\u578B\u5FC5\u987B\u4E3A' + this.rules.type, checkResult);
    }
  };

  /**
   * 校验自定义的checker
   * @private
   */


  CheckByChai.prototype._checkChecker = function _checkChecker() {
    if (typeof this.rules.checker === 'function') {
      var checkResult = checkByChai.runWithExpect(function (expect) {
        this.rules.checker.call(this, expect);
      }.bind(this));

      // console.log(checkResult);

      this._addResult('\u81EA\u5B9A\u4E49\u6821\u9A8C\u5668', checkResult);
    }
  };

  CheckByChai.prototype._addResult = function _addResult(rule, checkResult) {
    this.result.push({
      rule: rule,
      isValid: !checkResult,
      message: checkResult && checkResult.message || '',
      assertionError: checkResult
    });
  };

  return CheckByChai;
}();

module.exports = CheckByChai;