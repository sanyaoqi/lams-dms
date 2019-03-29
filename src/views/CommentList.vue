<template>
  <div>
    <x-header>全部列表</x-header>
    <div class="position-box">
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <div v-for="item in items" :key="item.id + 'comment'" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd" v-if="item.user.image">
              <img class="weui-media-box__thumb" style="vertical-align: middle;" :src="item.user.image" alt="">
            </div>
            <div class="weui-media-box__bd">
              <flexbox :gutter="0">
                <flexbox-item :span="1/2">
                  <h4 class="weui-media-box__title" v-html="item.user.user_nick"></h4>
                </flexbox-item>
                <flexbox-item :span="1/2">
                  <p class="weui-media-box__desc">{{ item.created_at_format }}</p>
                </flexbox-item>
              </flexbox>
              <p class="weui-media-box__desc" v-html="item.content"></p>
            </div>
          </div>
          <div class="no-more weui-media-box__desc" v-if="nomore">没有更多数据了</div>
        </div>
        <div class="loading-wrapper"></div>
      </div>
    </div>
    <button @click="scrollTo" class="go-top weui_btn weui_btn_primary">
      <x-icon type="ios-arrow-thin-up" size="30" class="icon-red"></x-icon>
    </button>
  </div>  
</template>

<script>
  import Bscroll from 'better-scroll'
  import { XHeader, Flexbox, FlexboxItem } from 'vux'
  let count = 1
  export default {
    components: {
      XHeader,
      Flexbox,
      FlexboxItem
    },
    mounted () {
      this.object_id = this.$route.params.id
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          pullDownRefresh: this.pullDownRefreshObj
        })
        this.onPullingDown()
        // 绑定下拉刷新方法
        this.scroll.on('pullingDown', this.onPullingDown)
        // 绑定上拉加载更多方法
        this.scroll.on('scrollEnd', this.onPullingUp)
      })
    },
    data () {
      return {
        object_id: null,
        object_type: 1,
        // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        scrollbarObj: {
          fade: true
        },
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: {
          threshold: 50,
          stop: 20
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        },
        startY: 0, // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        items: [],
        scroll,
        page: 1,
        maxpage: 0,
        nomore: false
      }
    },
    methods: {
      // 滚动到页面顶部
      scrollTo () {
        this.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      // 模拟数据请求
      getData () {
        return new Promise(resolve => {
          setTimeout(() => {
            const arr = []
            for (let i = 0; i < 10; i++) {
              arr.push(count++)
            }
            resolve(arr)
          }, 1000)
        })
      },
      onPullingDown () {
        // 模拟下拉刷新
        console.log('下拉刷新')
        this.page = 1
        let url = this.api.repairComment + 'page=' + this.page
        url += '&object_id=' + this.object_id
        url += '&object_type=' + this.object_type
        this.utils.get(url, this.loadData, this.$vux.confirm)
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          console.log('上拉加载')
          this.page++
          if (this.page <= this.maxpage) {
            let url = this.api.repairComment + 'page=' + this.page
            url += '&object_id=' + this.object_id
            url += '&object_type=' + this.object_type
            console.log(this.page)
            this.utils.get(url, this.addData, this.$vux.confirm)
          } else {
            this.nomore = true
            // this.$vux.confirm.show({
            //   title: '提示',
            //   content: '没有更多数据了！'
            // })
          }
        }
      },
      addData (response) {
        // 加载更多数据
        console.log(response)
        let self = this
        this.items = this.items.concat(response.data)
        // test
        if (response.pagination.totalCount > 0 && response.pagination.defaultPageSize) {
          this.maxpage = Math.ceil(response.pagination.totalCount / response.pagination.defaultPageSize)
        }
        console.log(this.maxpage)
        // test
        this.$nextTick(() => {
          if (!self.scroll) {
            self.scroll = new Bscroll(self.$refs.wrapper, {
              pullDownRefresh: self.pullDownRefreshObj
            })
          } else {
            self.scroll.refresh()
          }
          // 完成加载必须调用
          self.scroll.finishPullDown()
        })
      },
      loadData (response) {
        // 刷新列表数据
        let self = this
        this.items = response.data
        if (response.pagination.totalCount > 0 && response.pagination.defaultPageSize) {
          this.maxpage = Math.ceil(response.pagination.totalCount / response.pagination.defaultPageSize)
        }
        console.log(this.maxpage)
        // test
        this.$nextTick(() => {
          if (!self.scroll) {
            self.scroll = new Bscroll(self.$refs.wrapper, {
              pullDownRefresh: self.pullDownRefreshObj
            })
          } else {
            self.scroll.refresh()
          }
          // 完成加载必须调用
          self.scroll.finishPullDown()
        })
      }
    }
  }
</script>

<style>
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
  .position-box {
    position: fixed;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .go-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    background: #ccc;
    border: none;
  }
</style>
