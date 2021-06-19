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
        type="tel"
        clearable
        label="手机号码"
        placeholder="请输入手机号"
        maxlength="11"
      />
      <van-field
        v-model="sms"
        type="number"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        maxlength="4"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            round
            :disabled="smsFlag"
            @click="onCode"
          >{{codeText}}</van-button>
        </template>
      </van-field>
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
      sms: "",
      smsFlag: true,
      loginFlag: true,
      active: 2,
      codeText: '获取验证码'
    };
  },
  methods: {
    login() {
      console.log("我要登录了!!!");
      this.$ajax
        .get(`/api/user/${this.tel}`)
        .then((res) => {
          if (res.data.status === "400") {
            Toast("用户不存在");
          } else {
            if (res.data.status === "200") {
              Toast.success(`登录成功!`)
              this.$store.state.user.login = true
              this.$store.state.user.id = res.data.id
              this.$router.push(`/my`)
            }
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCode() {
      this.smsFlag = true
      this.codeText = '已发送'
    }
  },
  computed: {
    address() {
      const { tel, sms } = this;
      return {
        tel,
        sms,
      };
    },
  },
  watch: {
    tel(nval, oval) {
      if (this.tel.length < 11) {
        this.smsFlag = false;
      } else {
        this.smsFlag = false;
      }
    },
    address(nval, oval) {
      if (this.tel.length && this.sms.length) {
        this.loginFlag = false
      } else {
        this.loginFlag = true
      }
    },
  },
};
</script>

<style scoped>
.van-cell::after {
  border-bottom: 2px solid #ebedf0;
}
.btn {
  padding: 30px;
}
</style>
