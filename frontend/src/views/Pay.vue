<template>
  <div class="pay">
    <!-- top-nav -->
    <top-nav :title="title"></top-nav>
    <!-- select-address -->
    <address-select-card></address-select-card>
    <!-- goods-info -->
    <div class="order-list">
      <van-swipe-cell
        v-for="(item, index) in list"
        :key="index"
        class="pay-goods-card"
      >
        <van-card
          :num="item.num"
          :price="item.price"
          :title="item.book_name"
          :thumb="item.pic_url"
          :desc="'作者: ' + item.author + ' | ' + item.press"
        >
        </van-card>
        <div class="note">
          <van-field
            v-model="note"
            label="订单备注"
            placeholder="选填"
          />
        </div>
        <div class="price">
          <p class="title">小计：</p>
          <p class="text">
            {{ '￥' + (item.price * item.num).toFixed(2) }}
          </p>
        </div>
      </van-swipe-cell>
    </div>
    <!-- submit-bar -->
    <div class="submit">
      <van-submit-bar
        :price="total"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <template #default>
          <span class="num">{{ '共 ' + list.length + ' 件，' }}</span>
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import topNav from '../components/TopNav.vue'
import addressSelectCard from '../components/AddressSelectCard.vue'
import { Dialog, Toast } from 'vant'
export default {
  components: { topNav, addressSelectCard },
  data() {
    return {
      title: '确认订单',
      total: 0,
      list: [],
      note: ''
    }
  },
  methods: {
    onSubmit() {
      console.log(`下单了`)
      Dialog.confirm({
        message: '确认支付订单吗？'
      })
        .then(() => {
          for (let item of this.list) {
            // 新增订单
            this.$ajax
              .post(
                `/api/order`,
                this.$qs.stringify({
                  user_id: this.$store.state.user.id,
                  goods_id: item.goodsId,
                  goods_num: item.num,
                  user_address_id: this.$store.state.user.nowAddress,
                  goods_total_price: item.num * item.price
                })
              )
              .then(res => {
                if (res.data.status == '200') {
                  console.log(`订单添加成功`, res.data)
                }
              })
              .catch(err => {
                console.log(`订单添加失败`, err.data)
              })
            // 删除购物车信息
            this.$ajax
              .delete(`/api/cart/${item.cartId}`)
              .then(res => {
                if (res.data.status == '200') {
                  console.log('删除购物车信息成功:', res.data.data)
                }
              })
              .catch(err => {
                console.log('删除购物车信息失败:', err)
              })
            // 修改书本的库存和销量信息
            this.$ajax
              .put(
                `/api/book`,
                this.$qs.stringify({
                  id: item.goodsId,
                  num: item.num
                })
              )
              .then(res => {
                if (res.data.status == '200') {
                  console.log(`商品信息修改成功`, res.data)
                }
              })
              .catch(err => {
                console.log(`订单添加失败`, err.data)
              })
          }
          Toast.success(`您已成功下单!`)
          this.$router.push(`/my`)
        })
        .catch(() => {
          // on cancel
        })
    }
  },

  mounted() {
    this.total = Number.parseInt(this.$store.state.user.totalPrice)
    let checkList = this.$store.state.user.checkedList
    for (let item of checkList) {
      this.$ajax
        .get(`/api/cart/${item}`)
        .then(res => {
          if (res.data.status == '200') {
            let info = res.data.data[0]
            this.$ajax.get(`api/book/${info.goods_id}`).then(res => {
              if ((res.data.status = '200')) {
                res.data.data[0].num = info.goods_num
                res.data.data[0].goodsId = info.goods_id
                res.data.data[0].cartId = info.id
                this.list.push(res.data.data[0])
              }
            })
          }
        })
        .catch(err => {
          console.log('获取失败', err.data)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.pay {
  background-color: #f9f9f9;
  height: 100%;
  width: 375px;
  // padding-bottom: 50px;
  .order-list {
    .pay-goods-card {
      background-color: white;
      margin: 0px 8px 8px 8px;
      border-radius: 8px;
      padding: 8px 12px;
      text-align: start;
      border: solid 1px #f6f6f6;
      ::v-deep .van-card {
        background-color: white;
        .van-card__content {
          padding-top: 5px;
        }
        .van-card__title {
          font-size: 14px;
          font-weight: bold;
          line-height: 16px;
        }
        .van-card__desc {
          margin-top: 12px;
          line-height: 16px;
          color: #323233;
        }
        .van-tag--danger {
          margin-top: 8px;
          padding: 3px 4px 2px 4px;
          color: #323233;
        }
        ::v-deep .van-card__price {
          font-size: 14px;
        }
        ::v-deep .van-card__bottom {
          font-size: 14px;
        }
      }
      .price {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 12px;
        .text {
          color: #e27b01;
          font-weight: 700;
        }
      }
    }
  }
  .submit {
    .van-submit-bar__price {
      color: #e27b01;
    }
    .van-submit-bar__button--danger {
      background: #e57b00;
    }
    .num {
      color: #646566;
      padding-top: 3px;
      // padding-right: 12px;
    }
    .van-submit-bar__text {
      flex: none;
      text-align: left;
    }
  }
}
</style>
