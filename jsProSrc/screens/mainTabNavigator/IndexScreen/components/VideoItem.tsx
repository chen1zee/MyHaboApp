import React from "react"
import {StyleSheet} from "react-native"
import {View} from "react-native";
import {Text} from "react-native";

type PropsType = {

}
class VideoItem extends React.Component<PropsType> {
  render() {
    return (
      /** 默认显示 视频页 */
      <React.Fragment>
        <View style={styles.uploadWrap}><Text style={{color: "white"}}>上传用户界面</Text></View>
        <View style={styles.videoWrap}><Text style={{color: "white"}}>视频页</Text></View>
        <View style={styles.authorWrap}><Text style={{color: "white"}}>作者页123</Text></View>
      </React.Fragment>
    )
  }
}

export default VideoItem

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  uploadWrap: { flex: 1, backgroundColor: "red", alignItems: "center", justifyContent: "center" },
  videoWrap: { flex: 1, backgroundColor: "orange", alignItems: "center", justifyContent: "center" },
  authorWrap: { flex: 1, backgroundColor: "blue", alignItems: "center", justifyContent: "center" },
})
