/**
 * 测试原生组件导出用，， 暂无使用，
 * */
import React from "react"
import {requireNativeComponent} from "react-native"


// TODO https://blog.csdn.net/qq_21793463/article/details/52184864
// TODO https://reactnative.cn/docs/native-components-android/

const NativeComp = requireNativeComponent("RCTButton")

type RTCButtonPropsType = {
  text: string
}
class RTCButton extends React.Component<RTCButtonPropsType> {
  render() {
    return <NativeComp {...this.props} />
  }
}

export default RTCButton
