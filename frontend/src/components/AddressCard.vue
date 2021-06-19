<template>
  <div class="address-card">
    <!-- 第一行 名字和电话 -->
    <div
      class="info"
      @click="selectAddress(id)"
    >
      <span>{{name}}</span>
      <span>{{tel}}</span>
    </div>
    <!-- 第二行 地址(省市区 详细) -->
    <div
      class="area"
      @click="selectAddress(id)"
    >
      <span>{{prov + city + area + detail}}</span>
    </div>
    <!-- 第三行 默认地址按钮 修改按钮 删除按钮 -->
    <div class="handle">
      <div class="default">
        <van-checkbox
          v-model="checkedMap"
          @click="handleDefault(id)"
          disabled="disabled"
        >默认地址</van-checkbox>
      </div>
      <div class="mo-de">
        <div
          class="icon-text modify"
          @click="handleModify(id)"
        >
          <van-icon
            name="edit"
            size=24
          />
          <span class="text">修改</span>
          <!-- <span class="text">修改</span> -->
        </div>
        <div
          class="icon-text"
          @click="handleDelete(id)"
        >
          <van-icon
            name="delete-o"
            size=24
          />
          <span class="text">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'tel', 'prov', 'city', 'area', 'detail', 'is_default', 'handleModify', 'handleDelete', 'handleDefault', 'selectAddress'],
  data() {
    return {
      checkedMap: false,
      disabled: false
    }
  },
  computed: {
    // getChecked() {
    //   this.checkedMap = this.checked == 1 ? true : false
    // }
  },
  watch: {
    // checked(v) {
    //   console.log(this.checked)
    //   this.checkedMap = this.checked == 1 ? true : false
    // }
  },
  mounted() {
    this.checkedMap = this.is_default == 1 ? true : false
    this.disabled = this.is_default == 1 ? true : false
  },
  watch: {
    disabled() {
      this.disabled = this.is_default == 1 ? true : false
    }
  }
}
</script>

<style scoped>
.address-card {
  width: 100%;
  background-color: white;
  padding: 14px 16px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  border-top: #ececec solid 1px;
  border-bottom: #ececec solid 1px;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
}
.area {
  display: flex;
  padding-bottom: 16px;
}
.handle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.mo-de {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.mo-de .modify {
  padding-right: 12px;
}
::v-deep .van-checkbox__label--disabled {
  color: #323233;
}
</style>