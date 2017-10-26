class CheckItem {
  constructor(name, value, rules = {}, opts = {}) {
    /**
     * 该检查项的名字
     * @type {String}
     */
    this.name = name;
    this.value = value;
    this.rules = rules;
    this.opts = opts;

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

  getResult() {

  }
}

module.exports = CheckItem;