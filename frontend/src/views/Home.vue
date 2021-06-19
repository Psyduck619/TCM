<template>
  <div class="home">
    <!-- <div class="title">
      <van-nav-bar title="安租" />
    </div> -->
    <!-- 搜索栏 -->
    <van-sticky>
      <van-search
        v-model="value"
        placeholder="中医的海洋，任你遨游~"
      />
    </van-sticky>
    <van-pull-refresh
      v-model="isLoading"
      loosing-text="松开刷新"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <!-- 轮播图 -->
      <van-swipe
        :autoplay="3000"
        class="swipe"
        indicator-color="#e27b01"
      >
        <van-swipe-item
          v-for="(image, index) in swipeImages"
          :key="index"
        >
          <img
            height="150"
            v-lazy="image"
          />
        </van-swipe-item>
      </van-swipe>
      <!-- 分类提示 -->
      <van-grid
        :gutter="0"
        :column-num="4"
        :border="false"
        clickable
      >
        <van-grid-item
          icon="http://yuan619.xyz/TCM/icons/book.png"
          text="中医理论"
          @click="onOne"
        />
        <van-grid-item
          icon="http://yuan619.xyz/TCM/icons/zhenjiu.png"
          text="中医针灸"
          @click="onTwo"
        />
        <van-grid-item
          icon="http://yuan619.xyz/TCM/icons%E8%8D%89%E8%8D%AF.png"
          text="中草药"
          @click="onThree"
        />
        <van-grid-item
          icon="http://yuan619.xyz/TCM/icons/cough.png"
          text="伤寒杂病论"
          @click="onFour"
        />
        <!-- <van-grid-item
          icon="http://yuan619.xyz/anzu/icons%E7%94%B5%E6%B1%A0.png"
          text="更多"
        /> -->
      </van-grid>
      <!-- 尝鲜好物 -->
      <fresh-thing></fresh-thing>
      <!-- 精品推荐 -->
      <Recommend></Recommend>
    </van-pull-refresh>
  </div>
</template>

<script>
import FreshThing from '../components/FreshThing.vue'
import Recommend from '../components/Recommend'
export default {
  inject: ['reload'],
  components: { FreshThing, Recommend },
  data() {
    return {
      isLoading: false,
      value: '',
      swipeImages: [
        'http://yuan619.xyz/TCM/images%E5%9B%9B%E5%A4%A7%E7%BB%8F%E5%85%B8.jpg',
        'http://yuan619.xyz/TCM/images/swipe-1.jpg',
        'http://yuan619.xyz/TCM/images/swipe-2.jpg',
        'http://yuan619.xyz/TCM/images/swipe-3.jpg'
      ],
      freshList: []
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
      setTimeout(() => {
        this.reload()
      }, 2000)
    },
    onOne() {
      this.$store.commit('setNowSort', 1);
      this.$router.push({
        path: '/sort'
      })
    },
    onTwo() {
      this.$store.commit('setNowSort', 2);
      this.$router.push({
        path: '/sort'
      })
    },
    onThree() {
      this.$store.commit('setNowSort', 3);
      this.$router.push({
        path: '/sort'
      })
    },
    onFour() {
      this.$store.commit('setNowSort', 4);
      this.$router.push({
        path: '/sort'
      })
    }
  },
  mounted() {
    // 获取默认地址
    this.$ajax
      .get(
        `/api/address/user/${this.$store.state.user.id}`
      )
      .then(res => {
        if (res.data.status == '200') {
          this.$store.state.user.nowAddress = res.data.data[0].id
        }
      })
      .catch(err => {

      })

  }
}
</script>

<style scoped>
h3 {
  display: flex;
  margin-left: 20px;
}
.home {
  width: 375px;
  height: 100%;
  background-color: white;
}
.van-grid-item__text {
  color: black;
}
::v-deep .cont-dest[data-v-61705290] {
  font-size: 12px;
}
.swipe img {
  overflow: hidden;
  width: 100%;
  border-top: 1px solid #af8d60;
  border-bottom: 1px solid #af8d60;
}
::v-deep .van-icon-search::before {
  color: #e27b01;
}
</style>
