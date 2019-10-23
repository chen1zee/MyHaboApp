### 文档
`后续再细分各文档`

### 需求及解决
1. 引用项目以外的 文件夹
    1. tsconfig.json->.compilerOptions.path 配置别名
    2. 对应的外部文件夹 添加 package.json 如： {"name": "ccc"}
    3. metro.config.js->.watchFolders 添加外部文件夹路径
2. network 面板，查看记录
    * `使用fetch (fetch 在 react-native-debugger 中可拦截，
    但 response为空，后续查看什么原因， 现暂用 XHR方案)`
    1. 使用 XHR，
    2. 使用 react-native-debugger，右键 enable network inspect
    3. network 面板中 查看请求记录
3. jsProSrc/config.ts 用于配置环境变量
    * /scripts/changeConfig.js 用于 配合脚本 修改 ENV环境变量 可见 命令 `TEST:change:ENV:run:android`
4. 安卓中， overlap(元素展示空间 大于 父元素 空间) 的元素，onPress 等事件无法触发
    * 相关issue https://github.com/facebook/react-native/issues/22397
5. 待优化项
    * 项目搜索关键词 `@optimize-later`
6. 相关文档
    * immer 不变性 https://immerjs.github.io/immer/docs/produce