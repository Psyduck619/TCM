<template>
  <div class="add-address">
    <top-nav :title="title"></top-nav>
    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      tel-maxlength="11"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import topNav from '../components/TopNav.vue'
import { Toast } from 'vant'
export default {
  components: { topNav },
  data() {
    return {
      title: '新增收货地址',
      areaList,
      addressInfo: {
        name: '', //姓名
        tel: '', //电话
        // areaCode: "110000", //北京市
        // areaCode: "110100", //北京市
        areaCode: '', //西城区
        addressDetail: '' //详细地址
      },
      info: {}
    }
  },
  methods: {
    onSave(val) {
      this.info = val
      if (this.$route.query.mode === '1') {
        this.$ajax
          .post(
            '/api/address',
            this.$qs.stringify({
              code: val.areaCode,
              area: val.county,
              city: val.city,
              detail: val.addressDetail,
              name: val.name,
              prov: val.province,
              tel: val.tel,
              user_id: this.$store.state.user.id
            })
          )
          .then(res => {
            if (res.data.status === '200') {
              Toast.success('添加成功')
              // this.$store.state.user.login = true;
              // this.$store.state.user.id = res.data.id;
              this.$router.back(-1)
            }
            console.log(res.data)
          })
          .catch(err => {
            console.log('新增地址失败结果:', err)
          })
      } else {
        this.$ajax
          .put(
            '/api/address/',
            this.$qs.stringify({
              code: val.areaCode,
              area: val.county,
              city: val.city,
              detail: val.addressDetail,
              name: val.name,
              prov: val.province,
              tel: val.tel,
              id: this.$route.query.addressId,
            })
          )
          .then(res => {
            if (res.data.status === '200') {
              Toast.success('修改成功')
              // this.$store.state.user.login = true;
              // this.$store.state.user.id = res.data.id;
              this.$router.back(-1)
            }
            console.log(res.data)
          })
          .catch(err => {
            console.log('修改地址失败结果:', err)
          })
      }
    }
  },
  mounted() {
    // console.log(this.$route.query.mode);
    if (this.$route.query.mode === '1') {
      this.title = '新增收货地址'
      this.addressInfo = {}
    } else {
      this.title = '修改收货地址'
      this.$ajax
        .get(`/api/address/${this.$route.query.addressId}`)
        .then(res => {
          let info  = res.data.data[0]
          console.log(info)
          this.addressInfo.name = info.name
          this.addressInfo.tel = info.tel
          this.addressInfo.areaCode = info.code
          this.addressInfo.addressDetail = info.detail
          // this.reload();
        })
        .catch(err => {
          console.log('查找地址失败:', err)
        })
    }
  }
}
</script>

<style scoped>
::v-deep .van-button--danger {
  background-color: #e57b00;
  border: 1px solid #e57b00;
}
.add-address {
  width: 375px;
}
</style>
