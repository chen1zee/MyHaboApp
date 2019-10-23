import React, {PropsWithChildren} from "react"
import TouchableWrap from "js_pro_src/components/TouchableWrap";
import {Text, StyleSheet, TouchableNativeFeedback, ViewStyle, TextStyle} from "react-native";
import {androidRippleColor, white} from "js_pro_src/styles/color";
import {pxW2dp} from "js_pro_src/utils/sizes";

type Props = {
  text: string, // 显示文字
  onPress?: () => void,
  onLongPress?: ()=> void,
  style?: ViewStyle, // 外层 View 样式
  textStyle?: TextStyle, // 文字样式
}

/**
 * @optimize-later 添加 主题色等
 * 按钮组件
 * @param {object} props
 */
function ProButton(props: PropsWithChildren<Props>) {
  const {onPress, onLongPress, style, textStyle, text} = props
  return (
    <TouchableWrap
      onPress={onPress} onLongPress={onLongPress}
      background={TouchableNativeFeedback.Ripple(androidRippleColor, false)}
      style={[styles.wrap, style]}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableWrap>
  )
}

export default ProButton

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#3f51b5", height: pxW2dp(74), paddingHorizontal: pxW2dp(24),
    borderRadius: pxW2dp(4), justifyContent: "center"
  },
  text: {
    fontSize: pxW2dp(24), color: white
  }
})
