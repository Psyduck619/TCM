<template>
  <div class="card">
    <div
      class="info"
      v-for="(item, index) in commentList"
    >
      <div class="line-one">
        <div class="user-info">
          <van-image
            class="img"
            round
            width="48px"
            height="48px"
            src="http://yuan619.xyz/TCM/images/head.jpg"
          />
          <span class="name">一册医书用户</span>
        </div>
        <van-rate
          v-model="commentList[index].rate"
          readonly
        />
      </div>
      <div class="line-two">
        <p class="text">{{commentList[index].content}}</p>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentList'],
  data() {
    return {
      rate: 1
    }
  }

}
</script>

<style lang="less" scoped>
.card {
  .info {
    padding: 8px 0;
    .line-one {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .user-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .img {
          border: #dab68f 1px solid;
        }
        .name {
          padding-left: 8px;
          font-size: 15px;
        }
      }
      ::v-deep .van-rate__icon--full {
        color: #e27b01;
      }
    }
    .line-two {
      padding: 8px 0;
      .text {
        font-size: 14px;
      }
    }
  }
}
</style>