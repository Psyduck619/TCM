<template>
  <div class="login">
    <div class="nav">
      <van-nav-bar
        title="欢迎登录 —— 一册医书"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <van-tabs
      v-model="active"
      line-width="80"
      border
      swipeable
      animated
    >
      <van-tab title="手机快捷登录">
        <LoginBySms></LoginBySms>
      </van-tab>
      <van-tab title="账号密码登录">
        <LoginByPwd></LoginByPwd>
      </van-tab>
    </van-tabs>
    <!-- 其他 -->
    <div class="other">
      <span
        class="toRegister"
        @click="toRegister"
      >立即注册</span>
      <span class="forget">忘记密码</span>
    </div>
  </div>
</template>

<script>
import LoginBySms from '../components/LoginBySms'
import LoginByPwd from '../components/LoginByPwd'
import topNav from '../components/TopNav.vue'
export default {
  components: {
    LoginBySms,
    LoginByPwd,
    topNav
  },
  data() {
    return {
      title: '安租登录',
      loginBtn: false,
      active: 0
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/my')
    },
    toRegister() {
      this.$router.push('/register')
    },
    login() {
      console.log('我要登录了!!!')
      this.$ajax
        .get('/api/user/login?account=123&password=123')
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    toClickBtn() {
      return this.$store.state.sys.loginBtn
    }
  },
  watch: {
    toClickBtn(nval, oval) {
      this.loginBtn = nval
    }
  }
  // created() {
  //   console.log(this.$store.state); // 就是store实例对象
  // },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     // console.log(from);
  //     if(from.path != "/register") {
  //       vm.$store.commit("setLastPath", from.path);
  //     }
  //     console.log(vm.$store.state.sys.lastPath);
  //   });
  // },
}
</script>

<style scoped>
.login {
  width: 375px;
}
.btn {
  padding: 30px;
}
.other {
  color: #dab68f;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 30px;
}
.other .forget {
  margin-left: 15px;
}
::v-deep .van-nav-bar__title {
  font-weight: bold;
}
::v-deep .van-icon-arrow-left::before {
  color: black;
}
::v-deep .van-tabs__line {
  background-color: #e27b01;
}
</style>
