import React from "react"
import {StatusBar, StyleSheet, View, Text} from "react-native"
import {BTM_TAB_HEIGHT} from "js_pro_src/styles/size";
import {screenH} from "js_pro_src/utils/sizes";
import ScrollPager from "js_pro_src/components/ScrollPager";
import produce from "immer";

type VideoItemType = {
  id?: number, src?: string
}
type StateType = {
  videoList: VideoItemType[],
}
const PAGE_HEIGHT = screenH - BTM_TAB_HEIGHT - (StatusBar.currentHeight || 0)

/**
 * TODO 使用 缓存 10 部 影片方法，， 当到达10部 && (在底部下一部时 || 在顶部上一步时)
 * TODO 清除 10部缓存，， 变为 3部结构 [(上)(now)(下)] -> 并 callback scrollTo()
 * TODO 将 CACHE算法 写在 ScrollPager 中
 * */
const CACHE_VIDEO_LEN = 3

// TODO mock
const idCreator = (() => {
  let i = 0
  return () => ++i
})()
const videoItemCreator = () => ({ id: idCreator(), src: "" })

class IndexScreen extends React.Component<any, StateType> {
  private ScrollViewRef; // ScrollView Ref
  constructor(props) {
    super(props)
    this.state = {
      videoList: [
        // videoItemCreator(), // 上一步影片 // (现缓存10部影片) 初始为空, 待滑至 下部视频时，推入
        videoItemCreator(), // 本影片
        videoItemCreator() // 下一部影片
      ],
    }
  }
  private onIndexChange = (index, prevIndex) => {
    const delta = index - prevIndex
    if (delta > 0) { // 下一页
      if (this.state.videoList.length < CACHE_VIDEO_LEN) { // 初始化状态 push 新影片即可
        this.setState({
          videoList: produce(this.state.videoList, draft => {
            // if (draft.length < index)
            draft.push(videoItemCreator())
          })
        }, () => {
          console.log('top######')
          console.log(this.state.videoList)
        })
      } else { // (已缓存CACHE_VIDEO_LEN部电影) 推入新影片， 清空 上一步影片，只留最近一部 调整 ScrollPager 位置
        /**
         *
         * */
        this.setState({
          videoList: produce(this.state.videoList, draft => {
            draft.push(videoItemCreator())
            draft.shift()
          }, () => {
            console.log('bottom######')
            console.log(this.state.videoList)
          })
        })
      }
    }
  };
  private renderItem = ({item}: {item: VideoItemType}) => (
    <View style={styles.pageItem}>
      <Text>{String(item.id).repeat(10)}</Text>
    </View>
  )
  private keyExtractor = item => item.id
  componentDidMount(): void {
  }

  render() {
    return (
      <ScrollPager
        scrollViewRef={ref => this.ScrollViewRef = ref}
        data={this.state.videoList}  renderItem={this.renderItem}
        keyExtractor={this.keyExtractor} pageHeight={PAGE_HEIGHT}
        onIndexChange={this.onIndexChange} />
    )
  }
}

export default IndexScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageItem: { height: PAGE_HEIGHT, justifyContent: "center", alignItems: "center" }
})
