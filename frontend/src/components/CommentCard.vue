<template>
  <div class="comment-card">
    <div class="rate">
      <div class="title-rate">
        <p class="text">商品评价</p>
      </div>
      <div class="radio">
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="1" checked-color="#ee0a24" icon-size="14px">好评</van-radio>
          <van-radio name="2" checked-color="#ee0a24" icon-size="14px">中评</van-radio>
          <van-radio name="3" checked-color="#ee0a24" icon-size="14px">差评</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="words">
      <van-field
        v-model="message"
        rows="4"
        autosize
        left-icon="edit"
        type="textarea"
        maxlength="140"
        placeholder="感觉怎么样？和大家分享一下吧~"
        show-word-limit
      />
    </div>
    <div class="anony">
      <van-checkbox v-model="checked" checked-color="#ee0a24" icon-size="14px">匿名评价</van-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
      message: "",
      checked: true
    };
  },
};
</script>

<style scoped>
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
</style>
