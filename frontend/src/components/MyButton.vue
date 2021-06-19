<template>
  <div class="my-btn">
    <van-button
      type="primary"
      round
      size="large"
      :disabled="ifClick"
      @click="onClick"
    >{{text}}</van-button>
  </div>
</template>

<script>
export default {
  props: ['text', 'onClick'],
  data() {
    return {
      ifClick: false
    };
  },
};
</script>

<style scoped>
.my-btn {
  padding: 30px;
  background-color: #e57b00;
  border: 1px solid #e57b00;
}
</style>
