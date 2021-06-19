<template>
  <div class="address">
    <!-- title -->
    <top-nav :title="title"></top-nav>
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
    <!-- 地址列表 -->
    <address-card
      v-for="(item, index) in addressList"
      :key="index"
      v-bind="addressList[index]"
      :checked="addressList[index].id"
      :handleModify="handleModify"
      :handleDelete="handleDelete"
      :handleDefault="handleDefault"
      :selectAddress="selectAddress"
      v-else
    >
    </address-card>
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
import topNav from '../components/TopNav.vue'
import myButton from '../components/MyButton'
import addressCard from '../components/AddressCard.vue'
import { Toast } from 'vant'
export default {
  inject: ['reload'],
  components: { topNav, myButton, addressCard },
  data() {
    return {
      title: '我的收货地址',
      showEmpty: false,
      btnText: '＋ 添加收货地址',
      addressList: [],
      checked: -1
    }
  },
  methods: {
    onClick() {
      this.$router.push({
        path: '/handle_address',
        query: {
          mode: 1
        }
      })
    },
    handleModify(index) {
      // console.log("修改", index);
      this.$router.push({
        path: '/handle_address',
        query: {
          mode: 2,
          addressId: index
        }
      })
    },
    handleDelete(index) {
      this.$ajax
        .delete(`/api/address/${index}`)
        .then(res => {
          Toast.success(`删除成功!`)
          console.log(`删除成功:`, res.data)
          this.reload()
          // this.addressList = res.data.msg
        })
        .catch(err => {
          console.log('删除地址失败:', err)
        })
    },
    handleDefault(index) {
      this.$store.commit('setNowAddress', index)
      this.$ajax
        .put(
          '/api/address/default',
          this.$qs.stringify({
            id: index,
            user_id: this.$store.state.user.id
          })
        )
        .then(res => {
          this.reload()
        })
        .catch(err => {
          console.log('设置默认地址失败结果:', err)
        })
    },
    selectAddress(index) {
      console.log(index)
      this.$store.state.user.nowAddress = index
      this.$router.back(-1)
      console.log(this.$store.state.user.nowAddress)
    }
  },
  watch: {
    // addressList(oval, nval) {
    //   this.checked = this.addressList[0].id
    // }
  },
  beforeCreate() {
    if (this.$store.state.user.id === -1) {
      this.$router.push('/login')
    }
  },
  mounted() {
    console.log(this.$store.state.user.id)
    this.$ajax
      .get(
        `/api/address/user/${this.$store.state.user.id}`
      )
      .then(res => {
        console.log(res.data.status)
        if (res.data.status == '200') {
          this.addressList = res.data.data
          this.showEmpty = false
        } else {
          this.showEmpty = true
          conson.log(this.showEmpty)
        }
      })
      .catch(err => {
        console.log('地址查找失败:', err)
      })
  }
}
</script>

<style scoped>
.address {
  width: 375px;
  height: 100vh;
  background-color: #f9f9f9;
  font-size: 14px;
}
.footer {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 80px;
  background-color: white;
  z-index: 9999;
}
.my-btn[data-v-5abd212e] {
  padding: 16px 30px;
  background-color: white;
  border: 0 solid #af8d60;
  border-top: 1px solid #f4f4f4;
}
</style>
