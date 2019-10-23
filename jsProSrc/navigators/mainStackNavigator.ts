import {createStackNavigator} from "react-navigation-stack";
import {SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import MainTabNavigator from "js_pro_src/navigators/mainTabNavigator/mainTabNavigator";
import {createAppContainer} from "react-navigation";

const MainStackNavigator = createStackNavigator({
  [SCREEN_NAMES.MainTabNavi]: { screen: MainTabNavigator }
}, {
  initialRouteName: SCREEN_NAMES.MainTabNavi,
  defaultNavigationOptions: () => {
    return {
      header: null
    }
  }
})

const NavigatorAppContainer = createAppContainer(MainStackNavigator)

export default NavigatorAppContainer
