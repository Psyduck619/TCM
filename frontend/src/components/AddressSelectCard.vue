<template>
  <div
    class="address-select-card"
    @click="onArrow"
  >
    <!-- add-icon -->
    <div class="add-icon">
      <van-icon
        name="location"
        color="#e27b01"
        size="28"
      />
    </div>
    <!-- showEmpty -->
    <div
      class="showEmpty"
      v-if="showEmpty"
    >
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="无收货地址!"
      />
    </div>
    <!-- add-info -->
    <div
      class="info"
      v-else
    >
      <div class="user-info">
        <p class="name">{{ address.name }}</p>
        <p class="tel">{{ address.tel }}</p>
      </div>
      <div class="add-info">
        <p class="text">
          {{ address.prov + address.city + address.area + address.detail }}
        </p>
      </div>
    </div>
    <!-- arrow-icon -->
    <div class="arrow-icon">
      <van-icon
        name="arrow"
        color="#323233"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: {},
      showEmpty: true,
    };
  },
  methods: {
    onArrow() {
      this.$router.push({
        path: `/address`,
        query: {},
      });
    },
  },
  mounted() {
    this.$ajax
      .get(`api/address/${this.$store.state.user.nowAddress}`)
      .then((res) => {
        if (res.data.status == "200") {
          this.address = res.data.data[0];
          this.showEmpty = false;
        } else {

        }
      })
      .catch((res) => {
        console.log(`获取地址信息失败`, res);
      });
  },
};
</script>

<style lang="less" scoped>
.address-select-card {
  background-color: white;
  margin: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px;
  text-align: start;
  border: solid 1px #f6f6f6;
  .showEmpty {
    width: 300px;
    ::v-deep .van-empty {
      padding: 0;
    }
    ::v-deep .custom-image .van-empty__image {
      width: 32px;
      height: 32px;
    }
  }
  .info {
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: 4px;
    .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      .name {
        font-size: 16px;
      }
      .tel {
        padding-left: 4px;
        font-size: 13px;
        line-height: 13px;
        color: #858585;
      }
    }
    .add-info {
      padding-top: 4px;
      font-size: 14px;
    }
  }
  .arrow-icon {
    display: flex;
  }
}
</style>
