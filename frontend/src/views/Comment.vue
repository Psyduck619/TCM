<template>
  <div class="comment">
    <top-nav :title="title"></top-nav>
    <div class="content">
      <!-- 评价主页 -->
      <div class="comment-card">
        <div class="rate">
          <div class="title-rate">
            <p class="text">书籍评价</p>
          </div>
          <van-rate
            color="#e27b01"
            v-model="radio"
            size="24px"
            @change="onChange0"
          />
          <p class="tip">{{ tip0 }}</p>
        </div>
        <div class="words">
          <van-field
            v-model="message"
            rows="4"
            autosize
            left-icon="edit"
            type="textarea"
            maxlength="140"
            placeholder="阅读感受怎么样？和大家分享一下吧~"
            show-word-limit
          />
        </div>
        <div class="anony">
          <van-checkbox
            v-model="checked"
            checked-color="#e27b01"
            icon-size="14px"
          >匿名评价</van-checkbox>
        </div>
      </div>
      <!-- 评价打星 -->
      <div class="star">
        <div class="title">
          <p>给本次购物打个星吧~</p>
        </div>
        <div class="desc line">
          <p class="text">描述相符</p>
          <van-rate
            color="#e27b01"
            v-model="star1"
            size="24px"
            @change="onChange1"
          />
          <p class="tip">{{ tip1 }}</p>
        </div>
        <div class="logistics line">
          <p class="text">物流服务</p>
          <van-rate
            color="#e27b01"
            v-model="star2"
            size="24px"
            @change="onChange2"
          />
          <p class="tip">{{ tip2 }}</p>
        </div>
        <div class="attitude line">
          <p class="text">服务态度</p>
          <van-rate
            color="#e27b01"
            v-model="star3"
            size="24px"
            @change="onChange3"
          />
          <p class="tip">{{ tip3 }}</p>
        </div>
      </div>
    </div>
    <!-- 新增按钮 -->
    <div class="footer">
      <my-button
        :text="btnText"
        :onClick="onClick"
      ></my-button>
    </div>
  </div>
</template>

<script>
import commentCard from '../components/CommentCard'
import topNav from '../components/TopNav.vue'
import myButton from '../components/MyButton'
import { Toast } from 'vant'
export default {
  components: {
    commentCard,
    topNav,
    myButton
  },
  data() {
    return {
      title: '发表评价',
      radio: 5,
      message: '',
      checked: true,
      star1: 5,
      star2: 5,
      star3: 5,
      tip0: '非常好',
      tip1: '非常好',
      tip2: '非常好',
      tip3: '非常好',
      btnText: '提交'
    }
  },
  methods: {
    onChange0(val) {
      if (val === 0) {
        this.tip0 = ''
      } else if (val === 1) {
        this.tip0 = '非常差'
      } else if (val === 2) {
        this.tip0 = '差'
      } else if (val === 3) {
        this.tip0 = '一般'
      } else if (val === 4) {
        this.tip0 = '好'
      } else {
        this.tip0 = '非常好'
      }
    },
    onChange1(val) {
      if (val === 0) {
        this.tip1 = ''
      } else if (val === 1) {
        this.tip1 = '非常差'
      } else if (val === 2) {
        this.tip1 = '差'
      } else if (val === 3) {
        this.tip1 = '一般'
      } else if (val === 4) {
        this.tip1 = '好'
      } else {
        this.tip1 = '非常好'
      }
    },
    onChange2(val) {
      if (val === 0) {
        this.tip2 = ''
      } else if (val === 1) {
        this.tip2 = '非常差'
      } else if (val === 2) {
        this.tip2 = '差'
      } else if (val === 3) {
        this.tip2 = '一般'
      } else if (val === 4) {
        this.tip2 = '好'
      } else {
        this.tip2 = '非常好'
      }
    },
    onChange3(val) {
      if (val === 0) {
        this.tip3 = ''
      } else if (val === 1) {
        this.tip3 = '非常差'
      } else if (val === 2) {
        this.tip3 = '差'
      } else if (val === 3) {
        this.tip3 = '一般'
      } else if (val === 4) {
        this.tip3 = '好'
      } else {
        this.tip3 = '非常好'
      }
    },
    onClick() {
      this.$ajax
        .post(
          '/api/comment',
          this.$qs.stringify({
            goods_id: this.$route.query.goodsId,
            order_id: this.$route.query.orderId,
            content: this.message,
            rate: this.radio,
            desc_star: this.star1,
            logistics_star: this.star2,
            attitude_star: this.star3
          })
        )
        .then(res => {
          this.$ajax
          .put(`api/order/status`,
            this.$qs.stringify({
              id: this.$route.query.orderId,
              status: 6
            }))
            .then(res => {
              if (res.data.status == '200') {
              }
            })
            .catch(err => {
              console.log('失败', err.data)
            })
          console.log(res.data)
          Toast.success('感谢您的评价!')
          this.$router.back(-1)
        })
        .catch(err => {
          console.log('评价失败:', err)
        })
    }
  }
}
</script>

<style scoped>
.comment {
  background-color: #f8f8f8;
  height: 100vh;
  width: 100%;
}
.comment-card {
  background-color: white;
  margin: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  padding: 12px 0;
}
.comment-card .rate {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 0 8px 16px;
}
.comment-card .rate .title-rate {
  margin-right: 12px;
}
.title-rate .text {
  font-weight: bold;
}
.anony {
  padding-left: 16px;
}

.star {
  background-color: white;
  margin: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  padding: 12px 0;
}
.star .title {
  display: flex;
  padding-left: 16px;
}
.star .line {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 16px 0 16px;
}
.star .line .text {
  font-weight: bold;
  margin-right: 12px;
}
.tip {
  padding-top: 2px;
  margin-left: 12px;
  color: #bcbccc;
  font-size: 11px;
}

.footer {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  background-color: white;
  z-index: 9999;
}
.my-btn[data-v-5abd212e] {
  padding: 20px 30px;
  background-color: white;
  border: 1px solid white;
  border-top: #f8f8f8;
}
/* ::v-deep .van-icon-success {
  background-color: #e27b01 !important;
  border: 1px solid #e27b01 !important;
} */
</style>
