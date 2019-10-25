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
  // [beginIndex, endIndex] -> 用于渲染的 videoList 开始(包含)结束(包含)下标
  beginIndex: number, endIndex: number
}
const PAGE_HEIGHT = screenH - BTM_TAB_HEIGHT - (StatusBar.currentHeight || 0)

const VIDEO_LIST_MAX_LEN = 10
// 缓存影片数 (必须大于 VIDEO_LIST_MAX_LEN 的2倍以上， 因 超额后 list 除 2)
const VIDEO_CACHE_LEN = VIDEO_LIST_MAX_LEN * 2 + 6

// TODO mock
const idCreator = (() => {
  let i = 0
  return () => ++i
})()
const videoItemCreator = () => ({ id: idCreator(), src: "" })

class IndexScreen extends React.PureComponent<any, StateType> {
  private ScrollPagerRef; // ScrollView Ref
  constructor(props) {
    super(props)
    const initVideoList = [
      // videoItemCreator(), // 上一步影片 // (现缓存10部影片) 初始为空, 待滑至 下部视频时，推入
      videoItemCreator(), // 本影片
      videoItemCreator() // 下一部影片
    ]
    this.state = {
      videoList: initVideoList,
      beginIndex: 0, endIndex: 1
    }
  }
  private onIndexChange = (index, prevIndex) => {
    const delta = index - prevIndex
    let shouldChangeScroll = false
    if (delta > 0) { // 下一页
        this.setState(prevState => {
          let {videoList, beginIndex, endIndex} = prevState
          const newVideoList = produce(videoList, draft => {
            const nextItemFuture = videoItemCreator() // 下一个状态的 视频
            if (draft.length < 3) { // 初始态，，len == 2 // 下一步时， 推入一部作为 [下一步]
              draft.push(nextItemFuture)
              beginIndex = 0
              endIndex = index + 1
              /** 非初始态  */
            } else if (draft.length - 1 <= (index + beginIndex)) { // 要进入的下一步 为最后list中一部，需要补入 [下一部]
              if (index >= VIDEO_LIST_MAX_LEN - 1) { // 超过最大 列表显示数
                draft.push(nextItemFuture)
                // 重整 下标, 让其显示3个 [beginIndex+index - 1 ,beginIndex+index, beginIndex+index+1]
                beginIndex = beginIndex + index - 1
                endIndex = beginIndex + 2
                shouldChangeScroll = true
              } else if (draft.length >= VIDEO_CACHE_LEN) { // 列表超最大缓存数
                draft.splice(0, Math.floor(draft.length / 2)) // 列表清空一半
                draft.push(nextItemFuture)
                // 调整 结构 显示列表数 维持不变
                const deltaIndex = endIndex - beginIndex // 求出 原始下标 差值
                endIndex = draft.length - 1
                beginIndex = endIndex - deltaIndex - 1
              } else {
                draft.push(nextItemFuture)
                endIndex = beginIndex + index + 1
              }
            } else { // 要进入的下一步， 没有到达 临界点 不用push
              draft[beginIndex + index + 1] = nextItemFuture
              endIndex = beginIndex + index + 1
            }
          })
          return { // 需要 确保 每次 setState 顺序
            videoList: newVideoList,
            beginIndex, endIndex
          }
      }, () => {
        // 需要调整 scroll 滚动到 下标1
        if (shouldChangeScroll) this.ScrollPagerRef.solveScroll2Index(1)
      })
    } else { // 上一页
      this.setState(prevState => {
        let {videoList, beginIndex, endIndex} = prevState
        const newVideoList = produce(videoList, () => {
          if (index <= 0) { // 到达临界点, 需要根据 startIndex调整位置
            if (beginIndex <= 0) { // 已到列表尽头， 不处理 更多上一影片
              // 只播放
            } else { // 移动下标以适配
              beginIndex = beginIndex - 1
              endIndex = beginIndex + 2
              shouldChangeScroll = true
            }
          } else {
            // 值播放
          }
        })
        return {
          videoList: newVideoList,
          beginIndex, endIndex
        }
      }, () => {
        // 需要调整 scroll 滚动到 下标1
        if (shouldChangeScroll) this.ScrollPagerRef.solveScroll2Index(1)
      })
    }
  };
  private renderItem = ({item}: {item: VideoItemType}) => (
    <View style={styles.pageItem}>
      <Text>{String(item.id).repeat(10)}</Text>
    </View>
  )
  private keyExtractor = item => item.id
  render() {
    const {videoList, beginIndex, endIndex} = this.state
    const renderList = videoList.slice(beginIndex, endIndex + 1)
    return (
      <ScrollPager
        refFunc={ref => this.ScrollPagerRef = ref}
        data={renderList}  renderItem={this.renderItem}
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
