<template>
  <div class="goods-info">
    <van-card :price="price" :title="goodsName" :desc="intro" v-if="isShow">
      <template #tags>
        <van-tag plain type="primary">{{ "设备保证金: " + mode }}</van-tag>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  // props: ["title", "price", "mode", "desc"],
  data() {
    return {
      goods: {},
      isShow: false
    };
  },
  mounted() {
    this.$ajax
      .get("api/goods/findById?id=" + this.$store.state.user.nowGoods)
      .then((res) => {
        console.log(res.data);
        if (res.data.port === "200") {
          this.goods = res.data;
        } else {
          this.goods = {};
        }
      })
      .catch((err) => {
        console.log("商品详情获取失败", err);
      });
  },
};
</script>

<style scoped>
.goods-info {
  text-align: start;
  margin-top: 2px;
}
::v-deep .van-card {
  line-height: 36px;
  background-color: white;
}
::v-deep .van-card__title {
  font-size: 16px;
  font-weight: bold;
}
::v-deep .van-card__price {
  color: #ee0a24;
  font-weight: bold;
  font-size: 18px;
}
::v-deep .van-card__price-integer {
  font-size: 20px;
}
::v-deep .van-tag--plain {
  padding: 3px;
}
</style>
