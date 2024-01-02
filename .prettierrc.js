// .prettierrc.js
module.exports = {
    // 超过最大值换行
    printWidth: 120,
    // 缩进字节数
    tabWidth: 4,
    // 缩进不使用tab，使用空格
    useTabs: false,
    // 句尾添加分号
    semi: true,
    // 使用单引号代替双引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // 末尾需要分号
    trailingComma: 'all',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // bracketLine: true,
    requirePragma: true,
    insertPragma: true,
    // 箭头函数，只有一个参数的时候，无需括号
    arrowParens: 'avoid',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用不折行规则，默认折行标准 preserve
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // Vue style 和 script 内容是否需要默认缩进
    vueIndentScriptAndStyle: false,
    // 换行符使用 lf
    endOfLine: 'lf',
};
