import React, {PropsWithChildren} from "react"
import {
  GestureResponderEvent,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
} from "react-native"
import {gray} from "js_pro_src/styles/color";

type Props = {
  onPress?: (event: GestureResponderEvent) => void,
  onLongPress?: (event: GestureResponderEvent) => void,
}

/**
 * 可点击 wrap
 * ios && 无点击事件 使用 TouchableHighlight
 * android 使用 TouchableNativeFeedback
 * */
function TouchableWrap(props: PropsWithChildren<Props & TouchableNativeFeedbackProps>) {
  const {onPress, onLongPress, children, background, ...restProps} = props
  if ( // IOS render && 无点击事件的组件 render
    Platform.OS === 'ios' ||
    Platform.OS === 'web' ||
    (!onPress && !onLongPress) ||
    Platform.Version <= 21
  ) {
    return (
      <TouchableHighlight underlayColor={gray} onPress={onPress} onLongPress={onLongPress}>
        <View {...restProps}>{children}</View>
      </TouchableHighlight>
    )
  }
  // Android
  return (
    <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress} background={background}>
      <View {...restProps}>{children}</View>
    </TouchableNativeFeedback>
  )
}

export default TouchableWrap
