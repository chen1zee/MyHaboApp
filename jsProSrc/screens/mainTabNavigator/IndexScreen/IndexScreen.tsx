import React from "react"
import {requireNativeComponent, StyleSheet, Text, View} from "react-native"
import Swiper from "js_pro_src/components/Swiper/Swiper";

type VideoItemType = {
  id?: number, src?: string
}

type StateType = {
  videoList: VideoItemType[]
}

// TODO https://blog.csdn.net/qq_21793463/article/details/52184864
// TODO https://reactnative.cn/docs/native-components-android/
const RTCButton = requireNativeComponent("RCTButton")

class IndexScreen extends React.Component<any, StateType> {
  private SwiperRef // Swiper Ref
  constructor(props) {
    super(props)
    this.state = {
      videoList: [
        // {}, // 上一步影片   //  若刚进入app 无上一步影片 通过 用户 上划 push 影片
        { id: 1, src: "" }, // ing
        { id: 2, src: "" }, // ing
        { id: 3, src: "" }, // ing
        { id: 4, src: "" }, // ing
        { id: 5, src: "" }, // 存放下一步影片
      ]
    }
  }
  render() {
    return (
      <Swiper
        style={styles.container} horizontal={false} >
        {this.state.videoList.map(item => (
          <View key={item.id} style={{flex: 1, backgroundColor: "red"}}><Text>{item.id}</Text></View>
        ))}
      </Swiper>
    )
  }
}

export default IndexScreen

const styles = StyleSheet.create({
  container: { flex: 1 }
})
