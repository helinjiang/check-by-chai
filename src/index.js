const checkByChai = require('./assertion');

class CheckByChai {
  constructor(name, value, rules = {}, opts = {}) {
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

  check() {
    this._checkType();
    this._checkChecker();

    return {
      retCode: 0,
      result: this.result
    };
  }

  /**
   * 校验值的类型
   * @private
   */
  _checkType() {
    if (typeof this.rules.type === 'string') {
      let checkResult = checkByChai.runWithExpect((function (expect) {
        expect(this.value).to.be.a(this.rules.type);
      }).bind(this));

      // console.log(checkResult);

      this._addResult(`该值的类型必须为${this.rules.type}`, checkResult);
    }
  }

  /**
   * 校验自定义的checker
   * @private
   */
  _checkChecker() {
    if (typeof this.rules.checker === 'function') {
      let checkResult = checkByChai.runWithExpect((function (expect) {
        this.rules.checker.call(this, expect);
      }).bind(this));

      // console.log(checkResult);

      this._addResult(`自定义校验器`, checkResult);
    }
  }

  _addResult(rule, checkResult) {
    this.result.push({
      rule: rule,
      isValid: !checkResult,
      message: checkResult && checkResult.message || '',
      assertionError: checkResult
    });
  }

}

module.exports = CheckByChai;
