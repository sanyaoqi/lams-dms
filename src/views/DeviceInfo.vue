<template>
  <div>
    <div class="weui-form-preview__bd">
      <p>
        <label class="weui-form-preview__label">创建者</label>
        <span class="weui-form-preview__value">{{ device.owner }}</span>
      </p>
      <p>
        <label class="weui-form-preview__label">当前位置</label>
        <span class="weui-form-preview__value">{{ device.position }}</span>
      </p>
      <p>
        <label class="weui-form-preview__label">创建时间</label>
        <span class="weui-form-preview__value">{{ device.created_at }}</span>
      </p>
    </div>
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

</style>
