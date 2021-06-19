<template>
  <div class="nav">
    <van-nav-bar :title="title" left-arrow @click-left="$router.back(-1)" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onClickLeft() {
      this.$router.push(this.$store.state.sys.lastPath);
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     console.log("from", from);
  //     if(from.path != "/register") {
  //       vm.$store.commit("setLastPath", from.path);
  //     }
  //     console.log(vm.$store.state.sys.lastPath);
  //   });
  // }
};
</script>

<style scoped>
::v-deep .van-nav-bar__title {
  font-weight: bold;
}
::v-deep .van-icon-arrow-left::before {
  color: black;
}
</style>
