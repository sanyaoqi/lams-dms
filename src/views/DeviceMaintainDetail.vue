<template>
  <div>
    <x-header>维护记录详情</x-header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
  </div>

</template>

<script>
  import { XHeader, Swiper, SwiperItem } from 'vux'

  export default {
    name: 'DeviceMaintainDetail',
    components: {
      XHeader,
      Swiper,
      SwiperItem
    },
    methods: {
      demo01_onIndexChange (index) {
        this.demo01_index = index
      }
    },
    data () {
      return {
        demo01_index: 0,
        demo01_list: baseList
      }
    }
  }

  const baseList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'
  }]
</script>

<style scoped>

</style>
