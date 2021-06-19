<template>
  <div class="input">
    <div class="logo">
      <van-image
        width="10rem"
        height="10rem"
        fit="contain"
        src="http://yuan619.xyz/TCM/images/logo1.jpg"
      />
    </div>
    <van-cell-group>
      <van-field
        v-model="tel"
        type="number"
        clearable
        label="账号"
        placeholder="请输入手机号/账号"
      />
      <van-field
        clearable
        v-model="pwd"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <div class="btn">
      <van-button
        type="primary"
        round
        size="large"
        :disabled="loginFlag"
        @click="login"
      >立即登录</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      tel: "",
      pwd: "",
      loginFlag: true,
    };
  },
  methods: {
    login() {
      console.log("我要登录了!!!");
      this.$ajax
        .post("/api/user/login",
        this.$qs.stringify({
          account: this.tel,
          password: this.pwd
        }))
        .then((res) => {
          if (res.data.status === "500" || res.data.status === "400") {
            Toast("账号或密码错误");
          } else {
            if (res.data.status === "200") {
              Toast.success(`登录成功!`)
              this.$store.commit("setLogin", true)
              this.$store.commit("setUserId", res.data.data.id)
              console.log(`id:`, this.$store.state.user.id)
              this.$router.push(`/my`)
            }
          }
          // console.log(res.data.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    address() {
      const { tel, pwd } = this;
      return {
        tel,
        pwd,
      };
    },
  },
  watch: {
    address(nval, oval) {
      if (this.tel.length && this.pwd.length) {
        this.loginFlag = false
      } else {
        this.loginFlag = true
      }
    },
  },
};
</script>

<style scoped>
::v-deep .van-cell {
  line-height: 28px;
}
.van-cell::after {
  border-bottom: 2px solid #ebedf0;
}
.btn {
  padding: 30px;
}
</style>
