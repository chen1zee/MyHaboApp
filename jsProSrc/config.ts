/**
 * 各环境的 配置项
 * */
/**
 * "TEST":测试环境
 * */
type ENVType = "TEST" | "TO_ADD" | "PROD" | undefined

// 通过 /scripts/changeConfig.js 脚本 可修改值, 对应 npm run
const ENV: ENVType = "TEST"

const configs = {
  TEST: { // 测试环境 默认配置
    baseURL: "//10.15.12.136:8089" // 服务器地址
  },
  PROD: { // 生产
    baseURL: "asdsadsad",
  }
}

const config = ENV ? configs[ENV] : configs.TEST

export default config
