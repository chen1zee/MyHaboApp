/**
 * 指向 各个 navigator
 * */

export const mainStackNavigator = "mainStackNavigator" // 主 stack navi

const _navigators = {
  [mainStackNavigator]: null
}

const navigators = {
  get(navigatorName) { return _navigators[navigatorName] },
  set(navigatorName, navigation) {
    _navigators[navigatorName] = navigation
  }
}

export default navigators

