<template>
  <div>
    <x-header>滚动测试</x-header>
    <div class="position-box">
      <div class="wrapper" ref="wrapper">
        <ul class="content">
          <li v-for="item in items">{{ item.name }}</li>
          <load-more tip='正在加载' background-color="#fbf9fe" v-if="loading"></load-more>
          <load-more :show-loading="false" tip="没有更多数据了" background-color="#fbf9fe" v-if="nomore"></load-more>
        </ul>
      </div>
    </div>
    <button @click="scrollTo" class="go-top weui_btn weui_btn_primary">
      <x-icon type="ios-arrow-thin-up" size="30" class="icon-red"></x-icon>
    </button>
  </div>  
</template>

<script>
  import Bscroll from 'better-scroll'
  import { XHeader, LoadMore } from 'vux'
  let count = 1
  export default {
    components: {
      XHeader,
      LoadMore
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          pullDownRefresh: this.pullDownRefreshObj,
          click: true
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
        nomore: false,
        loading: false
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
        this.loading = true
        // 模拟下拉刷新
        console.log('下拉刷新')
        this.page = 1
        this.utils.get(this.api.devices + '?page=' + this.page, this.loadData, this.$vux.confirm)
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          console.log('上拉加载')
          this.page ++
          if (this.page <= this.maxpage) {
            this.loading = true
            this.utils.get(this.api.devices + '?page=' + this.page, this.addData, this.$vux.confirm)
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
              pullDownRefresh: self.pullDownRefreshObj,
              click: true
            })
          } else {
            self.scroll.refresh()
          }
          // 完成加载必须调用
          self.scroll.finishPullDown()
          self.loading = false
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
              pullDownRefresh: self.pullDownRefreshObj,
              click: true
            })
          } else {
            self.scroll.refresh()
          }
          // 完成加载必须调用
          self.scroll.finishPullDown()
          self.loading = false
        })
      }
    }
  }
</script>

<style>
  .content>li {
    height: 100px;
  }
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
