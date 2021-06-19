<template>
  <div class="detail">
    <!-- <div class="nav">
      <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" />
    </div> -->
    <TopNav :title="title"></TopNav>
    <!-- 轮播图 -->
    <van-swipe
      @change="onChange"
      class="my-swipe"
      :autoplay="3000"
    >
      <van-swipe-item
        v-for="(image, index) in swipeImages"
        :key="index"
      >
        <img
          height="300"
          v-lazy="image"
        />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template>
    </van-swipe>
    <!-- 商品信息 -->
    <!-- <GoodsInfo v-bind="info"></GoodsInfo> -->
    <div class="goods-info">
      <van-card
        :price='goods.price'
        :origin-price="goods.origin_price"
        :title="goods.book_name"
        v-if="isShow"
      >
        <template #tags>
          <van-tag type="primary">{{
            '作者：' + goods.author
          }}</van-tag>
          &nbsp;
          <van-tag type="primary">{{ '出版社：' + goods.press }}</van-tag>
        </template>
        <template #num>
          {{ `月销：` + goods.sales }}
        </template>
      </van-card>
      <div class="second">
        <div class="intro">
          <div class="my-title">
            <span class="text">内容简介</span>
          </div>
          <div class="content">
            <span class="text">{{goods.intro}}</span>
          </div>
        </div>
        <div class="comment">
          <div class="my-title">
            <span class="text">书籍评价</span>
          </div>
          <div class="content">
            <book-comment-card :commentList="commentList"></book-comment-card>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="home-o"
        text="首页"
        to="/home"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        to="/cart"
      />
      <van-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <!-- <van-goods-action-button
        color="#7232dd"
        type="danger"
        text="立即下单"
      /> -->
    </van-goods-action>
    <!-- 底部弹出 -->
    <div class="pop">
      <van-popup
        class="pop-card"
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '60%' }"
      >
        <van-card
          :title="'￥' + goods.price"
          :thumb="goods.pic_url"
        >
          <template #tags>
            <van-tag type="primary">{{ '库存：' + goods.stock }}</van-tag>
          </template>
        </van-card>
        <van-divider />
        <!-- 选择数量和租期 -->
        <div class="count">
          <span>数量 :</span>
          <div class="number">
            <van-stepper
              v-model="countValue"
              integer
            />
            <span>(件)</span>
          </div>
        </div>
        <!-- 确定 -->
        <div class="btn">
          <van-button
            :disabled="onSure"
            type="primary"
            round
            size="large"
            @click="sure"
          >确定</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 确认支付 -->
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import GoodsInfo from '../components/GoodsInfo.vue'
import bookCommentCard from '../components/BookCommentCard.vue'
import { Dialog, Toast } from 'vant'
export default {
  components: { TopNav, GoodsInfo, bookCommentCard },
  data() {
    return {
      title: '商品详情',
      current: 0,
      goods: {},
      isShow: false,
      swipeImages: [],
      show: false,
      countValue: 1,
      cartOrBuy: 0,
      commentList: [
        {
          rate: 4,
          content: '看完后觉得受益匪浅, 中医的智慧令人印象深刻!!!'
        },
        {
          rate: 5,
          content: '真的给我解决了特别多的疑惑, 感谢作者的付出!'
        }
      ]
    }
  },
  methods: {
    onChange(index) {
      this.current = index
    },
    onClickIcon() {},
    onClickButton() {},
    addCart() {
      this.show = true
    },
    sure() {
      this.show = false
      console.log(this.$store.state.user.id)
      this.$ajax
        .post(
          '/api/cart',
          this.$qs.stringify({
            goods_id: this.$route.query.goodsId,
            user_id: this.$store.state.user.id,
            goods_num: this.countValue
          })
        )
        .then(res => {
          console.log(res.data)
          Toast.success('已添加至购物车!')
        })
        .catch(err => {
          console.log('加入购物车失败:', err)
        })
    }
  },
  computed: {
    buyout() {
      return this.goods.mode == 2 ? '支持买断' : '不支持买断'
    },
    cartDes() {
      return this.goods.mode == 2
        ? '押金：￥' + this.goods.deposit // +
        : // "   买断价：￥" +
          // Math.ceil((this.goods.deposit - this.goods.price) * 0.9)
          '押金：￥' + this.goods.deposit
    },
    onSure() {
      return this.goods.stock < this.countValue ? true : false
    }
  },
  mounted() {
    // console.log(this.$store.query.goodsId)
    this.$ajax
      .get(`api/book/${this.$route.query.goodsId}`)
      .then(res => {
        if (res.data.status === '200') {
          console.log(res.data.data)
          this.goods = res.data.data[0]
          this.isShow = true
          for (let i = 0; i < 4; i++) {
            this.swipeImages.push(this.goods.pic_url)
          }
        } else {
          this.goods = {}
        }
      })
      .catch(err => {
        console.log('商品详情获取失败', err)
      })
    this.$ajax
      .get(`api/comment/book/${this.$route.query.goodsId}`)
      .then(res => {
        if (res.data.status === '200') {
          console.log(res.data.data)
          for (let item of res.data.data) {
            this.commentList.push({
              rate: item.rate,
              content: item.content
            })
          }
        }
      })
      .catch(err => {
        console.log('商品详情获取失败', err)
      })
  }
}
</script>

