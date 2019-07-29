<template>
  <div>
    <flexbox :gutter="0">
      <flexbox-item :span="flexspan">
        <div class="placeholder device-detail-info-bg">
          <div class="weui-panel__bd device-detail-info">
            <div class="weui-media-box weui-media-box_text" v-if="device !== null">
              <h2 class="weui-media-box__title">{{device.name}}</h2>
              <p class="weui-media-box__desc">{{'类型：' + device.category_name}}</p>
              <p class="weui-media-box__desc">{{'出厂时间：' + device.product_at_format}}</p>
            </div>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item style="padding: 10px;" v-if="hasImage">
        <div class="placeholder">
          <div id="img-bg" :style="{ background: img_background, 'background-size': background_size }">
          </div>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'

export default {
  name: 'DeviceCard',
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    device: Object
  },
  data () {
    return {
      flexspan: 2 / 3,
      hasImage: 1,
      img_background: '',
      background_size: ''
    }
  },
  mounted () {
    // console.log(this.device.images)
    if (this.device.images === '') {
      this.hasImage = 0
      this.flexspan = 0
      // console.log(this.flexspan)
    } else {
      this.img_background = '#ccc url("' + this.device.images + '") no-repeat center'
      this.background_size = 'auto 100%'
      // console.log(this.img_background)
    }
  }
}
</script>
<style lang="less" scoped>
  #img-bg {
    position: relative; // 使用相对定位
    height: 0; // 高度设置为0，使用padding来设置高度
    padding-bottom: 80%;
    display:block;
    flex: 0 0 auto;
  }
  #img-bg img {
    position: absolute; // 使用绝对定位position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 100%; // 宽高为容器的宽高
    height: auto;
  }
</style>