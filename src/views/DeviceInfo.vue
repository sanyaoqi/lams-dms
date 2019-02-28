<template>
  <div>
    <div class="weui-form-preview__bd">
      <p v-if="device.owner.user_nick">
        <label class="weui-form-preview__label">创建者</label>
        <span class="weui-form-preview__value">{{ device.owner.user_nick }}</span>
      </p>
      <p v-if="device.position">
        <label class="weui-form-preview__label">当前位置</label>
        <span class="weui-form-preview__value">{{ device.position }}</span>
      </p>
      <p v-if="device.product_at_format">
        <label class="weui-form-preview__label">创建时间</label>
        <span class="weui-form-preview__value">{{ device.product_at_format }}</span>
      </p>
      <p v-if="device.contact">
        <label class="weui-form-preview__label">联系人</label>
        <span class="weui-form-preview__value">{{ device.contact }}</span>
      </p>
      <p v-if="device.contact_number">
        <label class="weui-form-preview__label">联系电话</label>
        <span class="weui-form-preview__value">{{ device.contact_number }}</span>
      </p>
    </div>

    <router-link :to="{path:'/add-repair', query: {device_id: device.id, device: device}}">
      <button id="add-repair">报修</button>
    </router-link>
  </div>
</template>

<script>
    export default {
      name: 'DeviceInfo',
      props: {
        device: Object
      },
      data () {
        return {
        }
      }
    }
</script>

<style scoped>
  #add-repair {
    right: 30px;
    bottom: 40px;
    width: 50px;
    height: 50px;
    background-color: aqua;
    z-index: 1000;
    display: block;
    position: fixed;
  }
</style>
