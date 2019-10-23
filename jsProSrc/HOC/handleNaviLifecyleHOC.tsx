import React from "react";
import {NavigationStackOptions} from "react-navigation-stack";

/**
 * screen组件 控制 navi 生命周期 切片
 * 在 screen focus时 触发 willFocus回调函数
 * @param {React.Component} Comp 要添加 切片的 组件
 * @param {object=} cbs 回调函数s
 * @param {boolean=} passNavigation 是否把 props.navigation 传递下去 flag
 *   当 Comp 为 Navigator Class 时(即 Comp 为 其他路由，本身就有 props.navigation)
 *   则 不应 传递 props.navigation,, 此种情况 应将 passNavigation 设为 false
 * */
function handleNaviLifecyleHOC(Comp, cbs: { willFocus?: (x?:any) => void, didFocus?: (x?:any) => void, willBlur?: (x?:any) => void, didBlur?: (x?:any) => void}, passNavigation: boolean = true) {
  return class extends React.PureComponent<any> {
    static navigationOptions(opt): NavigationStackOptions {
      return Comp.navigationOptions && Comp.navigationOptions(opt)
    }
    private willFocusSubscr
    componentWillMount(): void {
      if (cbs.willFocus) {
        this.willFocusSubscr = this.props.navigation.addListener("willFocus", (payload) => {
          cbs.willFocus && cbs.willFocus(payload)
        })
      }
    }
    componentWillUnmount(): void {
      this.willFocusSubscr && this.willFocusSubscr.remove()
    }
    render() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {children, navigation, ...restProps} = this.props
      if (passNavigation) return <Comp {...restProps} navigation={navigation} />
      // 不传递 navigation 若 child 为 Navigator 则不能覆盖 props.navigation
      return <Comp {...restProps} />
    }
  }
}

export default handleNaviLifecyleHOC
