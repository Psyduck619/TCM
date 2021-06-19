<template>
  <div class="index">
    <router-view />
    <van-tabbar
      route
      v-model="active"
      active-color="#e27b01"
    >
      <van-tabbar-item
        name="home"
        icon="wap-home-o"
        to="/home"
      >首页</van-tabbar-item>
      <van-tabbar-item
        name="search"
        icon="search"
        to="/sort"
      >分类</van-tabbar-item>
      <van-tabbar-item
        name="cart"
        icon="cart-o"
        to="/cart"
      >购物车</van-tabbar-item>
      <van-tabbar-item
        name="my"
        icon="contact"
        to="/my"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      active: 'home',
      index: 1
    }
  },
  methods: {
    onSort() {
      this.$router.push({
        path: `sort`,
        query: {
          index: 1
        }
      })
    }
  },
  watch: {
    active(oval, nval) {
      console.log(this.active)
    }
  },
  components: {}
}
</script>

<style scoped>
::v-deep .van-tabbar--fixed {
  bottom: -1px;
}
</style>
