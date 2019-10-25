import React, {ReactElement} from "react"
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView} from "react-native"


/**
 * 全屏 && 整页滚动
 * */
type Props<T> = {
  data: T[], // 列表
  // 渲染item
  renderItem: (params: {item: T, index?: number}) => ReactElement<any, any>,
  // key 制作函数
  keyExtractor: (item: T, index?: number) => string | number
  // 下标变化回调
  onIndexChange: (index?: number, prevIndex?: number) => void
  pageHeight: number // 页面高度
  // 获取 ScrollView ref
  refFunc?: (ref: any) => void
}
class ScrollPager<T> extends React.PureComponent<Props<T>> {
  private ScrollViewRef
  private beginDragY = 0
  private endDragY = 0
  private currentIndex = 0
  private onScrollBeginDrag = ({nativeEvent: {contentOffset: {y}}}: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.beginDragY = y
  }
  private onScrollEndDrag = ({nativeEvent: {contentOffset: {y}}}: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.endDragY = y
    const delta = this.endDragY - this.beginDragY
    if (Math.abs(delta) < 100) { // 位置 返回本页
      this.ScrollViewRef.scrollTo({ y: this.beginDragY, animated: true })
    } else { // 需要翻页
      const prevIndex = this.currentIndex
      this.currentIndex = prevIndex + (delta > 0 ? 1 : -1)
      this.ScrollViewRef.scrollTo({ y: this.currentIndex * this.props.pageHeight, animated: true })
      this.props.onIndexChange(this.currentIndex, prevIndex)
    }
  };
  public solveScroll2Index(i: number) { // 滚动到 下标 i
    this.currentIndex = i
    this.ScrollViewRef.scrollTo({ y: i * this.props.pageHeight, animated: true })
    // 禁止触发 onIndexChange
  }
  componentDidMount(): void {
    this.props.refFunc && this.props.refFunc(this)
  }
  render() {
    const {data, renderItem, keyExtractor, pageHeight} = this.props
    return (
      <ScrollView
        ref={ref => this.ScrollViewRef = ref}
        style={{height: pageHeight}}
        decelerationRate={100}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onScrollEndDrag={this.onScrollEndDrag}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <React.Fragment key={keyExtractor(item, index)}>
            {renderItem({item, index})}
          </React.Fragment>
        ))}
      </ScrollView>
    )
  }
}

export default ScrollPager
