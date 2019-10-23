import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import { Image } from "react-native";
import {SCREEN_2_TITLE, SCREEN_NAMES} from "js_pro_src/navigators/screenNames";
import {BTM_TAB_HEIGHT} from "js_pro_src/styles/size";
import IndexScreen from "js_pro_src/screens/mainTabNavigator/IndexScreen/IndexScreen";

const ICONS = {
  "index": require("js_pro_src/assets/images/ic_weixin_normal.png"),
  "index-active": require("js_pro_src/assets/images/ic_weixin_normal.png"),
  "video": require("js_pro_src/assets/images/ic_weixin_normal.png"),
  "video-active": require("js_pro_src/assets/images/ic_weixin_normal.png"),
  "act": require("js_pro_src/assets/images/ic_weixin_normal.png"),
  "act-active": require("js_pro_src/assets/images/ic_weixin_normal.png"),
  "me": require("js_pro_src/assets/images/ic_weixin_normal.png"),
  "me-active": require("js_pro_src/assets/images/ic_weixin_normal.png"),
}

type TabIconProps = {
  name: "index" | "video" | "act" | "me", // icon名称
  size: number|string,
  focused: boolean // 是否 聚焦中
}
class TabIcon extends React.PureComponent<TabIconProps> {
  render() {
    const {size, focused, name} = this.props
    const iconName = focused ? (name + "-active") : name
    return (
      <Image style={{width: size, height: size}} source={ICONS[iconName]} />
    )
  }
}
const getTabBarIcon = (routeName, focused) => {
  let iconName: TabIconProps["name"]
  if (routeName == SCREEN_NAMES.Index) {
    iconName = "index"
  } else if (routeName == SCREEN_NAMES.Video) {
    iconName = "video"
  } else if (routeName == SCREEN_NAMES.Act) {
    iconName = "act"
  } else {
    iconName = "me"
  }
  return <TabIcon name={iconName} size={34} focused={focused} />
}

const MainTabNavigator = createBottomTabNavigator(
  {
    [SCREEN_NAMES.Index]: { screen: IndexScreen },
    [SCREEN_NAMES.Video]: { screen: IndexScreen }, // TODO
    [SCREEN_NAMES.Act]: { screen: IndexScreen }, // TODO
    [SCREEN_NAMES.Me]: { screen: IndexScreen }, // TODO
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const routeName = navigation.state.routeName
      return {
        tabBarIcon: ({focused}) => getTabBarIcon(routeName, focused),
        title: SCREEN_2_TITLE[routeName]
      }
    },
    tabBarOptions: {
      activeTintColor: "#f1077a",
      inactiveTintColor: "#c6c6c6",
      style: {height: BTM_TAB_HEIGHT},
      labelStyle: {fontSize: 14}
    }
  }
)

export default MainTabNavigator
