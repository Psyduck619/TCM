<template>
  <div class="test">
    <button class="btn" @click="test">点我测试</button>
  </div>
</template>

<script>
export default {
  methods: {
    test() {
      this.$ajax
        .post(
          "http://localhost:8000/user",
          this.$qs.stringify({
            account: "124",
            password: "123",
            nickname: "yuan",
            tel: "123"
          })
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("失败的test结果", err);
        });
    }
  }

}
</script>

<style>

</style>