<style scoped>
.detail {
  background-color: #f4f4f4;
  /* height: 100vh; */
  width: 375px;
  padding-bottom: 50px;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  margin-right: 8px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.4);
}
.count {
  margin: 5px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.number {
  width: 130px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.count span {
  height: 30px;
  line-height: 30px;
}
.pop-card {
  padding-top: 10px;
  text-align: start;
}
::v-deep .van-swipe {
  color: white;
}
::v-deep .custom-indicator[data-v-40f4caea] {
  border-radius: 6px;
}
::v-deep .van-card {
  background-color: white;
}
.van-card__content {
  line-height: 50px;
}
.van-card__desc {
  font-size: 14px;
  margin-top: 8px;
}
.btn {
  margin: 80px 0 0 0;
  padding: 0 20px;
}
::v-deep .van-dialog__header {
  font-weight: bold;
}
::v-deep .van-dialog__message--has-title {
  color: #ee0a24;
}
.van-divider::after,
.van-divider::before {
  border-width: 2px 0 0;
}
.goods-info {
  text-align: start;
  /* margin-top: 2px; */
}
::v-deep .van-card {
  line-height: 36px;
  background-color: white;
}
::v-deep .van-card__title {
  max-height: 100px;
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
  text-align: start;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
::v-deep .van-card__price {
  color: #e27b01;
  font-weight: bold;
  font-size: 18px;
}
::v-deep .van-card__price-integer {
  font-size: 20px;
}
::v-deep .van-tag--plain {
  padding: 3px;
}
.pop [data-v-40f4caea] .van-card__title {
  color: #e27b01;
  font-weight: bold;
  font-size: 20px;
}
::v-deep .van-goods-action-button--warning {
  background-color: #e57b00 !important;
}
/* .van-tag--primary.van-tag--plain {
  color: #07c160;
} */
[data-v-40f4caea] .van-tag--plain {
  padding: 3px 5px;
}
.van-swipe-item {
  background-color: white;
}
img {
  object-fit: fill;
}
.pop [data-v-40f4caea] .van-card__title[data-v-40f4caea] {
  padding-top: 16px;
}

.second {
  padding: 10px 16px;
  background-color: white;
  margin: 6px 0;
}
.second .intro {
  margin-bottom: 20px;
}
.my-title {
  border-bottom: 4px solid #e27b01;
  margin: 8px 0;
  font-size: 16px;
  font-weight: bold;
}
.my-title .text {
  background-color: #e27b01;
  padding: 4px 25px;
  padding-right: 35px;
  color: white;
  border-radius: 3px 50px 3px 3px;
}
.intro .content {
  text-indent: 1.6em;
  font-size: 14px;
  line-height: 24px;
}
</style>
