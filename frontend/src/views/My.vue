<template>
  <div class="my">
    <!-- "我的"标题 -->
    <!-- <h3 class="title">我的</h3> -->
    <div class="title">
      <van-nav-bar
        title="我的"
        right-text="退出登录"
        placeholder
        safe-area-inset-top
        @click-right="onClickRight"
      />
    </div>
    <!-- 用户信息 -->
    <div
      class="user-info"
      @click="toLogin"
    >
      <!-- 头像 -->
      <div class="head">
        <van-image
          round
          fit="cover"
          width="80px"
          height="80px"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170809%2Ff7a70f1a399949a3b7a46ca66295e4e4_th.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626412138&t=9e247b44cc435483943116aa9cdb2e1a"
        />
      </div>
      <!-- 用户名 -->
      <div class="balance">
        <p>{{userName}}</p>
        </p>
      </div>
      <!-- icon -->
      <div class="icon">
        <van-icon
          name="arrow"
          size="20"
        />
      </div>
    </div>
    <!-- 列表 -->
    <van-cell-group>
      <van-cell
        title="我的订单"
        icon="orders-o"
        color="#e27b01"
        is-link
        size="large"
        to="/order"
      />
      <van-cell
        title="收货地址"
        icon="location-o"
        color="#e27b01"
        is-link
        size="large"
        to="/address"
      />
      <van-cell
        title="我的优惠券"
        icon="coupon-o"
        color="#e27b01"
        is-link
        size="large"
      />
      <van-cell
        title="帮助中心"
        icon="smile-comment-o"
        color="#e27b01"
        is-link
        size="large"
      />
    </van-cell-group>
    <!-- 在线客服 -->
    <div class="btn">
      <van-button
        icon="service-o"
        type="danger"
        round
        color="#e57b00"
        size="large"
      >
        在线客服
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my',
  data() {
    return {
      userName: '请先登录'
    }
  },
  methods: {
    toLogin: function() {
      this.$router.push('/login')
    },
    toOrder: function() {
      this.$router.push({
        path: '/order'
        // query: {
        //   id: this.$store.state.user.id,
        // },
      })
    },
    onClickRight() {
      this.$router.push('/login')
      this.$store.state.user.id = -1
    }
  },
  watch: {
    '$store.state.user.balance': (newVal, oldVal) => {
      this.balance = newVal
    },
    '$store.state.user.id': (nv, ov) => {
      if ($store.state.user.id !== -1) {
        this.userName = '一册医书用户'
      }
    }
  },
  mounted() {
    if (this.$store.state.user.id !== -1) {
      this.userName = '一册医书用户'
    }
    // 获取默认地址
    this.$ajax
      .get(
        `/api/address/user/${this.$store.state.user.id}`
      )
      .then(res => {
        if (res.data.status == '200') {
          this.$store.state.user.nowAddress = res.data.data[0].id
        }
      })
      .catch(err => {
      })
  }
}
</script>

<style scoped>
.my {
  height: 100vh;
  width: 375px;
  background-color: #f8f8f8;
  text-align: start;
}
.title {
  font-size: 28px;
  font-weight: bold;
  width: 100%;
  /* padding: 10px 0 10px 20px; */
  margin-bottom: 2px;
  /* margin: 10px 0 5px 20px; */
  background-color: white;
}
::v-deep .van-nav-bar__content {
  width: 100%;
  /* background-image: linear-gradient(to right, #07c160 , #73dc37); */
  /* background-color: #07c160; */
}
::v-deep .van-nav-bar__title {
  font-size: 16px;
  font-weight: bold;
}
.btn {
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
  padding: 0 110px;
}
.user-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 16px 16px 16px 16px;
  margin: 6px 0 6px 0;
  border-top: solid 1px #f2f2f2;
  border-bottom: solid 1px #f2f2f2;
}
.balance {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding-right: 100px;
}
.balance .num {
  color: #ee0a24;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
::v-deep .van-image--round img {
  border: 2px solid #af8d60;
}
::v-deep .van-nav-bar__text {
  color: #dab68f;
}
</style>
