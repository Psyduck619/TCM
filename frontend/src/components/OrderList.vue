<template>
  <div class="order-list">
    <van-empty
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="您还没有相关订单"
      v-if="!list.length"
    />
    <van-swipe-cell
      v-for="(item, index) in list"
      :key="index"
      class="pay-goods-card"
      v-if="list.length"
    >
      <div class="status">
        <span>{{status[item.status]}}</span>
      </div>
      <van-card
        :num="item.num"
        :price="item.price"
        :title="item.book_name"
        :thumb="item.pic_url"
        :desc="'作者：' + item.author + ' | ' + item.press"
      >
      </van-card>
      <div class="price">
        <p class="title">合计：</p>
        <p class="text">
          {{ "￥" + ((item.price) * item.num).toFixed(2) }}
        </p>
      </div>
      <div
        class="handleButton"
        v-if="item.status != 5"
      >
        <div
          class="btn_2"
          @click="onHandle(item)"
          v-if="item.status != 6"
        >
          <van-button
            plain
            type="primary"
            round
          >{{btn2[item.status]}}</van-button>
        </div>
        <div class="btn_1">
          <van-button
            plain
            type="primary"
            round
          >{{btn1[item.status]}}</van-button>
        </div>
      </div>
    </van-swipe-cell>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
export default {
  props: ['list'],
  inject: ['reload'],

  data() {
    return {
      status: [
        '0',
        '待发货', // 1
        '待收货', // 2
        '已完成', // 3
        '已取消', // 4
        '退款中', // 5
        '已完成', // 6
      ],
      btn1: [
        '0',
        '提醒发货', // 1 
        '查看物流', // 2 
        '申请售后', // 3
        '再次购买', // 4 
        '', // 5
        '再次购买', // 6
      ],
      btn2: [
        '0',
        '申请退款', // 1 
        '确认收货', // 2 
        '评价晒单', // 3
        '评价订单', // 4 
        '', // 5
        '评价订单', // 6
      ]
    }
  },
  methods: {
    onHandle(item) {
      console.log(item)
      if (item.status == 1) {
        Dialog.confirm({
        message: "确认申请退款吗？",
      })
        .then(() => {
          this.$ajax
          .put(`api/order/status`,
            this.$qs.stringify({
              id: item.orderId,
              status: 5
            }))
            .then(res => {
              if (res.data.status == '200') {
                console.log('已申请退款!')
                this.reload()
              }
            })
            .catch(err => {
              console.log('失败', err.data)
            })
        })
        .catch(() => {

        })
        
      } else if (item.status == 2) {
        Dialog.confirm({
        message: "确认收货吗？",
      }).then (() => {
        this.$ajax
          .put(`api/order/status`,
            this.$qs.stringify({
              id: item.orderId,
              status: 3
            }))
            .then(res => {
              if (res.data.status == '200') {
                console.log('已确认收货')
                this.reload()
              }
            })
            .catch(err => {
              console.log('失败', err.data)
            })
      })
      .catch(() => {

      })
        
      } else if (item.status == 3) {
        this.$router.push({
          path: '/comment',
          query: {
            orderId: item.orderId,
            goodsId: item.goodsId
          }
        })
      } 
    }
  }
}
</script>

<style lang="less" scoped>
.order-list {
  margin-top: 8px;
  // padding-bottom: 16px;
  .van-empty {
    padding-bottom: 320px;
  }
  .pay-goods-card {
    background-color: white;
    margin: 0px 8px 8px 8px;
    border-radius: 8px;
    padding: 8px 12px;
    text-align: start;
    border: solid 1px #f6f6f6;
    ::v-deep .van-card {
      background-color: white;
      .van-card__title {
        font-size: 13px;
        font-weight: bold;
        line-height: 16px;
      }
      .van-card__desc {
        height: 40px;
        padding: 10px 0 0 0;
        max-height: 40px;
        color: #aaa;
      }
      .van-tag--danger {
        margin-top: 8px;
        padding: 3px 4px 2px 4px;
        color: #323233;
      }
      .van-card__price {
        color: #323233;
        font-size: 14px;
        font-weight: 500;
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
      font-weight: 700;
      padding: 5px 0;
      .text {
        color: #323233;
      }
    }
  }
  .status {
    display: flex;
    flex-direction: row-reverse;
    font-size: 14px;
    font-weight: bold;
    color: #e27b01;
  }
  .handleButton {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 3px;
    margin: 5px 0;
    .van-button--primary {
      background-color: white;
    }
    .van-button {
      height: 32px;
    }
    .btn_1 {
      .van-button--normal {
        color: #666;
        border: 1px solid #e8e8e8;
        padding: 0 8px;
      }
    }
    .btn_2 {
      margin-left: 8px;
      .van-button--normal {
        color: #e27b01;
        border: 1px solid #e57b00;
        padding: 0 8px;
      }
    }
  }
}
</style>