<template>
  <div>
    <div class="container">
      <div class="page panel">
        <div class="page__hd">
          <x-header :left-options="{showBack: false}">我的报修</x-header>
          <!-- <tab :line-width=2 active-color='#04be02' v-model="tabmodel" :animate="false">
            <tab-item selected @click.native="toMyReports">我的报修</tab-item>
            <tab-item @click.native="toMyRepairs">维修任务</tab-item>
            <tab-item @click.native="toMyMaintains">维护任务</tab-item>
          </tab> -->
          <div style="padding:8px;">
            <button-tab v-model="defaultStatus">
              <button-tab-item @on-item-click="changeStatus()" v-for="status in statusList" :key="status.key">{{ status.name }}</button-tab-item>
            </button-tab>
          </div>
        </div>
        <div class="page__bd">
          <div class="position-report-box">
            <div class="wrapper" ref="wrapper">
              <div class="weui-panel__bd">
                <a v-for="item in items"
                 class="weui-media-box weui-media-box_appmsg" 
                 :href="'/repair-detail/' + item.id" 
                 :key="item.id">
                  <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb"
                     :src="(item.image_list.length > 0) ? item.image_list[0] : defaultImage"
                     alt="" >
                  </div>
                  <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{ item.description }}</h4>
                    <p class="weui-media-box__desc" style="padding:5px 0px;">{{ item.created_at_format }} &nbsp; <span class="device-repair-status"
                       v-bind:class="{
                       'textRed': item.status == 0,
                       'textOrange': item.status == 1,
                       'textBlue': item.status == 2,
                       'textGreen': item.status == 3,
                       'textGray': item.status == 4
                       }">
                      &nbsp;{{ item.status_name }}&nbsp;
                    </span></p>
                  </div>
                </a>
                <load-more tip='正在加载' background-color="#fbf9fe" v-if="loading"></load-more>
                <load-more :show-loading="false" tip="没有更多数据了" background-color="#fbf9fe" v-if="nomore"></load-more>
              </div>
            </div>
          </div>
        </div>
        <div class="page__ft"></div>
      </div>
    </div>
    
    <button @click="scrollTo" class="go-top weui_btn weui_btn_primary">↑</button>
  </div>  
</template>

<script>
  import Bscroll from 'better-scroll'
  import { XHeader, LoadMore, Tab, TabItem, ButtonTab, ButtonTabItem } from 'vux'
  export default {
    components: {
      XHeader,
      LoadMore,
      Tab,
      TabItem,
      ButtonTab,
      ButtonTabItem
    },
    mounted () {
      this.TOKEN = window.localStorage.getItem('token')
      this.USER = JSON.parse(window.localStorage.getItem('user'))
      if (!this.USER) {
        this.utils.deletaUserData()
      } else {
        // console.log(this.USER)
      }
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
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: {
          threshold: 50,
          stop: 20
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
        loading: false,
        defaultImage: 'http://lams-1257122319.cos.ap-beijing.myqcloud.com/20190321eec5375f7c984d813051c65f202ca928',
        tabmodel: 0,
        statusList: [
          {
            key: -1,
            name: '全部'
          },
          {
            key: 0,
            name: '新建'
          },
          {
            key: 1,
            name: '处理中'
          },
          {
            key: 3,
            name: '完成修理'
          },
          {
            key: 4,
            name: '已完成'
          }
        ],
        defaultStatus: 0,
        currentStatus: -1
      }
    },
    methods: {
      // 滚动到页面顶部
      scrollTo () {
        this.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      onPullingDown () {
        // 模拟下拉刷新
        // console.log('下拉刷新')
        this.loading = true
        this.page = 1
        let url = this.api.reportList + '?page=' + this.page
        url += '&user_id=' + this.USER.id
        if (this.currentStatus >= 0) {
          url += '&status=' + this.currentStatus
        }
        this.utils.get(url, this.loadData, this.$vux.confirm)
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          console.log('上拉加载')
          this.page ++
          if (this.page <= this.maxpage) {
            this.loading = true
            let url = this.api.reportList + '?page=' + this.page
            url += '&user_id=' + this.USER.id
            if (this.currentStatus >= 0) {
              url += '&status=' + this.currentStatus
            }
            this.utils.get(url, this.addData, this.$vux.confirm)
          } else {
            this.nomore = true
          }
        }
      },
      addData (response) {
        // 加载更多数据
        console.log(response)
        this.items = this.items.concat(response.data)
        // test
        if (response.pagination.totalCount > 0 && response.pagination.defaultPageSize) {
          this.maxpage = Math.ceil(response.pagination.totalCount / response.pagination.defaultPageSize)
        }
        console.log(this.maxpage)
        // test
        this.refreshScroll()
      },
      loadData (response) {
        this.items = response.data
        if (response.pagination.totalCount > 0 && response.pagination.defaultPageSize) {
          this.maxpage = Math.ceil(response.pagination.totalCount / response.pagination.defaultPageSize)
        }
        console.log(this.maxpage)
        // test
        this.refreshScroll()
      },
      refreshScroll () {
        let self = this
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
      toMyReports () {
        // console.log('toMyReports')
        // this.$router.push({path: '/reports'})
      },
      toMyRepairs () {
        // console.log('toMyRepairs')
        // this.$router.push({path: '/myrepairs'})
      },
      toMyMaintains () {
        // console.log('toMyMaintains')
        // this.$router.push({path: '/mymaintains'})
      },
      changeStatus () {
        // console.log('click butten', this.defaultStatus)
        if (this.defaultStatus === 0) {
          this.currentStatus = -1
        }
        if (this.defaultStatus === 1) {
          this.currentStatus = 0
        }
        if (this.defaultStatus === 2) {
          this.currentStatus = 1
        }
        if (this.defaultStatus === 3) {
          this.currentStatus = 3
        }
        if (this.defaultStatus === 4) {
          this.currentStatus = 4
        }
        this.onPullingDown()
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
  .position-report-box {
    position: fixed;
    top: 95px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .weui-media-box:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 12px;
    height: 1px;
    border-top: 1px solid #E5E5E5;
    color: #E5E5E5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
  .device-repair-status {
    width: 100%;
    height: 100%;
    /*background-color: aquamarine;*/
    font-size: 0.9rem;
    border-radius: 5px;
    padding: 2px;
    color: #fff;
  }
</style>
