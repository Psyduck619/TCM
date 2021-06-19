<template>
  <div class="register">
    <!-- <div class="nav">
      <van-nav-bar title="安租注册" left-arrow @click-left="onClickLeft" />
    </div> -->
    <top-nav :title="title"></top-nav>
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
            @click="onSms"
          >{{smsText}}</van-button>
        </template>
      </van-field>
      <van-field
        clearable
        v-model="pwd"
        type="password"
        label="设置密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <van-checkbox
      v-model="checked"
      shape="square"
    >
      <span class="tip">
        我已阅读并同意
        <span class="contract">《一册医书账户注册协议》</span>
        <span class="contract">《隐私协议》</span>
      </span>
    </van-checkbox>
    <div class="btn">
      <van-button
        type="primary"
        round
        size="large"
        :disabled="loginFlag"
        @click="onRegister"
      >立即提交</van-button>
    </div>
  </div>
</template>

<script>
import topNav from '../components/TopNav.vue'
import { Toast } from 'vant'
export default {
  components: { topNav },
  data() {
    return {
      title: '欢迎注册 —— 一册医书',
      tel: '',
      sms: '',
      pwd: '',
      checked: false,
      smsFlag: true,
      loginFlag: true,
      smsText: '获取验证码'
    }
  },
  methods: {
    onSms() {
      this.smsFlag = true
      this.smsText = '已发送'
    },
    onClickLeft() {
      this.$router.push('login')
    },
    onRegister() {
      console.log('我要注册了!!!')
      if (this.tel.length != 11) {
        Toast('手机号格式不正确!')
      } else if (this.sms.length === 0) {
        Toast('请输入验证码!')
      } else if (this.pwd.length < 3) {
        Toast('请输入至少3位的密码!')
      } else if (this.checked === false) {
        Toast('请先同意服务条款!')
      } else {
        this.$ajax
          .post(
            '/api/user/',
            this.$qs.stringify({
              account: this.tel,
              password: this.pwd,
              nickname: 'test用户名',
              tel: this.tel
            })
          )
          .then(res => {
            if (res.data.status === '400') {
              Toast('用户已存在')
            } else {
              if (res.data.status === '200') {
                Toast('注册成功, 请登录')
                this.$router.push(`/login`)
              }
            }
            console.log(res.data)
          })
          .catch(err => {
            console.log('注册结果:', err)
          })
      }
    }
  },
  computed: {
    address() {
      const { tel, sms, pwd } = this;
      return {
        tel,
        sms,
        pwd
      };
    },
  },
  watch: {
    tel(nval, oval) {
      if (this.tel.length < 11) {
        this.smsFlag = true;
      } else {
        this.smsFlag = false;
      }
    },
    address(nval, oval) {
      if (this.tel.length && this.sms.length && this.pwd.length) {
        this.loginFlag = false
      } else {
        this.loginFlag = true
      }
    },
  },
}
</script>

<style scoped>
.btn {
  padding: 20px;
  margin-top: 20px;
}
.tip {
  font-size: 12px;
  color: #646566;
}
.contract {
  color: #dab68f;
}
::v-deep .van-nav-bar__title {
  font-weight: bold;
}
::v-deep .van-icon-arrow-left::before {
  color: black;
}
::v-deep .van-checkbox {
  margin: 10px 0 0 20px;
}
.van-cell::after {
  border-bottom: 2px solid #ebedf0;
}
::v-deep .van-checkbox__icon--checked .van-icon {
  background-color: #e57b00;
  border-color: #e57b00;
}
</style>
